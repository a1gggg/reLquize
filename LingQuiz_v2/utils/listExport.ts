// utils/listExport.ts
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import { Platform, Share } from "react-native";
import type { KVList } from "../components/store/listsStore";

export const DEFAULT_TXT_FILENAME = "exported_words.txt";

/* ---------------------- Форматирование / Парсер ---------------------- */

function formatListsToTxt(lists: KVList[]): string {
  return lists
    .map((list) => {
      const header = `=== Список: ${list.title} ===`;
      const body =
        list.items.length === 0
          ? "(пустой список)"
          : list.items.map((i) => `${i.key} -> ${i.value}`).join("\n");
      return `${header}\n${body}`;
    })
    .join("\n\n");
}

export function parseTxtToLists(txt: string): KVList[] {
  const lines = txt.split(/\r?\n/);
  const lists: KVList[] = [];
  let currentList: KVList | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("=== Список:")) {
      const title = line.replace("=== Список:", "").replace("===", "").trim();
      currentList = {
        id: Math.random().toString(36).slice(2),
        title,
        items: [],
      };
      lists.push(currentList);
      continue;
    }

    if (line === "(пустой список)") continue;

    if (line.includes("->") && currentList) {
      const [key, value] = line.split("->").map((s) => s.trim());
      currentList.items.push({
        id: Math.random().toString(36).slice(2),
        key,
        value,
      });
    }
  }

  return lists;
}

/* ---------------------- FileSystem helpers (robust) ---------------------- */

const anyFS = FileSystem as any;

async function getCacheDirectory(): Promise<string | null> {
  if (anyFS?.cacheDirectory && typeof anyFS.cacheDirectory === "string")
    return anyFS.cacheDirectory;
  if (anyFS?.documentDirectory && typeof anyFS.documentDirectory === "string")
    return anyFS.documentDirectory;

  const keys = ["Paths", "Directory", "File"];
  for (const k of keys) {
    const raw = anyFS?.[k];
    if (!raw) continue;

    if (typeof raw === "object") {
      const cache =
        raw.cacheDirectory ?? raw.CACHE_DIRECTORY ?? raw.CacheDirectory;
      const doc =
        raw.documentDirectory ??
        raw.DOCUMENT_DIRECTORY ??
        raw.DocumentDirectory;
      if (typeof cache === "string") return cache;
      if (typeof doc === "string") return doc;
    }

    if (typeof raw === "function") {
      try {
        const staticCache =
          (raw as any).cacheDirectory ??
          (raw as any).CACHE_DIRECTORY ??
          (raw as any).CacheDirectory;
        const staticDoc =
          (raw as any).documentDirectory ??
          (raw as any).DOCUMENT_DIRECTORY ??
          (raw as any).DocumentDirectory;
        if (typeof staticCache === "string") return staticCache;
        if (typeof staticDoc === "string") return staticDoc;
      } catch {
        // ignore
      }

      try {
        // try instantiate (class)
        // eslint-disable-next-line new-cap
        const inst = new (raw as any)();
        if (inst && typeof inst === "object") {
          const cache =
            inst.cacheDirectory ?? inst.CACHE_DIRECTORY ?? inst.CacheDirectory;
          const doc =
            inst.documentDirectory ??
            inst.DOCUMENT_DIRECTORY ??
            inst.DocumentDirectory;
          if (typeof cache === "string") return cache;
          if (typeof doc === "string") return doc;
        }
      } catch {
        try {
          const res = (raw as any)();
          const obj =
            res && typeof res.then === "function"
              ? await res.catch(() => null)
              : res;
          if (obj && typeof obj === "object") {
            const cache =
              obj.cacheDirectory ?? obj.CACHE_DIRECTORY ?? obj.CacheDirectory;
            const doc =
              obj.documentDirectory ??
              obj.DOCUMENT_DIRECTORY ??
              obj.DocumentDirectory;
            if (typeof cache === "string") return cache;
            if (typeof doc === "string") return doc;
          }
        } catch {
          // ignore
        }
      }
    }
  }

  const rootKeys = Object.keys(anyFS || {});
  for (const k of rootKeys) {
    const val = anyFS[k];
    if (
      typeof val === "string" &&
      (k.toLowerCase().includes("cache") ||
        k.toLowerCase().includes("document"))
    ) {
      return val;
    }
  }

  return null;
}

async function writeStringSafe(path: string, content: string) {
  const writer =
    anyFS.writeAsStringAsync ??
    anyFS.writeAsString ??
    anyFS.writeFileAsync ??
    anyFS.writeFile;
  if (typeof writer !== "function") {
    throw new Error("FileSystem: метод записи не найден.");
  }

  try {
    if (
      anyFS.writeAsStringAsync &&
      anyFS.EncodingType &&
      anyFS.EncodingType.UTF8
    ) {
      await anyFS.writeAsStringAsync(path, content, {
        encoding: anyFS.EncodingType.UTF8,
      });
    } else {
      await writer(path, content);
    }
  } catch (err) {
    if (!path.startsWith("file://")) {
      const alt = "file://" + path.replace(/^file:\/\//, "");
      return await writer(alt, content);
    }
    throw err;
  }
}

async function readStringSafe(path: string) {
  const reader =
    anyFS.readAsStringAsync ??
    anyFS.readAsString ??
    anyFS.readFileAsync ??
    anyFS.readFile;
  if (typeof reader !== "function") {
    throw new Error("FileSystem: метод чтения не найден.");
  }

  try {
    return await reader(path);
  } catch (err) {
    if (!path.startsWith("file://")) {
      const alt = "file://" + path.replace(/^file:\/\//, "");
      return await reader(alt);
    }
    throw err;
  }
}

async function copySafe(from: string, to: string) {
  const copier = anyFS.copyAsync ?? anyFS.copyFileAsync ?? anyFS.copyFile;
  if (typeof copier !== "function") {
    throw new Error("FileSystem: метод копирования не найден.");
  }
  try {
    try {
      return await copier({ from, to });
    } catch {
      return await copier(from, to);
    }
  } catch (err) {
    throw err;
  }
}

/* ---------------------- Временный файл ---------------------- */

async function createTempTxtFile(filename: string, txt: string) {
  const cacheDir = await getCacheDirectory();
  if (!cacheDir) {
    return null;
  }
  const tmpUri = `${cacheDir}${filename}`;
  await writeStringSafe(tmpUri, txt);
  return tmpUri;
}

/* ---------------------- Экспорт: Save As через DocumentPicker (исправлено) ---------------------- */

/**
 * saveListsToTxtFile
 *
 * Поведение:
 * - В Expo Go функция НЕ будет автоматически открывать share sheet.
 * - В standalone (appOwnership !== 'expo') и при наличии saveDocumentAsync — откроет системный диалог "Сохранить как..."
 * - Возвращает однозначный объект: { saved: boolean; path?: string; result?: any; error?: string }
 */
export async function saveListsToTxtFile(
  lists: KVList[],
  filename = DEFAULT_TXT_FILENAME,
): Promise<{ saved: boolean; path?: string; result?: any; error?: string }> {
  const txt = formatListsToTxt(lists);

  if (Platform.OS === "web") {
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return { saved: true, path: `web:${filename}` };
  }

  // Определяем, запущено ли приложение в Expo Go
  const appOwnership = (Constants && (Constants as any).appOwnership) ?? null;
  const isExpoGo = appOwnership === "expo";

  // Создаём временный файл в кэше (если возможно)
  const tmpUri = await createTempTxtFile(filename, txt);

  // Если временный файл не создан — возвращаем понятную ошибку (не вызываем share)
  if (!tmpUri) {
    return {
      saved: false,
      error:
        "Не удалось создать временный файл (cacheDirectory недоступен). Сохранение недоступно в этом окружении.",
    };
  }

  // Если мы в Expo Go — не открываем share автоматически, возвращаем сообщение об ограничении
  if (isExpoGo) {
    return {
      saved: false,
      path: tmpUri,
      error:
        "Сохранение файлов через системный диалог недоступно в Expo Go. Установите standalone приложение для полноценного сохранения или используйте кнопку 'Поделиться'.",
    };
  }

  // В standalone: пытаемся вызвать saveDocumentAsync (нормализуем результат)
  const dpAny = DocumentPicker as any;
  if (typeof dpAny.saveDocumentAsync === "function") {
    try {
      const res = await dpAny.saveDocumentAsync({
        copyToCacheDirectory: false,
        type: "text/plain",
        fileName: filename,
        uri: tmpUri,
      });

      if (res && typeof res === "object") {
        const path =
          (res as any).uri ?? (res as any).path ?? (res as any).fileUri ?? null;
        if (typeof path === "string") {
          return { saved: true, path, result: res };
        }
        return { saved: true, result: res };
      }

      if (typeof res === "string") {
        return { saved: true, path: res, result: res };
      }

      return { saved: true, path: tmpUri, result: res };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("DocumentPicker.saveDocumentAsync failed:", err);
      return { saved: false, path: tmpUri, error: String(err) };
    }
  }

  // Если saveDocumentAsync отсутствует в standalone (редкий случай) — возвращаем tmpUri и сообщение
  return {
    saved: false,
    path: tmpUri,
    error:
      "saveDocumentAsync недоступен на этом устройстве. Попробуйте собрать приложение или использовать другой способ сохранения.",
  };
}

/* ---------------------- Шаринг (share sheet) ---------------------- */
/* НЕ ТРОГАТЬ: часть шаринга оставлена без изменений */

export async function shareLists(
  lists: KVList[],
  filename = DEFAULT_TXT_FILENAME,
) {
  const txt = formatListsToTxt(lists);

  if (Platform.OS === "web") {
    if ((navigator as any)?.share) {
      try {
        await (navigator as any).share({ title: filename, text: txt });
        return { shared: true, method: "web-share" };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Web share failed:", err);
      }
    }
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return { shared: false, method: "download" };
  }

  const tmpUri = await createTempTxtFile(filename, txt);

  if (tmpUri) {
    try {
      if (typeof Sharing.isAvailableAsync === "function") {
        const available = await Sharing.isAvailableAsync();
        if (available) {
          await Sharing.shareAsync(tmpUri, {
            mimeType: "text/plain",
            dialogTitle: "Поделиться списком",
          });
          return { shared: true, method: "sharing", path: tmpUri };
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Sharing.shareAsync failed:", err);
    }

    const dpAny = DocumentPicker as any;
    if (typeof dpAny.saveDocumentAsync === "function") {
      try {
        const res = await dpAny.saveDocumentAsync({
          copyToCacheDirectory: false,
          type: "text/plain",
          fileName: filename,
          uri: tmpUri,
        });
        return { shared: true, method: "saveDocumentAsync", result: res };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("DocumentPicker.saveDocumentAsync fallback failed:", err);
        return { shared: false, error: String(err), path: tmpUri };
      }
    }

    return {
      shared: false,
      error: "No sharing method available",
      path: tmpUri,
    };
  }

  try {
    await Share.share({ message: txt, title: filename });
    return { shared: true, method: "Share.share (text-only)" };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Share.share fallback failed:", err);
    return {
      shared: false,
      error: "Не удалось поделиться (и файл создать не удалось).",
    };
  }
}

/* ---------------------- Импорт через DocumentPicker (устойчивый) ---------------------- */
/* НЕ ТРОГАТЬ: часть импорта оставлена без изменений */

export async function pickTxtAndParse(): Promise<KVList[] | null> {
  if (Platform.OS === "web") {
    throw new Error(
      "Импорт TXT на Web не реализован в этой функции. Используйте input[type=file] в UI.",
    );
  }

  const res = await DocumentPicker.getDocumentAsync({
    type: "text/plain",
    copyToCacheDirectory: true,
  });
  const maybe = res as any;

  if (maybe?.type && maybe.type !== "success") return null;

  const uri = maybe?.uri ?? maybe?.fileUri ?? null;
  if (!uri) return null;

  try {
    const content = await readStringSafe(uri);
    return parseTxtToLists(content);
  } catch (readErr) {
    // eslint-disable-next-line no-console
    console.warn(
      "readAsStringAsync failed for uri, will try copy fallback:",
      uri,
      readErr,
    );
  }

  const cacheDir = await getCacheDirectory();
  if (!cacheDir) {
    throw new Error("cacheDirectory недоступен для fallback чтения файла.");
  }

  const tmpName = `import_tmp_${Date.now()}.txt`;
  const dest = `${cacheDir}${tmpName}`;

  try {
    await copySafe(uri, dest);
  } catch (copyErr) {
    // eslint-disable-next-line no-console
    console.warn("copyAsync fallback failed:", copyErr);
    try {
      if (uri.startsWith("http://") || uri.startsWith("https://")) {
        if (typeof anyFS.downloadAsync === "function") {
          const dl = await anyFS.downloadAsync(uri, dest);
          if (!dl?.uri) throw new Error("downloadAsync не вернул uri");
        } else {
          throw copyErr;
        }
      } else {
        throw copyErr;
      }
    } catch (e2) {
      throw new Error("Не удалось скопировать файл для чтения. " + String(e2));
    }
  }

  try {
    const content = await readStringSafe(dest);
    return parseTxtToLists(content);
  } finally {
    try {
      if (typeof anyFS.deleteAsync === "function") {
        await anyFS.deleteAsync(dest, { idempotent: true }).catch(() => {});
      }
    } catch {
      // ignore
    }
  }
}

/* ---------------------- Утилиты ---------------------- */

export async function removeTempFileIfExists(uri: string) {
  try {
    if (typeof anyFS.getInfoAsync === "function") {
      const info = await anyFS.getInfoAsync(uri).catch(() => null);
      if (info?.exists && typeof anyFS.deleteAsync === "function") {
        await anyFS.deleteAsync(uri, { idempotent: true }).catch(() => {});
      }
    }
  } catch {
    // ignore
  }
}

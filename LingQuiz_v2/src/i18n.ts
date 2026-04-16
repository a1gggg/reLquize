// src/i18n.ts
//import i18n from "i18next";
/*
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as i18next from "i18next";
import type { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";

const resources = {
  uk: { translation: uk },
  en: { translation: en },
  ru: { translation: ru },
} as const;

const SUPPORTED_LANGS = ["uk", "en", "ru"] as const;
const FALLBACK = "en";

export function normalizeLang(lang?: string): string {
  if (!lang) return FALLBACK;
  const l = String(lang).toLowerCase();
  if (l === "ua") return "uk";
  if (l === "uk") return "uk";
  if (l === "en") return "en";
  if (l === "ru") return "ru";
  if (l.startsWith("uk")) return "uk";
  if (l.startsWith("en")) return "en";
  if (l.startsWith("ru")) return "ru";
  return FALLBACK;
}

export async function getSavedLanguage(): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem("appLanguage");
    if (saved) return normalizeLang(saved);

    const deviceLang =
      Localization.getLocales()?.[0]?.languageCode?.split("-")?.[0] ?? FALLBACK;
    return normalizeLang(deviceLang);
  } catch {
    return FALLBACK;
  }
}

//Модульный флаг инициализации — используем вместо i18next.isInitialized

let _initialized = false;

export async function initI18n(): Promise<void> {
  const lng = await getSavedLanguage();

  if (!_initialized) {
    const options: InitOptions = {
      resources,
      lng,
      fallbackLng: FALLBACK,
      // если у тебя старая версия i18next — можно убрать compatibilityJSON
      compatibilityJSON: "v4",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    };

    await i18next.use(initReactI18next).init(options);
    _initialized = true;
  } else {
    await i18next.changeLanguage(lng);
  }
}


 // Утилита для отложенного выполнения (без deprecated InteractionManager)

async function afterInteractions(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
}

let _langLock = false;
let _lastCall = 0;
const DEBOUNCE_MS = 2000;

export async function changeLanguage(lang: string): Promise<void> {
  const now = Date.now();
  if (now - _lastCall < DEBOUNCE_MS) return;
  _lastCall = now;

  if (_langLock) return;
  _langLock = true;

  try {
    const normalized = normalizeLang(lang);

    if (!_initialized) {
      await initI18n();
    }

    await afterInteractions();

    try {
      await i18next.changeLanguage(normalized);
      try {
        await AsyncStorage.setItem("appLanguage", normalized);
      } catch (e) {
        console.warn("Failed to save language to AsyncStorage", e);
      }
    } catch (err) {
      console.error("i18next.changeLanguage error", err);
    }
  } finally {
    _langLock = false;
  }
}

export { resources, SUPPORTED_LANGS, FALLBACK };
export default i18next;
*/

// i18n.ts
import i18next, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";

const resources = {
  uk: { translation: uk },
  en: { translation: en },
  ru: { translation: ru },
} as const;

const SUPPORTED_LANGS = ["uk", "en", "ru"] as const;
const FALLBACK = "en";

export function normalizeLang(lang?: string): string {
  if (!lang) return FALLBACK;
  const l = String(lang).toLowerCase();

  if (l === "ua") return "uk";
  if (l === "uk") return "uk";
  if (l === "en") return "en";
  if (l === "ru") return "ru";

  if (l.startsWith("uk")) return "uk";
  if (l.startsWith("en")) return "en";
  if (l.startsWith("ru")) return "ru";

  return FALLBACK;
}

export async function getSavedLanguage(): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem("appLanguage");
    if (saved) return normalizeLang(saved);

    const locales = Localization.getLocales?.() ?? [];
    const deviceLang =
      locales[0]?.languageCode?.split("-")?.[0] ?? FALLBACK;

    return normalizeLang(deviceLang);
  } catch {
    return FALLBACK;
  }
}

/**
 * Флаг и промис инициализации — защищаемся от гонок и двойного init
 */
let initialized = false;
let initPromise: Promise<void> | null = null;

async function createInitPromise(): Promise<void> {
  const lng = await getSavedLanguage();

  const options: InitOptions = {
    resources,
    lng,
    fallbackLng: FALLBACK,
    compatibilityJSON: "v4", // если ругается — можно убрать или сменить на "v3"
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  };

  // eslint-disable-next-line import/no-named-as-default-member
  await i18next.use(initReactI18next).init(options);
  initialized = true;
}

/**
 * Публичная инициализация — безопасна к многократным вызовам
 */
export async function initI18n(): Promise<void> {
  if (initialized) return;

  if (!initPromise) {
    initPromise = createInitPromise().catch((err) => {
      console.error("i18n init error", err);
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
}

/**
 * Лёгкий afterInteractions без InteractionManager
 */
async function afterInteractions(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
}

let langLock = false;
let lastCall = 0;
const DEBOUNCE_MS = 800; // можно уменьшить, чтобы не мешать UX

export async function changeLanguage(lang: string): Promise<void> {
  const now = Date.now();
  if (now - lastCall < DEBOUNCE_MS) return;
  lastCall = now;

  if (langLock) return;
  langLock = true;

  try {
    const normalized = normalizeLang(lang);

    // гарантируем инициализацию
    await initI18n();

    // даём UI "успокоиться"
    await afterInteractions();

    try {
      // eslint-disable-next-line import/no-named-as-default-member
      await i18next.changeLanguage(normalized);
    } catch (err) {
      console.error("i18next.changeLanguage error", err);
    }

    try {
      await AsyncStorage.setItem("appLanguage", normalized);
    } catch (e) {
      console.warn("Failed to save language to AsyncStorage", e);
    }
  } finally {
    langLock = false;
  }
}

export { resources, SUPPORTED_LANGS, FALLBACK };
export default i18next;
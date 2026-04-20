//страница тестирования выбранного списка
// app/test/[id].tsx
/*
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useListsStore } from "./../components/store/listsStore";
import type { KVList, Pair } from "./../components/store/listsStore";

export default function TestPage() {
  const params = useLocalSearchParams() as { id?: string };
  const id = params.id;
  const router = useRouter();
  const { lists } = useListsStore();

  const list = lists.find((l) => l.id === id) as KVList | undefined;

  const initialQuestions = useMemo<Pair[]>(() => {
    if (!list) return [];
    return [...list.items].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length]);

  const [questions, setQuestions] = useState<Pair[]>(() => initialQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!id) {
      router.back();
    }
  }, [id, router]);

  useEffect(() => {
    if (!list) {
      setQuestions([]);
      setAnswers({});
      setMistakes([]);
      setFinished(false);
      return;
    }
    const shuffled = [...list.items].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length]);

  if (!list) {
    return <Text style={{ padding: 20 }}>Список не найден</Text>;
  }

  const check = () => {
    const wrong = questions.filter((p) => answers[p.id] !== p.value).map((p) => p.id);
    setMistakes(wrong);
    setFinished(wrong.length === 0);
  };

  const retryMistakes = () => {
    if (mistakes.length === 0) return;
    const newQuestions = questions.filter((p) => mistakes.includes(p.id)).sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Тест: {list.title}</Text>

      {!finished &&
        questions.map((pair) => (
          <View key={pair.id} style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 16 }}>{pair.key}</Text>

            <TextInput
              placeholder="Введите значение"
              value={answers[pair.id] || ""}
              onChangeText={(t) => setAnswers((s) => ({ ...s, [pair.id]: t }))}
              style={{
                borderWidth: 1,
                padding: 8,
                marginTop: 5,
                borderColor: mistakes.includes(pair.id) ? "red" : "#ccc",
                borderRadius: 6,
              }}
            />

            {mistakes.includes(pair.id) && (
              <Text style={{ color: "red", marginTop: 6 }}>
                Ошибка. Правильный ответ: {pair.value}
              </Text>
            )}
          </View>
        ))}

      {!finished && (
        <View style={{ marginTop: 20 }}>
          <Button title="Проверить" onPress={check} />
        </View>
      )}

      {finished && (
        <Text style={{ marginTop: 20, fontSize: 18, color: "green" }}>
          Все ответы верны! Тест завершён.
        </Text>
      )}

      {mistakes.length > 0 && !finished && (
        <View style={{ marginTop: 12 }}>
          <Button title="Повторить ошибочные" onPress={retryMistakes} color="orange" />
        </View>
      )}
    </ScrollView>
  );
}
*/
/////////////////////////////////////
/*
// app/test/[id].tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useListsStore } from "./../components/store/listsStore";
import type { KVList } from "./../components/store/listsStore";

type Q = {
  id: string;
  prompt: string;
  answer: string;
};

export default function TestPage() {
  const params = useLocalSearchParams() as { id?: string; swap?: string };
  const id = params.id;
  const swapMode = params.swap === "1" || params.swap === "true";
  const router = useRouter();
  const { lists } = useListsStore();

  const list = lists.find((l) => l.id === id) as KVList | undefined;

  // Формируем вопросы с учётом режима swap (вопрос = key или value)
  const initialQuestions = useMemo<Q[]>(() => {
    if (!list) return [];
    return list.items
      .map((p) =>
        swapMode
          ? { id: p.id, prompt: p.value, answer: p.key }
          : { id: p.id, prompt: p.key, answer: p.value },
      )
      .sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length, swapMode]);

  const [questions, setQuestions] = useState<Q[]>(() => initialQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [localSwap, setLocalSwap] = useState<boolean>(swapMode);

  useEffect(() => {
    if (!id) {
      router.back();
    }
  }, [id, router]);

  // При изменении списка или режима пересоздаём вопросы
  useEffect(() => {
    if (!list) {
      setQuestions([]);
      setAnswers({});
      setMistakes([]);
      setFinished(false);
      return;
    }
    const shuffled = list.items
      .map((p) =>
        localSwap
          ? { id: p.id, prompt: p.value, answer: p.key }
          : { id: p.id, prompt: p.key, answer: p.value },
      )
      .sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length, localSwap]);

  if (!list) {
    return <Text style={styles.notFound}>Список не найден</Text>;
  }

  const check = () => {
    const wrong = questions
      .filter((q) => {
        const given = (answers[q.id] || "").trim().toLowerCase();
        const correct = q.answer.trim().toLowerCase();
        return given !== correct;
      })
      .map((q) => q.id);

    setMistakes(wrong);
    setFinished(wrong.length === 0);
  };

  const retryMistakes = () => {
    if (mistakes.length === 0) return;
    const newQuestions = questions
      .filter((q) => mistakes.includes(q.id))
      .sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>
          Тест: {list.title} {localSwap ? "(swap)" : ""}
        </Text>

        <View style={styles.swapRow}>
          <Button
            title={localSwap ? "Режим: value → key (вкл)" : "Режим: key → value (выкл)"}
            onPress={() => setLocalSwap((s) => !s)}
          />
          <Text style={styles.swapHint}>Поменять местами ключ и значение</Text>
        </View>

        {!finished &&
          questions.map((q) => (
            <View key={q.id} style={styles.questionBlock}>
              <Text style={styles.prompt}>{q.prompt}</Text>

              <TextInput
                placeholder="Введите ответ"
                value={answers[q.id] || ""}
                onChangeText={(t) => setAnswers((s) => ({ ...s, [q.id]: t }))}
                style={[
                  styles.input,
                  mistakes.includes(q.id) ? styles.inputError : undefined,
                ]}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {mistakes.includes(q.id) && (
                <Text style={styles.errorText}>Ошибка. Правильный ответ: {q.answer}</Text>
              )}
            </View>
          ))}

        {!finished && (
          <View style={styles.actions}>
            <Button title="Проверить" onPress={check} />
          </View>
        )}

        {finished && (
          <Text style={styles.success}>Все ответы верны! Тест завершён.</Text>
        )}

        {mistakes.length > 0 && !finished && (
          <View style={styles.actions}>
            <Button title="Повторить ошибочные" onPress={retryMistakes} color="orange" />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  swapRow: {
    marginTop: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  swapHint: {
    marginLeft: 10,
    color: "#666",
  },
  questionBlock: {
    marginTop: 15,
  },
  prompt: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginTop: 6,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 6,
  },
  actions: {
    marginTop: 20,
  },
  success: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
  },
  notFound: {
    padding: 20,
    color: "#666",
  },
});
*/

////////////////////////////////////////

// app/test/[id].tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useListsStore } from "./../components/store/listsStore";
import type { KVList } from "./../components/store/listsStore";

type Q = {
  id: string;
  prompt: string;
  answer: string;
};

export default function TestPage() {
  const params = useLocalSearchParams() as { id?: string };
  const id = params.id;
  const router = useRouter();
  const { lists } = useListsStore();

  const list = lists.find((l) => l.id === id) as KVList | undefined;

  // В тесте используем сохранённые пары: вопрос = key, ответ = value
  const initialQuestions = useMemo<Q[]>(() => {
    if (!list) return [];
    return list.items
      .map((p) => ({ id: p.id, prompt: p.key, answer: p.value }))
      .sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length]);

  const [questions, setQuestions] = useState<Q[]>(() => initialQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!id) {
      router.back();
    }
  }, [id, router]);

  useEffect(() => {
    if (!list) {
      setQuestions([]);
      setAnswers({});
      setMistakes([]);
      setFinished(false);
      return;
    }
    const shuffled = list.items
      .map((p) => ({ id: p.id, prompt: p.key, answer: p.value }))
      .sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.id, list?.items.length]);

  if (!list) {
    return <Text style={{ padding: 20 }}>Список не найден</Text>;
  }

  const check = () => {
    const wrong = questions.filter((p) => (answers[p.id] || "").trim().toLowerCase() !== p.answer.trim().toLowerCase()).map((p) => p.id);
    setMistakes(wrong);
    setFinished(wrong.length === 0);
  };

  const retryMistakes = () => {
    if (mistakes.length === 0) return;
    const newQuestions = questions.filter((p) => mistakes.includes(p.id)).sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setAnswers({});
    setMistakes([]);
    setFinished(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Тест: {list.title}</Text>

        {!finished &&
          questions.map((q) => (
            <View key={q.id} style={styles.questionBlock}>
              <Text style={styles.prompt}>{q.prompt}</Text>

              <TextInput
                placeholder="Введите ответ"
                value={answers[q.id] || ""}
                onChangeText={(t) => setAnswers((s) => ({ ...s, [q.id]: t }))}
                style={[styles.input, mistakes.includes(q.id) ? styles.inputError : undefined]}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {mistakes.includes(q.id) && <Text style={styles.errorText}>Ошибка. Правильный ответ: {q.answer}</Text>}
            </View>
          ))}

        {!finished && (
          <View style={styles.actions}>
            <Button title="Проверить" onPress={check} />
          </View>
        )}

        {finished && <Text style={styles.success}>Все ответы верны! Тест завершён.</Text>}

        {mistakes.length > 0 && !finished && (
          <View style={styles.actions}>
            <Button title="Повторить ошибочные" onPress={retryMistakes} color="orange" />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f7f7f7", flex: 1 },
  title: { fontSize: 22, fontWeight: "700" },
  questionBlock: { marginTop: 15 },
  prompt: { fontSize: 16 },
  input: { borderWidth: 1, padding: 8, marginTop: 6, borderColor: "#ccc", borderRadius: 6 },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginTop: 6 },
  actions: { marginTop: 20 },
  success: { marginTop: 20, fontSize: 18, color: "green" },
});

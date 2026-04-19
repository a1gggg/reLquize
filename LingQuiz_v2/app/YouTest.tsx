//страница тестирования выбранного списка
// app/test/[id].tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useListsStore } from "./List/store/listsStore";
import type { KVList, Pair } from "./List/store//listsStore";

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

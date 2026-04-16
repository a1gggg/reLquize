// сохранение/обнуление результатов
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "memory_best_score";

export async function saveBestScore(score: number) {
  const prev = await AsyncStorage.getItem(KEY);
  if (!prev || score < Number(prev)) {
    await AsyncStorage.setItem(KEY, String(score));
  }
}

export async function getBestScore(): Promise<number | null> {
  const value = await AsyncStorage.getItem(KEY);
  return value ? Number(value) : null;
}

export async function resetScore() {
  await AsyncStorage.removeItem(KEY);
}



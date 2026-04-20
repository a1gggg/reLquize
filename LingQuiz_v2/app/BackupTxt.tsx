//Экран/компонент для кнопок «Сохранить» и «Поделиться» — app/BackupTxt.tsx (пример)

// app/BackupTxt.tsx
import React, { useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useListsStore } from "../components/store/listsStore";
import {
  saveListsToTxtFile,
  shareLists,
  pickTxtAndParse,
} from "../utils/listExport";

export default function BackupTxtScreen() {
  const { lists, setLists } = useListsStore(); // добавь setLists в store
  const [loading, setLoading] = useState(false);

  const onSaveLocal = async () => {
    try {
      setLoading(true);
      const path = await saveListsToTxtFile(lists);
      setLoading(false);
      Alert.alert("Сохранено", `Файл сохранён:\n${path}`);
    } catch (e: any) {
      setLoading(false);
      Alert.alert("Ошибка", e.message);
    }
  };

  const onShare = async () => {
    try {
      setLoading(true);
      await shareLists(lists);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      Alert.alert("Ошибка", e.message);
    }
  };

  const onImport = async () => {
    try {
      setLoading(true);
      const parsed = await pickTxtAndParse();
      setLoading(false);

      if (!parsed) return;

      Alert.alert(
        "Импорт TXT",
        "Заменить текущие списки импортированными?",
        [
          { text: "Отмена", style: "cancel" },
          {
            text: "Заменить",
            onPress: () => setLists(parsed),
          },
        ]
      );
    } catch (e: any) {
      setLoading(false);
      Alert.alert("Ошибка", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Экспорт / Импорт TXT</Text>

      <Button title="Сохранить на телефон (.txt)" onPress={onSaveLocal} />
      <View style={styles.spacer} />

      <Button title="Поделиться через мессенджеры" onPress={onShare} />
      <View style={styles.spacer} />

      <Button title="Импортировать из TXT" onPress={onImport} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  spacer: { height: 12 },
});

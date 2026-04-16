import * as React from "react";
//import "@/src/i18n";
import { useState, useEffect, JSX } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { changeLanguage as changeAppLanguage } from "@/src/i18n";

function normalizeLang(code?: string): string {
  if (!code) return "en";
  const c = code.toLowerCase();
  if (c === "ua") return "uk";
  if (c.startsWith("uk")) return "uk";
  if (c.startsWith("en")) return "en";
  if (c.startsWith("ru")) return "ru";
  return "en";
}

export function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<string>(() =>
    normalizeLang(i18n?.language ?? "en"),
  );

  useEffect(() => {
    setSelected(normalizeLang(i18n?.language));
  }, [i18n?.language]);

  const onChange = async (value: string): Promise<void> => {
    const normalized = normalizeLang(value);
    setSelected(normalized);
    try {
      await changeAppLanguage(normalized); // используем импортированное имя
    } catch (e) {
      console.warn("changeLanguage error:", e);
    }
  };

  // Picker может передавать number или string, приводим к string и вызываем onChange
  const handleValueChange = (itemValue: string | number): void => {
    void onChange(String(itemValue));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selected}
        onValueChange={handleValueChange} // <-- здесь используем handleValueChange
        mode={Platform.OS === "ios" ? "dropdown" : "dropdown"}
        style={styles.picker}
        itemStyle={styles.item}
      >
        <Picker.Item label="Українська" value="uk" />
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Русский" value="ru" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 160,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    backgroundColor: "transparent",
  },
  item: {
    height: 44,
  },
});

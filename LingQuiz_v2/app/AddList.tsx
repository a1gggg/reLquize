import React from "react";
import { View, StyleSheet, useColorScheme, StatusBar } from "react-native";

import "@/src/i18n";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { List_H } from "@/src/locales/interfaceTextComponents/HeaderName";
import Home from "./List/app/index";

export default function ModalScreen() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  const isDark = scheme === "dark";

  // цвета можно настроить под дизайн
  const backgroundColor = isDark ? "#164bb4" : "#FFFFFF";
  const pageTextColor = isDark ? "#E6EEF3" : "#111827";

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          <List_H />
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View style={styles.linkWrap}>
          <ThemedText
            type="subtitle"
            style={[styles.stepText, { color: pageTextColor }]}
          >
            <Home />
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    //flex: 1,
  },
  headerImageWrap: {
    //width: "100%",
    //alignItems: "center",
    //paddingTop: 8,
    //paddingBottom: 8,
    //backgroundColor: "transparent",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "8%",
    gap: 1,
    //paddingHorizontal: 16,
    paddingTop: "1%",
  },
  stepContainer: {
    //paddingHorizontal: 16,
    paddingTop: 12,
    //gap: 8,
    //marginBottom: 8,
  },
  stepText: {
    //color: "#898b88",
  },
  reactLogo: {
    //height: 80,
    //width: "45%",
  },
  icon: {
    //marginRight: 6,
  },
  linkWrap: {
    //alignSelf: "flex-start",
  },
});

import React from "react";

// React Native
import { View, StyleSheet, Platform } from "react-native";
import { Text } from "react-native"; // если нужно

// Expo
import { Image } from "expo-image";
import { Link } from "expo-router";

// i18n
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/src/i18n";

// Компоненты
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
//import { MyScreen } from "@/components/MyScreen";
import { Step_1 } from "@/src/locales/interfaceTextComponents/Step1";
import { Step_2 } from "@/src/locales/interfaceTextComponents/Step2";
import { Step_3 } from "@/src/locales/interfaceTextComponents/Step3";

// ❗ УБРАНО: Stack.Screen — его нельзя использовать внутри обычного компонента
// Если нужен экран MyScreen — добавь его в router/navigation, а не сюда.

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">LingQuiz</ThemedText>
        <HelloWave />
        <LanguageSwitcher />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          <Step_1 />
        </ThemedText>
        <ThemedText>
          Create{" "}
          <ThemedText type="defaultSemiBold">
            new list (Open tab LIST)
          </ThemedText>{" "}
          in which we add the necessary words or kanji with translation.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <ThemedText type="subtitle">
            <Step_2 />
          </ThemedText>
        </Link>

        <ThemedText>
          Open{" "}
          <ThemedText type="defaultSemiBold">
            your Quiz (Open tab Quiz)
          </ThemedText>{" "}
          go to your quiz and take it.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          <Step_3 />
        </ThemedText>
        <ThemedText>
          {`Open your result `}
          <ThemedText type="defaultSemiBold">(Open tab Results)</ThemedText> and
          review your{" "}
          <ThemedText type="defaultSemiBold">result.</ThemedText>{" "}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

export function SettingsScreen() {
  return (
    <View>
      <LanguageSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

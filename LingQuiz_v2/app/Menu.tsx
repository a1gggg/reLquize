import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from "@/components/ui/icon-symbol";

// i18n
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/src/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
//import { MyScreen } from "@/components/MyScreen";


export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Hi!</ThemedText>
      <ThemedText type="subtitle">Сhange language</ThemedText>
      <LanguageSwitcher />
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link_back">
          <IconSymbol size={38} name="square.and.pencil" color={""} />
        </ThemedText>
      </Link>
    </ThemedView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    padding: 30,
  },
  link: {
    marginTop: 250,
    marginLeft: 300,
    alignItems: "baseline",
    paddingBottom: "auto",
    paddingVertical: "100%",
  },
  link_back: {},
});

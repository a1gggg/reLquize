import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Hi} from "@/src/locales/interfaceTextComponents/Hi!";
import { ChangeLanguage } from "@/src/locales/interfaceTextComponents/СhangeLanguage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"><Hi /></ThemedText>
      <ThemedText type="subtitle"><ChangeLanguage /></ThemedText>
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
    marginTop: 200,
    marginLeft: 300,
    alignItems: "baseline",
    paddingBottom: "auto",
    paddingVertical: "100%",
  },
  link_back: {},
});

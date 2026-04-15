//смена языка  - Изначальный англ текст
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export function MyScreen() {
  const { t } = useTranslation();

  return <Text>{t("hello")}</Text>;
}

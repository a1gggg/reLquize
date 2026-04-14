import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

export function Step_1(): JSX.Element {
  const { t } = useTranslation(); // по умолчанию namespace "translation"
  return <Text>{t("_step_1")}</Text>;
}

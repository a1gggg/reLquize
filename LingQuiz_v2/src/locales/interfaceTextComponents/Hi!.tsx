//import React from "react";
import { JSX } from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

export function Hi(): JSX.Element {
  const { t } = useTranslation(); // по умолчанию namespace "translation"
  return <Text>{t("_hi")}</Text>;
}

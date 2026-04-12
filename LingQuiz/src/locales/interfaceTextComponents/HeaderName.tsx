// src/components/HeaderMenu.tsx
import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

type Props = { style?: TextStyle };

export function Home({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.home, style]}>{t("_home")}</Text>;
}

export function List({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.list, style]}>{t("_list")}</Text>;
}

export function Words({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.words, style]}>{t("_words")}</Text>;
}

export function Kanji({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.kanji, style]}>{t("_kanji")}</Text>;
}

export function Games({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.games, style]}>{t("_games")}</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontWeight: "600",
    includeFontPadding: false,
  },
  home: {
    fontSize: 50,
  },
  list: {
    fontSize: 50,
  },
  words: {
    fontSize: 50,
  },
  kanji: {
    fontSize: 50,
  },
  games: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
});

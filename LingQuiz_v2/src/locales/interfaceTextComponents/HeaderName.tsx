// src/components/HeaderMenu.tsx
//import React from "react";
import { JSX } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

type Props = { style?: TextStyle };

export function Home_H({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.home, style]}>{t("_home")}</Text>;
}

export function List_H({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.list, style]}>{t("_list")}</Text>;
}

export function Words_H({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.words, style]}>{t("_words")}</Text>;
}

export function Kanji_H({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.kanji, style]}>{t("_kanji")}</Text>;
}

export function Games_H({ style }: Props): JSX.Element {
  const { t } = useTranslation();
  return <Text style={[styles.base, styles.games, style]}>{t("_games")}</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontWeight: "600",
    includeFontPadding: false,
    lineHeight: 60,
  },
  home: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 60,
  },
  list: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 60,
  },
  words: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 60,
  },
  kanji: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 60,
  },
  games: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 60,
  },
});

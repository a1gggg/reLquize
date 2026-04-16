//экран игры
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createDeck, flipCard, checkMatch } from "../game/engine";
import { Grid } from "../components/Grid";
import { saveBestScore, getBestScore, resetScore } from "../storage/scores";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";

const IMAGES = [
  "https://i.imgur.com/1.png",
  "https://i.imgur.com/2.png",
  "https://i.imgur.com/3.png",
  "https://i.imgur.com/4.png",
  "https://i.imgur.com/5.png",
  "https://i.imgur.com/6.png",
  "https://i.imgur.com/7.png",
  "https://i.imgur.com/8.png",
  "https://i.imgur.com/9.png",
  "https://i.imgur.com/10.png",
  "https://i.imgur.com/11.png",
  "https://i.imgur.com/12.png",
  "https://i.imgur.com/13.png",
  "https://i.imgur.com/14.png",
  "https://i.imgur.com/15.png",
  "https://i.imgur.com/16.png",
  "https://i.imgur.com/17.png",
  "https://i.imgur.com/18.png",
  "https://i.imgur.com/19.png",
  "https://i.imgur.com/20.png",
];

export default function GameScreen() {
  const [deck, setDeck] = useState(() => createDeck(IMAGES));
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    getBestScore().then(setBest);
  }, []);

  const onCardPress = (id: string) => {
    const { deck: newDeck, flippedCards } = flipCard(deck, id);
    setDeck(newDeck);

    if (flippedCards.length === 2) {
      setTimeout(() => {
        const checked = checkMatch(newDeck);
        setDeck(checked);
        setMoves((m) => m + 1);

        const allMatched = checked.every((c) => c.isMatched);
        if (allMatched) {
          saveBestScore(moves + 1);
          getBestScore().then(setBest);
        }
      }, 500);
    }
  };

  const restart = () => {
    setDeck(createDeck(IMAGES));
    setMoves(0);
  };

  return (
    <View style={{ padding: "1%" }}>
      <Link href="/games" dismissTo style={styles.link}>
        <ThemedText type="link_back">
          <IconSymbol size={38} name="square.and.pencil" color={""} />
          <ThemedText type="link_games">{"<"}</ThemedText>
        </ThemedText>
      </Link>
      <Text>Ходы: {moves}</Text>
      <Text>Лучший результат: {best ?? "-"}</Text>

      <Grid deck={deck} onCardPress={onCardPress} />

      <Button title="Перезапустить" onPress={restart} />
      <Button title="Сбросить рекорд" onPress={resetScore} />
    </View>
  );
}
const styles = StyleSheet.create({
  link: {
    marginTop: 10,
    marginLeft: 0,
    alignItems: "baseline",
    paddingBottom: "auto",
  },
});

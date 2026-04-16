
//сетка карточек
import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "./Card";
import { CardItem } from "../game/types";

type Props = {
  deck: CardItem[];
  onCardPress: (id: string) => void;
};

export function Grid({ deck, onCardPress }: Props) {
  return (
    <View style={styles.grid}>
      {deck.slice(0, 30).map((card) => (
        <Card key={card.id} item={card} onPress={() => onCardPress(card.id)} />
      ))}
    </View>
  );
}

const CARD_WIDTH = 60;
const CARD_MARGIN = 4;
const COLS = 5;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: COLS * (CARD_WIDTH + CARD_MARGIN * 2),
    justifyContent: "center",
  },
});

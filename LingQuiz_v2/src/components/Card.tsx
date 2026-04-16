// UI карточки

import React from "react";
import { Pressable, Image, StyleSheet, View } from "react-native";
import { CardItem } from "../game/types";

type Props = {
  item: CardItem;
  onPress: () => void;
};

export function Card({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} disabled={item.isMatched || item.isFlipped}>
      <View style={[styles.card, item.isFlipped && styles.flipped]}>
        {item.isFlipped || item.isMatched ? (
          <Image source={{ uri: item.value }} style={styles.img} />
        ) : (
          <View style={styles.back} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 60,
    height: 80,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  flipped: {
    backgroundColor: "#fff",
  },
  back: {
    flex: 1,
    backgroundColor: "#444",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

// логика игры
import { CardItem } from "@/src/game/types";

export function createDeck(images: string[]): CardItem[] {
  const duplicated = [...images, ...images];
  const shuffled = duplicated
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item, index) => ({
      id: index.toString(),
      value: item.value,
      isFlipped: false,
      isMatched: false,
    }));

  return shuffled;
}

export function flipCard(
  deck: CardItem[],
  id: string,
): { deck: CardItem[]; flippedCards: CardItem[] } {
  const newDeck = deck.map((c) =>
    c.id === id ? { ...c, isFlipped: !c.isFlipped } : c,
  );

  const flippedCards = newDeck.filter((c) => c.isFlipped && !c.isMatched);

  return { deck: newDeck, flippedCards };
}

export function checkMatch(deck: CardItem[]): CardItem[] {
  const flipped = deck.filter((c) => c.isFlipped && !c.isMatched);

  if (flipped.length !== 2) return deck;

  const [a, b] = flipped;

  if (a.value === b.value) {
    return deck.map((c) =>
      c.isFlipped && !c.isMatched ? { ...c, isMatched: true } : c,
    );
  }

  return deck.map((c) =>
    c.isFlipped && !c.isMatched ? { ...c, isFlipped: false } : c,
  );
}

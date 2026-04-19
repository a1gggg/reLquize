// components/ListItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Pair } from "../../../components/store/listsStore";

type Props = {
  pair: Pair;
  onEdit?: (pair: Pair) => void;
  onDelete?: (pairId: string) => void;
  compact?: boolean;
};

export default function ListItem({ pair, onEdit, onDelete, compact = false }: Props) {
  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={styles.textWrap}>
        <Text style={styles.keyText} numberOfLines={1}>
          {pair.key}
        </Text>
        <Text style={styles.valueText} numberOfLines={1}>
          {pair.value}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit && onEdit(pair)} style={styles.actionButton}>
          <Text style={styles.actionText}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete && onDelete(pair.id)} style={styles.actionButton}>
          <Text style={[styles.actionText, styles.deleteText]}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  rowCompact: {
    paddingVertical: 4,
  },
  textWrap: {
    flex: 1,
    marginRight: 8,
  },
  keyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  valueText: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 6,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 16,
  },
  deleteText: {
    color: "#c00",
  },
});

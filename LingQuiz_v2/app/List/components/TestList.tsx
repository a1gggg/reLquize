// app/tests/index.tsx
/*import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Link } from "expo-router";
import { useListsStore } from "../../../components/store/listsStore";
import type { KVList } from "../../../components/store/listsStore";

export default function AllTestsPage() {
  const { lists, deleteList } = useListsStore();

  const renderItem = ({ item }: { item: KVList }) => {
    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.items.length} вопросов</Text>
        </View>

        <View style={styles.actions}>
          <Link
            href={{ pathname: "./../YouTest", params: { id: item.id } }}
            asChild
          >
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playText}>Пройти</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.deleteWrap}>
            <Button
              title="Удалить"
              color="#c00"
              onPress={() => {
                deleteList(item.id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Сохранённые тесты</Text>

      <FlatList
        data={lists}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={
          lists.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Пока нет сохранённых тестов.</Text>
          </View>
        }
        // avoid nesting ScrollViews elsewhere — this FlatList should be top-level scroll container
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff00",
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#adadad",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 10,
    fontWeight: "600",
  },
  meta: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#2E8B57",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  playText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteWrap: {
    marginLeft: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBox: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
  },
});
*/

//////////////////////////
// app/tests/index.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { useListsStore } from "../../../components/store/listsStore";
import type { KVList } from "../../../components/store/listsStore";

export default function AllTestsPage() {
  const { lists, deleteList, swapPairs } = useListsStore();

  const confirmSwap = (listId: string, title: string) => {
    Alert.alert(
      "Поменять ключи и значения",
      `Вы уверены, что хотите поменять ключи и значения для списка "${title}"? Это действие перезапишет пары.`,
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Поменять",
          style: "destructive",
          onPress: () => swapPairs(listId),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: KVList }) => {
    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.items.length} вопросов</Text>
        </View>

        <View style={styles.actions}>
          <Link href={{ pathname: "/YouTest", params: { id: item.id } }} asChild>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playText}>Пройти</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            style={[styles.playButton, styles.swapButton]}
            onPress={() => confirmSwap(item.id, item.title)}
          >
            <Text style={styles.playText}>Поменять</Text>
          </TouchableOpacity>

          <View style={styles.deleteWrap}>
            <Button
              title="Удалить"
              color="#c00"
              onPress={() => {
                deleteList(item.id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Сохранённые тесты</Text>

      <FlatList
        data={lists}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={
          lists.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Пока нет сохранённых тестов.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff00",
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#adadad",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    //flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#2E8B57",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  swapButton: {
    backgroundColor: "#FF8C00",
    marginLeft: 8,
  },
  playText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteWrap: {
    marginLeft: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBox: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
  },
});

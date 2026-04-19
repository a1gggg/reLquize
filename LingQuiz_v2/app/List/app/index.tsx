// app/index.tsx
//страница со списками (CRUD)

// app/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useListsStore } from "../store/listsStore";
import KeyValueEditor from "../components/KeyValueEditor";
import ListItem from "../components/ListItem";

export default function Home() {
  const { lists, addList, addPair, updatePair, deletePair, deleteList } =
    useListsStore();

  const [newListTitle, setNewListTitle] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Modal state
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorListId, setEditorListId] = useState<string | null>(null);
  const [editingPairId, setEditingPairId] = useState<string | null>(null);
  const [initialKey, setInitialKey] = useState("");
  const [initialValue, setInitialValue] = useState("");

  const openAddPair = (listId: string) => {
    setEditorListId(listId);
    setEditingPairId(null);
    setInitialKey("");
    setInitialValue("");
    setEditorVisible(true);
  };

  const openEditPair = (
    listId: string,
    pairId: string,
    key: string,
    value: string
  ) => {
    setEditorListId(listId);
    setEditingPairId(pairId);
    setInitialKey(key);
    setInitialValue(value);
    setEditorVisible(true);
  };

  const onSavePair = (key: string, value: string) => {
    if (!editorListId) return;
    if (editingPairId) {
      updatePair(editorListId, editingPairId, key, value);
    } else {
      addPair(editorListId, key, value);
    }
    setEditorVisible(false);
  };

  const renderList = ({ item: list }: { item: typeof lists[number] }) => {
    const isExpanded = expanded === list.id;

    return (
      <View style={styles.listBlock}>
        <TouchableOpacity
          onPress={() => setExpanded(isExpanded ? null : list.id)}
        >
          <Text style={styles.listTitle}>
            {isExpanded ? "▼" : "▶"} {list.title}
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.listContent}>
            {list.items.length === 0 ? (
              <Text style={styles.emptyText}>Список пуст</Text>
            ) : (
              list.items.map((item) => (
                <ListItem
                  key={item.id}
                  pair={item}
                  onEdit={() =>
                    openEditPair(list.id, item.id, item.key, item.value)
                  }
                  onDelete={() => deletePair(list.id, item.id)}
                />
              ))
            )}

            <View style={{ marginTop: 8 }}>
              <Button title="Добавить пару" onPress={() => openAddPair(list.id)} />
            </View>

            {list.items.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Link
                  href={{ pathname: "./..//app/YouTest", params: { id: list.id } }}
                  asChild
                >
                  <TouchableOpacity style={styles.testButton}>
                    <Text style={styles.testButtonText}>Пройти тест</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}

            <View style={{ marginTop: 8 }}>
              <Button
                title="Удалить список"
                color="#c00"
                onPress={() => {
                  deleteList(list.id);
                  if (expanded === list.id) setExpanded(null);
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={styles.headerTitle}>Ваши списки</Text>

            <View style={styles.row}>
              <TextInput
                placeholder="Название списка"
                value={newListTitle}
                onChangeText={setNewListTitle}
                style={styles.input}
              />
              <Button
                title="Добавить"
                onPress={() => {
                  if (newListTitle.trim()) {
                    addList(newListTitle.trim());
                    setNewListTitle("");
                  }
                }}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#666" }}>Пока нет списков — добавьте первый.</Text>
          </View>
        }
      />

      <KeyValueEditor
        visible={editorVisible}
        initialKey={initialKey}
        initialValue={initialValue}
        title={editingPairId ? "Редактировать пару" : "Добавить пару"}
        onCancel={() => setEditorVisible(false)}
        onSave={onSavePair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    minWidth: "100%", // гарантируем минимальную высоту
    flexShrink: 0, // запрещаем сжиматься
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    minHeight: 40,
    flexShrink: 0, // запрещаем сжиматься
  },
  listBlock: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  listContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  emptyText: {
    color: "#666",
    fontStyle: "italic",
  },
  testButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  testButtonText: {
    color: "white",
    textAlign: "center",
  },
});

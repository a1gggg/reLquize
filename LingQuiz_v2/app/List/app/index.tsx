// app/index.tsx
//страница со списками (CRUD)

// app/index.tsx
/*import React, { useState } from "react";
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
import { useListsStore } from "../../../components/store/listsStore";
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
*/
//////////////////////////////////////

/*
// app/index.tsx
// страница со списками (CRUD)

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { useListsStore } from "../../../components/store/listsStore";
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

  const flatListRef = useRef<FlatList<any> | null>(null);

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
              <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
                
                <Link
                  href={{ pathname: "/YouTest", params: { id: list.id } }}
                  asChild
                >
                  <TouchableOpacity style={styles.testButton}>
                    <Text style={styles.testButtonText}>Пройти тест</Text>
                  </TouchableOpacity>
                </Link>

                
                <Link
                  href={{ pathname: "/YouTest", params: { id: list.id, swap: "1" } }}
                  asChild
                >
                  <TouchableOpacity style={[styles.testButton, styles.swapButton]}>
                    <Text style={styles.testButtonText}>Пройти (swap)</Text>
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

  const ListHeader = () => (
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
              // при желании можно прокрутить к началу/концу:
              // flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={renderList}
          contentContainerStyle={styles.container}
          ListHeaderComponent={<ListHeader />}
          ListEmptyComponent={
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "#666" }}>Пока нет списков — добавьте первый.</Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
        />

        <KeyValueEditor
          visible={editorVisible}
          initialKey={initialKey}
          initialValue={initialValue}
          title={editingPairId ? "Редактировать пару" : "Добавить пару"}
          onCancel={() => setEditorVisible(false)}
          onSave={onSavePair}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    minWidth: "100%",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    minHeight: 40,
    flexShrink: 0,
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
  swapButton: {
    backgroundColor: "#FF8C00",
    marginLeft: 8,
  },
  testButtonText: {
    color: "white",
    textAlign: "center",
  },
});
*/
/////////////////////////////////////////
// app/index.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput as RNTextInput,
} from "react-native";
import { Link } from "expo-router";
import { useListsStore } from "../../../components/store/listsStore";
import KeyValueEditor from "../components/KeyValueEditor";
import ListItem from "../components/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { lists, addList, addPair, updatePair, deletePair, deleteList, swapPairs } =
    useListsStore();

  const [newListTitle, setNewListTitle] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Modal state
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorListId, setEditorListId] = useState<string | null>(null);
  const [editingPairId, setEditingPairId] = useState<string | null>(null);
  const [initialKey, setInitialKey] = useState("");
  const [initialValue, setInitialValue] = useState("");

  const flatListRef = useRef<FlatList<any> | null>(null);
  const inputRef = useRef<RNTextInput | null>(null);

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

  const confirmSwapList = (listId: string) => {
    Alert.alert(
      "Поменять ключи и значения",
      "Вы уверены? Это действие поменяет местами ключи и значения для всех пар в списке (изменение сохранится).",
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

  const renderList = ({ item: list }: { item: typeof lists[number] }) => {
    const isExpanded = expanded === list.id;

    return (
      <View style={styles.listBlock}>
        <TouchableOpacity onPress={() => setExpanded(isExpanded ? null : list.id)}>
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
                  onEdit={() => openEditPair(list.id, item.id, item.key, item.value)}
                  onDelete={() => deletePair(list.id, item.id)}
                />
              ))
            )}

            <View style={{ marginTop: 8 }}>
              <Button title="Добавить пару" onPress={() => openAddPair(list.id)} />
            </View>

            {list.items.length > 0 && (
              <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
                {/* Обычный запуск теста (без swap-параметра) */}
                <Link href={{ pathname: "/YouTest", params: { id: list.id } }} asChild>
                  <TouchableOpacity style={styles.testButton}>
                    <Text style={styles.testButtonText}>Пройти тест</Text>
                  </TouchableOpacity>
                </Link>

                {/* Кнопка для обмена ключ/значение для всего списка (сохранённое изменение) */}
                <TouchableOpacity
                  style={[styles.testButton, styles.swapButton]}
                  onPress={() => confirmSwapList(list.id)}
                >
                  <Text style={styles.testButtonText}>Поменять ключ/значение</Text>
                </TouchableOpacity>
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

  // Header вынесен ВНЕ FlatList как статичный блок, чтобы TextInput не терял фокус при перерисовке списка
  const Header = (
    <View>
      <Text style={styles.headerTitle}>Ваши списки</Text>

      <View style={styles.row}>
        <TextInput
          ref={inputRef}
          placeholder="Название списка"
          defaultValue={newListTitle}
          onChangeText={setNewListTitle}
          style={styles.input}
          returnKeyType="done"
          blurOnSubmit={false}
        />
        <Button
          title="Добавить"
          onPress={() => {
            if (newListTitle.trim()) {
              addList(newListTitle.trim());
              setNewListTitle("");
              // очищаем контролируемый input (он у нас uncontrolled, поэтому clear)
              inputRef.current?.clear();
              // опционально прокрутить к началу
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {/* Header рендерим отдельно, чтобы TextInput не пересоздавался FlatList */}
        <View style={styles.headerWrap}>{Header}</View>

        <FlatList
          ref={flatListRef}
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={renderList}
          contentContainerStyle={styles.container}
          ListEmptyComponent={
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "#666" }}>Пока нет списков — добавьте первый.</Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
        />

        <KeyValueEditor
          visible={editorVisible}
          initialKey={initialKey}
          initialValue={initialValue}
          title={editingPairId ? "Редактировать пару" : "Добавить пару"}
          onCancel={() => setEditorVisible(false)}
          onSave={onSavePair}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "transparent",
  },
  container: {
    paddingHorizontal: 20,
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
    minWidth: "100%",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    minHeight: 40,
    flexShrink: 0,
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
  swapButton: {
    backgroundColor: "#FF8C00",
    marginLeft: 8,
  },
  testButtonText: {
    color: "white",
    textAlign: "center",
  },
});

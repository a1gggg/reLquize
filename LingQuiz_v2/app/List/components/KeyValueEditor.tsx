// components/KeyValueEditor.tsx
// components/KeyValueEditor.tsx
/*
import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSave: (key: string, value: string) => void;
  initialKey?: string;
  initialValue?: string;
  title?: string;
};

export default function KeyValueEditor({
  visible,
  onCancel,
  onSave,
  initialKey = "",
  initialValue = "",
  title = "Добавить пару",
}: Props) {
  const [keyText, setKeyText] = useState<string>(initialKey);
  const [valueText, setValueText] = useState<string>(initialValue);

  useEffect(() => {
    setKeyText(initialKey);
    setValueText(initialValue);
  }, [initialKey, initialValue, visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.label}>Ключ</Text>
          <TextInput
            value={keyText}
            onChangeText={setKeyText}
            style={styles.input}
            placeholder="Введите ключ"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Значение</Text>
          <TextInput
            value={valueText}
            onChangeText={setValueText}
            style={styles.input}
            placeholder="Введите значение"
            autoCapitalize="none"
          />

          <View style={styles.buttonsRow}>
            <View style={styles.buttonWrap}>
              <Button title="Отмена" onPress={onCancel} color="#888" />
            </View>

            <View style={styles.buttonWrap}>
              <Button
                title="Сохранить"
                onPress={() => {
                  const k = keyText.trim();
                  const v = valueText.trim();
                  onSave(k, v);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 4, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  buttonWrap: { flex: 1, marginHorizontal: 6 },
});
*/
// components/KeyValueEditor.tsx
import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSave: (key: string, value: string) => void;
  initialKey?: string;
  initialValue?: string;
  title?: string;
};

export default function KeyValueEditor({
  visible,
  onCancel,
  onSave,
  initialKey = "",
  initialValue = "",
  title = "Добавить пару",
}: Props) {
  const [keyText, setKeyText] = useState<string>(initialKey);
  const [valueText, setValueText] = useState<string>(initialValue);

  useEffect(() => {
    setKeyText(initialKey);
    setValueText(initialValue);
  }, [initialKey, initialValue, visible]);

  const swapFields = () => {
    setKeyText((k) => {
      const prevK = k;
      setValueText((v) => prevK);
      return valueText;
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.label}>Ключ</Text>
          <TextInput
            value={keyText}
            onChangeText={setKeyText}
            style={styles.input}
            placeholder="Введите ключ"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Значение</Text>
          <TextInput
            value={valueText}
            onChangeText={setValueText}
            style={styles.input}
            placeholder="Введите значение"
            autoCapitalize="none"
          />

          <View style={styles.buttonsRow}>
            <View style={styles.buttonWrap}>
              <Button title="Поменять местами" onPress={swapFields} color="#FF8C00" />
            </View>

            <View style={styles.buttonWrap}>
              <Button title="Отмена" onPress={onCancel} color="#888" />
            </View>

            <View style={styles.buttonWrap}>
              <Button
                title="Сохранить"
                onPress={() => {
                  const k = keyText.trim();
                  const v = valueText.trim();
                  onSave(k, v);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 4, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  buttonWrap: { flex: 1, marginHorizontal: 6 },
});

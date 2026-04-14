import React from "react";
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";

type HeaderButtonProps = {
  onPress?: (e: GestureResponderEvent) => void;
  label?: string;
  icon?: ImageSourcePropType;
};

export const HeaderButton = ({
  onPress = () => {},
  label = "",
  icon,
}: HeaderButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
    >
      {icon ? (
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    left: "0%",
  },
  buttonPressed: {
    backgroundColor: "rgba(201, 201, 201, 0.52)",
  },
  text: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
    left: "0%",
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: "#000000",
    left: "0%",
    flexDirection: "row",
  },
});

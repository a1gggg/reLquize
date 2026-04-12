import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing, Pressable, } from "react-native";
import * as Haptics from "expo-haptics";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType, TextStyle } from "react-native";


type Props = {
  /** Локальный или удалённый источник изображения логотипа */
  logo?: ImageSourcePropType;
  /** Текст рядом с логотипом (например, название приложения) */
  title?: string;
  /** Размер иконки логотипа в пикселях */
  size?: number;
  /** Стиль для текста заголовка */
  titleStyle?: TextStyle;
  /** Обработчик нажатия на логотип (опционально) */
  onPress?: () => void;
  /** Скрыть текст и показывать только логотип */
  hideTitle?: boolean;
};

export function HeaderLogo({
  logo,
  title = "LingQuiz",
  size = 28,
  titleStyle,
  onPress,
  hideTitle = false,
}: Props): JSX.Element {
  const Container: React.ComponentType<any> = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel={title}
      style={styles.container}
      activeOpacity={0.8}
    >
      {logo ? (
        <Image source={logo} style={[styles.logo, { width: size, height: size }]} resizeMode="contain" />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size }]} />
      )}
      {!hideTitle && <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: 8,
    borderRadius: 4,
  },
  placeholder: {
    marginRight: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});

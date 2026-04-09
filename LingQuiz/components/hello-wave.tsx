import React, { useRef, useEffect } from "react";
import { Animated, Easing, Pressable } from "react-native";

export function HelloWave() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const runningAnimRef = useRef(null);

  useEffect(() => {
    return () => {
      // очистка при размонтировании
      if (runningAnimRef.current) {
        runningAnimRef.current.stop();
        runningAnimRef.current = null;
      }
    };
  }, []);

  const runWave = () => {
    // остановить текущую анимацию, если есть
    if (runningAnimRef.current) {
      runningAnimRef.current.stop();
      runningAnimRef.current = null;
    }

    // сброс значения в начальное положение
    rotateAnim.setValue(0);
    // одна итерация: влево (to 1) и обратно (to 0)
    const singleWave = Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 2,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 3,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 4,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // зациклить singleWave 4 раза
    const looped = Animated.loop(singleWave, { iterations: 1 });

    // сохранить ссылку и запустить
    runningAnimRef.current = looped;
    looped.start(() => {
      // по завершении очистить ссылку
      runningAnimRef.current = null;
    });
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "-25deg", "0deg", "25deg", "0deg"],
  });

  return (
    <Pressable onPress={runWave} hitSlop={8}>
      <Animated.Image
        source={require("@/assets/images/iconling.png")}
        style={{
          width: 40,
          height: 40,
          transform: [{ rotate }],
        }}
      />
    </Pressable>
  );
}

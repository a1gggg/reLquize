/* import Animated from 'react-native-reanimated'; //Старий імпорт

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
*/

import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing, Pressable, View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

export function HelloWave() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [particles, setParticles] = useState([]);

  const runningAnimRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    loadSound();
    return () => {
      if (runningAnimRef.current) {
        runningAnimRef.current.stop();
      }
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/pop.mp3"),
    );
    soundRef.current = sound;
  };

  const spawnParticles = () => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push({
        id: Math.random(),
        anim: new Animated.Value(0),
        angle: (i / 6) * Math.PI * 2,
      });
    }
    setParticles(arr);

    arr.forEach((p) => {
      Animated.timing(p.anim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });

    setTimeout(() => setParticles([]), 600);
  };

  const runWave = async () => {
    // вибрация
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // звук
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }

    // частицы
    spawnParticles();

    // остановить текущую анимацию
    if (runningAnimRef.current) {
      runningAnimRef.current.stop();
      runningAnimRef.current = null;
    }

    rotateAnim.setValue(0);
    scaleAnim.setValue(1);

    // волна
    const wave = Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 2,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 3,
        duration: 120,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 4,
        duration: 120,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // пружина (взрыв пузырька)
    const bubble = Animated.sequence([
      // быстрое уменьшение
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 80,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      // быстрое увеличение
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 90,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      // мягкий возврат (spring)
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
    ]);

    const combined = Animated.parallel([wave, bubble]);

    runningAnimRef.current = combined;
    combined.start(() => {
      runningAnimRef.current = null;
    });
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "-25deg", "0deg", "25deg", "0deg"],
  });

  return (
    <Pressable onPress={runWave} hitSlop={8}>
      <View
        style={{
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* частицы */}
        {particles.map((p) => {
          const translateX = p.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.cos(p.angle) * 25],
          });
          const translateY = p.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.sin(p.angle) * 25],
          });
          const opacity = p.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });

          return (
            <Animated.View
              key={p.id}
              style={[
                styles.particle,
                {
                  opacity,
                  transform: [{ translateX }, { translateY }],
                },
              ]}
            />
          );
        })}

        {/* иконка */}
        <Animated.Image
          source={require("@/assets/images/iconling.png")}
          style={{
            width: 40,
            height: 40,
            transform: [{ rotate }, { scale: scaleAnim }],
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4fc7ff",
  },
});

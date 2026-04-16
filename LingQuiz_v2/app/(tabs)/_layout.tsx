import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Home,
  List,
  Words,
  Kanji,
  Games,
} from "@/src/locales/interfaceTextComponents/FooterMenu";
  
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => <Home />,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: () => <List />,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="words"
        options={{
          tabBarLabel: () => <Words />,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="textformat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kanji"
        options={{
          tabBarLabel: () => <Kanji />,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="text.cursor" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          tabBarLabel: () => <Games />,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="character.textbox" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

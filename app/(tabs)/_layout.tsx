import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.natural.primary, // Kolor aktywnej ikony/tabu
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Dla przezroczystości/blur na iOS
          },
          android: {
            position: 'relative',
            backgroundColor: Colors.natural.background, // Kolor tła z naszej palety
            height: 60, // Wysokość tab bar na Androidzie

          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          ), tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="league"
        options={{
          title: 'League',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={28} color={color} />
          ), tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Start',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="dog-service" size={32} color={color} />

          ), tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',

          },

        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons size={28} name="history" color={color} />
          ), tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ustawienia',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons size={28} name="settings" color={color} />
          ), tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />





    </Tabs>

  );
}
const styles = {
  ...Colors,
};
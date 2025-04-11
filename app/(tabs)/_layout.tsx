import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '@/constants/colorsApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary, // Kolor aktywnej ikony/tabu
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: COLORS.textPrimary
        },
        headerShadowVisible: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom
        }
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="league"
        options={{
          title: 'League',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="dog-service" size={32} color={color} />

          )

        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons size={28} name="history" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ustawienia',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons size={28} name="settings" color={color} />
          )
        }}
      />





    </Tabs>

  );
}

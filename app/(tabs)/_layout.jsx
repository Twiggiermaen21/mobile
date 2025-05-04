import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import texture from '@/constants/colorsApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore } from '@/store/settingStore';
import TabsBarText from '@/assets/lang/TabsBar.text'
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const { color, lang } = useSettingsStore();

  const t = TabsBarText[lang];
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: texture[color].primary,
        tabBarInactiveTintColor: texture[color].inactiveIcon,
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: texture[color].textPrimary
        },
        headerShadowVisible: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: texture[color].cardBackground,
          borderTopWidth: 1,
          borderTopColor: texture[color].border,
          paddingTop: 5,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom
        },
        tabBarIconStyle: {
          color: texture[color].textPrimary
        }
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: t.profil,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="league"
        options={{
          title: t.league,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t.start,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dog-service" size={32} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t.history,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="history" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: t.gallery,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="image-multiple" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="settings" color={color} />
          )
        }}
      />
    </Tabs>
  );
}

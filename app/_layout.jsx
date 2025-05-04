import { Stack, useRouter, useSegments } from 'expo-router';
// import { StatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '@/components/SafeScreen';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingStore';

import texture from '@/constants/colorsApp';


export default function RootLayout() {

  const router = useRouter();
  const segments = useSegments();

  const { authReady, checkAuth, user, token } = useAuthStore();
  const { initializeSettings, color } = useSettingsStore();

  const COLORS = texture[color];
  // // useEffect(() => {
  // //   checkAuth();
  // //   initializeSettings();
  // // }, [])

  // useEffect(() => {
  //   checkAuth();
  //   initializeSettings();
  //   if (!authReady) return;
  //   const inAuthScreen = segments[0] === "(auth)"
  //   const isSignedIn = user && token;

  //   if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
  //   else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  // }, [user, token, segments])



  useEffect(() => {
    checkAuth(); // Runs once
    initializeSettings();
  }, []); // ✅ Tylko raz przy uruchomieniu


  useEffect(() => {
    if (!authReady) return; // ✅ Poczekaj aż auth będzie gotowy

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [authReady, user, token, segments]); // ✅ Zależności od stanu autoryzacji


  return (

    <SafeAreaProvider >
      <StatusBar style="dark" backgroundColor="#8B4513" />
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>

  );
}




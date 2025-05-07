import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '@/components/SafeScreen';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingStore';

export default function RootLayout() {

  const router = useRouter();
  const segments = useSegments();
  const { authReady, checkAuth, user, token } = useAuthStore();
  const { initializeSettings} = useSettingsStore();


  useEffect(() => {
    checkAuth();
    initializeSettings();
  }, []);


  useEffect(() => {
    if (!authReady) return;
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [authReady, user, token, segments]);


  return (
    <SafeAreaProvider >
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>

  );
}




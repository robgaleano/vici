import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store';

export default function RootLayout() {
  const initialize = useAuthStore((s) => s.initialize);
  const isLoading = useAuthStore((s) => s.isLoading);

  // D3: initialize() reads the persisted session from SecureStore and
  // subscribes to onAuthStateChange. Must run once on app mount.
  useEffect(() => {
    initialize();
  }, [initialize]);

  // D3: isLoading gate — blocks rendering until the session is resolved,
  // preventing the login screen from flashing on cold start.
  if (isLoading) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}

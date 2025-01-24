import React from 'react'
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='viewer'/>
    </Stack>
  )
}

export default RootLayout;
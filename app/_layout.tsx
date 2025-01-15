import React from 'react'
import { View } from 'react-native'
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <Slot/>
    </View>
  )
}

export default RootLayout;
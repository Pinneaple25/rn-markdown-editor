import React from 'react'
import { View } from 'react-native'
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <View style={{ flex: 1, marginTop: 40, marginBottom: 20 }}>
      <Slot/>
      <StatusBar style='light'/>
    </View>
  )
}

export default RootLayout;
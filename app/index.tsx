import React from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();
export default function Index() {
  const route = useRouter()
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text onPress={() => route.navigate('/(registrations)/signin')} >Sign in to page</Text>
    </View>
  );
}


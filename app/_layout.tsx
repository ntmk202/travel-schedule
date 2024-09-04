import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() { 
    const [loaded, error] = useFonts({
        'RC_Bold': require('../assets/fonts/RobotoCondensed-Bold.ttf'),
        'RC_Light': require('../assets/fonts/RobotoCondensed-Light.ttf'),
        'RC_Medium': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
        'RC_Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        'RC_SemiBold': require('../assets/fonts/RobotoCondensed-SemiBold.ttf'),
      });
    
      useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      }
    
      return (
        <PaperProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(registrations)" />
              <Stack.Screen name="(drawers)" />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </PaperProvider>
      );
}

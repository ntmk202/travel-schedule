import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Signin } from './screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    'RC_Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    'RC_Light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    'RC_Medium': require('./assets/fonts/RobotoCondensed-Medium.ttf'),
    'RC_Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'RC_SemiBold': require('./assets/fonts/RobotoCondensed-SemiBold.ttf'),
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
        <Signin/>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}


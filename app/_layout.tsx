import { AuthContextProvider, useAuth } from '@/configs/authConfig';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const MainLayout=()=>{
  const {isAuthenticated} = useAuth();
  const segments = useSegments()
  const route = useRouter()

  useEffect(() => {
    if(typeof isAuthenticated=='undefined') return
    const inApp = segments[0]=='(drawers)'
    if(isAuthenticated && !inApp){
      route.replace('/account/profile')
    }else if(isAuthenticated==false){
      route.replace('/')
    }
  }, [isAuthenticated])
  return <Slot/>
}

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
        <AuthContextProvider>
          <PaperProvider>
            <SafeAreaProvider>
              <MainLayout/>
              <StatusBar style="auto" />
            </SafeAreaProvider>
          </PaperProvider>
        </AuthContextProvider>
      );
}

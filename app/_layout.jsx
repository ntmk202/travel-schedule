import { AuthContextProvider, useAuth } from '@/configs/authConfig';
import { CreateTripContext } from '@/configs/tripConfig';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '@/configs/FirebaseConfig';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const route = useRouter();
  const [latestTripId, setLatestTripId] = useState(null);

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(drawers)';
    if (isAuthenticated && !inApp) {
      fetchLatestTrip();
    } else if (isAuthenticated === false) {
      route.replace('/signin');
    }
  }, [isAuthenticated]);

  const fetchLatestTrip = async () => {
    try {
      const user = auth.currentUser;
      if (user?.uid) {
        const tripRef = query(collection(db, "users", user.uid, "userTrip"));
        const querySnap = await getDocs(tripRef);
        
        const tripsWithPlan = [];
        querySnap.forEach((doc) => {
          const data = doc.data();
          if (data.tripPlan) tripsWithPlan.push(data);
        });
        
        if (tripsWithPlan.length > 0) {
          const latestTrip = tripsWithPlan[tripsWithPlan.length - 1];
          setLatestTripId(latestTrip.tripId);
          route.replace(`/planner/${latestTrip.tripId}`);
        } else {
          route.replace('/planner/[id]'); 
        }
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  return <Slot />;
};

export default function RootLayout() {
  const [tripDataContext, setTripDataContext] = useState([]);
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
      <CreateTripContext.Provider value={{ tripDataContext, setTripDataContext }}>
        <PaperProvider>
          <SafeAreaProvider>
            <MainLayout />
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </PaperProvider>
      </CreateTripContext.Provider>
    </AuthContextProvider>
  );
}

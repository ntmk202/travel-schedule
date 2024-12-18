import React, { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import {
  ChatModal,
  CustomDrawerContent,
  InformationModal,
  ShareModal,
} from "@/components";
import { TouchableOpacity, View } from "react-native";
import { auth, db } from "@/configs/FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
// import * as Linking from 'expo-linking'

const _layout: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [userTrips, setUserTrips] = useState<any>([]);
  
  const fetchAllTrips = async () => {
    const userId = auth.currentUser?.uid;
  
    if (!userId) return;
  
    try {
      // Fetch user trips
      const userTripsRef = collection(db, "users", userId, "userTrip");
      const userTripsSnapshot = await getDocs(userTripsRef);
      const userTrips = userTripsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isOwner: true, // Mark as owned trips
      }));
  
      // Fetch shared trips
      const sharedTripsRef = collection(db, "users", userId, "sharedTrips");
      const sharedTripsSnapshot = await getDocs(sharedTripsRef);
      const sharedTripsPromises = sharedTripsSnapshot.docs.map(async (sharedTripDoc) => {
        const { ownerId, tripId } = sharedTripDoc.data();
        const tripRef = doc(db, "users", ownerId, "userTrip", tripId);
        const tripSnapshot = await getDoc(tripRef);
  
        return tripSnapshot.exists()
          ? { id: tripId, ...tripSnapshot.data(), ownerId, isShared: true }
          : null;
      });
  
      const sharedTrips = (await Promise.all(sharedTripsPromises)).filter(Boolean);
  
      // Combine all trips
      const allTrips = [...userTrips, ...sharedTrips];
      console.log(allTrips);
      return allTrips;
    } catch (error) {
      console.error("Error fetching trips:", error);
      return [];
    }
  };

  React.useEffect(() => {
  const fetchTrips = async () => {
    const trips = await fetchAllTrips();
    setUserTrips(trips);
  };

  fetchTrips();
}, []);


  const headerTitleStyle = {
    fontFamily: "RC_SemiBold",
    fontSize: 24,
    letterSpacing: 0.24,
    maxWidth: 190,
  };

  const curentId = selectedTripId || id
  const currentTrip = userTrips.find((trip: any) => trip.id === curentId);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} userTrips={userTrips} setUserTrips={setUserTrips} setSelectedTripId={setSelectedTripId}/>}
        screenOptions={{
          drawerType: "slide",
          drawerLabelStyle: { fontFamily: "RC_Medium" }
        }}
      >
          <Drawer.Screen 
            name="planner/[id]" 
            options={{
            headerTitle: currentTrip
            ? `Trip to ${currentTrip?.tripPlan?.trip?.destination || "..."}`
            : "",
            headerTitleStyle: headerTitleStyle,
              headerRight: () => (
                <>
                {currentTrip? (
                <View style={{ flexDirection: "row", gap: 15, marginEnd: 20 }}>
                  <TouchableOpacity onPress={() => setVisibleShare(true)}>
                    <Icon source="share-variant-outline" size={20} />
                  </TouchableOpacity>
                  <ShareModal
                    visible={visibleShare}
                    onDismiss={() => setVisibleShare(false)}
                    // onSubmit={handleShareSubmit}
                    tripData={selectedTripId}
                  />
                  <TouchableOpacity onPress={() => setVisibleChat(true)}>
                    <Icon source="chat-processing-outline" size={20} />
                  </TouchableOpacity>
                  <ChatModal
                    visible={visibleChat}
                    onDismiss={() => setVisibleChat(false)}
                    tripData={curentId}
                  />
                  <TouchableOpacity onPress={() => setVisibleInfo(true)}>
                    <Icon source="information-outline" size={20} />
                  </TouchableOpacity>
                  <InformationModal 
                    visible={visibleInfo}
                    onDismiss={() => setVisibleInfo(false)}
                    tripData={curentId}
                    userTrips={userTrips} 
                    setUserTrips={setUserTrips}
                  />
                </View>
                ): null}
                </>
              ),
              drawerIcon: ({ size, color }) => (
                <Icon source="notebook" size={size} color={color} />
              ),
            }} 
          />
        <Drawer.Screen
          name="account/profile"
          options={{
            headerTitle: "Profile",
            headerTitleStyle: headerTitleStyle,
            drawerIcon: ({ size, color }) => (
              <Icon source="account" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings/config"
          options={{
            headerTitle: "Setting",
            headerTitleStyle: headerTitleStyle,
            drawerIcon: ({ size, color }) => (
              <Icon source="cog" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;

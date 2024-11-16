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
import { collection, getDocs } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import * as Linking from 'expo-linking'

const _layout: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [userTrips, setUserTrips] = useState<any>([]);

  React.useEffect(() => {
    const fetchUserTrips = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userTripsRef = collection(db, "users", userId, "userTrip");
        const querySnapshot = await getDocs(userTripsRef);
        const trips:any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserTrips(trips);
      }
    };

    fetchUserTrips();
  }, []);
  

  const headerTitleStyle = {
    fontFamily: "RC_SemiBold",
    fontSize: 24,
    letterSpacing: 0.24,
    maxWidth: 180,
  };

  const currentTrip = userTrips.find((trip: any) => trip.id === (selectedTripId || id));

  const url = Linking.useURL();
  React.useEffect(() => {
    if (url) {
      const { hostname, path, queryParams } = Linking.parse(url);
      console.log(`Linked with hostname: ${hostname}, path: ${path}, data: ${JSON.stringify(queryParams)}`);
    }
  }, [url]);

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
                    tripData={selectedTripId}
                  />
                  <TouchableOpacity onPress={() => setVisibleInfo(true)}>
                    <Icon source="information-outline" size={20} />
                  </TouchableOpacity>
                  <InformationModal 
                    visible={visibleInfo}
                    onDismiss={() => setVisibleInfo(false)}
                    tripData={selectedTripId}
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

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useId, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "react-native-paper";
import ButtonComponent from "../button/ButtonComponent";
import UserAvatar from "../avatar/UserAvatar";
import FormNewSchedule from "../modal/FormNewSchedule";
import { useAuth } from "@/configs/authConfig";
import { CreateTripContext } from "@/configs/tripConfig";
import { auth, db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function CustomDrawerContent(props) {
  const {userTrips, setUserTrips, setSelectedTripId } = props;
  // const [userTrips, setUserTrips] = useState([]);
  const route = useRouter();
  const {user, logout} = useAuth()
  // const userId = auth.currentUser;
  const { top, bottom } = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  const {tripDataContext, setTripDataContext} = useContext(CreateTripContext) || {}
  
  const handleSignOut = async () => {
    await logout()
  };
  
  // useEffect(() => {
  //   const fetchUserTrips = async () => {
  //     if (userId?.uid) {
  //       const userTripsRef = collection(db, "users", userId?.uid, "userTrip");
  //       const querySnapshot = await getDocs(userTripsRef);
  //       const trips = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       })) 
  //       setUserTrips(trips);
  //     }
  //   };

  //   fetchUserTrips();
  // }, [userId]);

  const hiddenRoutes = ["account/profile", "settings/config", "planner/[id]"];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 10, paddingTop: 40 }}>
          <View>
            <UserAvatar size={100} uri={user?.avatar}/>
            <Text
              style={{
                fontSize: 18,
                alignSelf: "center",
                marginTop: 10,
                fontFamily: "RC_Regular",
              }}
            >
              {user?.username}
            </Text>
          </View>
          <View>
            <ButtonComponent
              icon="plus"
              height={50}
              marginTop={20}
              mode="contained"
              label="Add Schedule"
              labelStyle={{ fontSize: 16 }}
              customstyle={{ borderRadius: 5 }}
              onPress={() => setVisible(true)}
            />
          </View>
        </View>
      <DrawerContentScrollView {...props} scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <View style={{marginTop:-25, marginBottom: 20, flexDirection:'column-reverse'}}>
        {Array.isArray(userTrips) && userTrips.length > 0 ? (
          userTrips.map((trip) => {
            return (
              <DrawerItem
                key={trip.id}
                label={`Trip to ${trip?.tripPlan?.trip?.destination || "Unknown"}`}
                labelStyle={styles.textDrawer}
                onPress={() => {
                  setSelectedTripId(trip.id); 
                  route.navigate(`planner/${trip.id}`);
                }}
              />
            );
          })
        ) : (
          <Text style={[styles.textDrawer,{marginStart: 20}]}>No trips available</Text> 
        )}
        </View>
        {props.state.routes.map((drawerRoute) => {
          if (!hiddenRoutes.includes(drawerRoute.name)) {
            return (
              <DrawerItem
                key={drawerRoute.key}
                label="Schedule"
                labelStyle={styles.textDrawer}
                icon={({ color, size }) => (
                  <Icon source="notebook" color={color} size={size} />
                )}
                onPress={() => props.navigation.navigate(drawerRoute.name)}
              />
            );
          }
          return null;
        })}
      </DrawerContentScrollView>

      <View
        style={{
          gap: 20,
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <TouchableOpacity
          onPress={() => route.navigate("/account/profile")}
          style={styles.row}
        >
          <Icon source="account" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => route.navigate("/settings/config")}
          style={styles.row}
        >
          <Icon source="cog" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.row}>
          <Icon source="logout" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Log out</Text>
        </TouchableOpacity>
      </View>
      <FormNewSchedule
        visible={visible}
        onDismiss={hideModal}
        handleSubmit={(title, location, traveler, price, startDate, endDate) => {
          setTripDataContext({
            destination: title,
            location: location, 
            traveller: traveler, 
            budget: price, 
            startDate: startDate, 
            endDate: endDate
          })
          hideModal();
          route.replace('/generate-loading')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textDrawer: {
    fontSize: 16,
    color: "#454551",
    fontFamily: "RC_Medium"
  },
  row: {
    flexDirection: "row",
    gap: 25,
  },
});

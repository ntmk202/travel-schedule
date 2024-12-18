import { Text, View} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, TextInputComponent, ToggleComponent } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";
import { useRouter } from "expo-router";

export default function SettingScreen() {
  const user = auth.currentUser
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState(false);
  const [code, setCode] = React.useState('');
  const route = useRouter()

  const acceptInvite = async () => {
    try {
      const parsedToken = JSON.parse(atob(code)); 
      const tripId = parsedToken.code; 
      const ownerId = tripId.split("_")[1]; 
  
      console.log("Trip ID:", tripId);
      console.log("Owner ID:", ownerId);
   
      const tripDocRef = doc(db, "users", ownerId, "userTrip", tripId);
      const tripDoc = await getDoc(tripDocRef);
      const channelDocRef = doc(db, "users", ownerId, "channels", tripId);
      const channelDoc = await getDoc(channelDocRef);
      if (channelDoc.exists() && tripDoc.exists()) {
        const tripData = channelDoc.data();
  
        // Kiểm tra nếu guestId đã có trong participants
        if (tripData.participants?.includes(user?.uid) || ownerId === user?.uid) {
          console.log("Access granted!");
  
          // Lưu thông tin trip vào `sharedTrips` cho guestId
          const sharedTripRef = doc(db, "users", user?.uid ?? '', "sharedTrips", tripId);
          await setDoc(sharedTripRef, { ownerId, tripId });
  
          alert("Success! Invitation accepted successfully!");
  
          // Tạo đường dẫn để fetchTrip
          navigateToTrip(tripId, ownerId);
        } else {
          alert("You don't have permission to access this trip.");
        }
      } else {
        alert("Error! Trip not found.");
      }
    } catch (error) {
      alert("Error! Invalid token format!");
      console.error("Error accepting invite:", error);
    }
  };

  const navigateToTrip = (tripId: string, ownerId: string) => {
    route.push({
      pathname: "/planner/[id]",
      params: { id: tripId, ownerId: ownerId },
    });
  };
  

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal:20, backgroundColor: '#fff' }}
    >
      <View>
        <ToggleComponent
          label="Notifications"
          description="Toggle this option to enable or disable all notifications related to your account activity and updates."
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
        <ToggleComponent
          label="Theme"
          description="Switch between light and dark themes to customize the appearance of the application according to your preference."
          value={theme}
          onValueChange={() => setTheme(!theme)}
        />
        <View style={{marginTop: 20, gap: 15}}>
          <Divider/>
          <TextInputComponent label='Invied code' type='outlined' text={code} onChangeText={(c:any) => setCode(c)} />
          <ButtonComponent mode='outlined' label='Accept invited code' height={50} customstyle={{borderRadius: 10}} labelStyle={{fontSize: 18}} onPress={acceptInvite}/>
          <Divider/>
        </View>
      </View>
    </SafeAreaView>
  );
}

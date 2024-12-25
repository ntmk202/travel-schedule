import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Icon, SegmentedButtons } from "react-native-paper";
import {
  ButtonComponent,
  ChatbotModal,
  DetailList,
  ExploreModal,
  FormNewSchedule,
  MapList
} from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";
import { CreateTripContext } from "@/configs/tripConfig";
import { useAuth } from "@/configs/authConfig";

const ScheduleScreen = () => {
  const { id } = useLocalSearchParams(); 
  const [value, setValue] = useState("list");
  const [visibleChatbot, setVisibleChatbot] = useState(false);
  const [visibleSchedule, setVisibleSchedule] = useState(false);
  const [visibleExplore, setVisibleExplore] = useState(false);
  const { tripDataContext, setTripDataContext } = useContext(CreateTripContext) || {}
  const [loading, setLoading] = useState(false);
  const [tripNote, setTripNote] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [planningData, setPlanningData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [ownerId, setOwnerId] = useState(null); 
  const {user} = useAuth() 
  const userRef = auth.currentUser;
  const route = useRouter()
  route.canGoBack(false)
  // Fetch user's trip data
  React.useEffect(() => {
    const fetchTripDetails = async () => {
      if (!userRef?.uid) return;

      setLoading(true);

      try {
        const sharedTripRef = query(collection(db, "users", userRef.uid, "sharedTrips"));
        const sharedTripSnap = await getDocs(sharedTripRef);

        let foundSharedTrip = false;
        sharedTripSnap.forEach((doc) => {
          const sharedTripData = doc.data();
          if (sharedTripData.tripId === id) {
            setIsAuthorized(true);
            setOwnerId(sharedTripData.ownerId); 
            foundSharedTrip = true;
          }
        });

        if (foundSharedTrip && ownerId) {
          const tripDocRef = doc(db, "users", ownerId, "userTrip", id);
          const tripDocSnap = await getDoc(tripDocRef);
          if (tripDocSnap.exists()) { 
            setTripNote(tripDocSnap.data());

            // Fetch recommendations data
            const recommendationsRef = collection(db, "users", ownerId, "userTrip", id, "recommendation");
            const recommendationsSnap = await getDocs(recommendationsRef);
            const recommendationsList = recommendationsSnap.docs.map((doc) => doc.data());
            setRecommendations(recommendationsList);

            // Fetch planning data
            const planningRef = collection(db, "users", ownerId, "userTrip", id, "planning");
            const planningSnap = await getDocs(planningRef);
            if(planningSnap.empty){
              setVisibleExplore(true);
            } else {
              setVisibleExplore(false);
              const planningList = planningSnap.docs.map((doc) => doc.data());
              setPlanningData(planningList);
            }
          }
        }

        if (!foundSharedTrip) {
          const tripRef = query(collection(db, "users", userRef.uid, "userTrip"));
          const querySnap = await getDocs(tripRef);
          const notes = [];
          querySnap.forEach((doc) => notes.push(doc.data()));
          setTripNote(notes);

          // Fetch recommendations data
          const recommendationsRef = collection(db, "users", userRef.uid, "userTrip", id, "recommendation");
          const recommendationsSnap = await getDocs(recommendationsRef);
          const recommendationsList = recommendationsSnap.docs.map((doc) => doc.data());
          setRecommendations(recommendationsList);

          // Fetch planning data
          const planningRef = collection(db, "users", userRef.uid, "userTrip", id, "planning");
          const planningSnap = await getDocs(planningRef);
          if(planningSnap.empty){
            setVisibleExplore(true);
          } else {
            setVisibleExplore(false);
            const planningList = planningSnap.docs.map((doc) => doc.data());
            setPlanningData(planningList);
          }
        }
        
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [userRef, isAuthorized, ownerId, id]);

  React.useLayoutEffect(() => {
    id ?? visibleExplore
  }, [5000])

  const tripPlan = tripNote.length > 0 ? tripNote.find(trip => trip?.tripId === id) : 'id not found' ;
  
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.wrapLoading}>
          <ActivityIndicator animating={true} color="#6750a4" size={30} />
          <Text style={styles.descriptionStyle}>Please wait a minute...</Text>
        </View>
      ) : tripNote.length !== 0 ? (
        <View style={styles.wrapper}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonComponent
                label="Explore"
                height={40}
                mode="contained-tonal"
                labelStyle={{ fontSize: 18 }}
                customstyle={{ borderRadius: 10 }}
                onPress={() => setVisibleExplore(true)}
              />
              <ExploreModal visible={visibleExplore} onDismiss={() => setVisibleExplore(false)} notes={tripPlan} tripData={recommendations}/>
              <View
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => setVisibleChatbot(true)}>
                  <Icon source="robot-outline" size={20} />
                </TouchableOpacity>
                <ChatbotModal
                  visible={visibleChatbot}
                  onDismiss={() => setVisibleChatbot(false)}
                />
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  density="small"
                  buttons={[
                    {
                      value: "list",
                      icon: "format-list-bulleted",
                      checkedColor: "#6750a4",
                      style: {
                        borderWidth: 0.5,
                        borderEndWidth: 0,
                        minWidth: 20,
                        maxWidth: 50,
                      },
                    },
                    {
                      value: "map",
                      icon: "map",
                      checkedColor: "#6750a4",
                      style: {
                        borderWidth: 0.5,
                        borderStartWidth: 0,
                        minWidth: 20,
                        maxWidth: 50,
                      },
                    },
                  ]}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Icon source="piggy-bank-outline" size={20} />
                  <Text style={styles.headerTitle}>{tripPlan?.tripData?.budget}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Icon source="account-multiple-outline" size={20} />
                  <Text style={styles.headerTitle}>{tripPlan?.tripData?.traveller}</Text>
                </View>
              </View>
              <Text style={styles.headerTitle}>{tripPlan?.tripData?.transport}</Text>
            </View>
          </View>
          {value === "list" ? (
            <ScrollView
              style={{ marginBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <DetailList data={planningData[0]?.plan} />

            </ScrollView>
          ) : (
            <MapList tripPlan={planningData[0]?.plan} /> 
          )}
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={{ alignItems: "center", gap: 10, marginTop: 30 }}>
            <Icon source="alert-decagram" size={50} color="#6750a4" />
            <Text style={styles.headerText}>No trips schedules yet</Text>
            <Text
              style={[styles.headerTitle, { maxWidth: 280, textAlign: "center" }]}
            >
              Looks like its time to plan a new travel experience! Get start below
            </Text>
            <ButtonComponent
              mode="contained"
              label="Start a new Schedule"
              height={46}
              labelStyle={{ fontSize: 18 }}
              customstyle={{ borderRadius: 10, width: 200 }}
              onPress={() => setVisibleSchedule(true)}
            />
          </View>
          <FormNewSchedule
            visible={visibleSchedule}
            onDismiss={() => setVisibleSchedule(false)}
            handleSubmit={(location, traveler, transport, price, startDate, endDate) => {
              setTripDataContext({
                myAddress: user.address,
                location: location,
                traveller: traveler,
                transport: transport,
                budget: price,
                startDate: startDate,
                endDate: endDate,
              });
              setVisibleSchedule(false)
              route.replace("/generate-loading");
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  wrapper: {
    width: Dimensions.get("screen").width * 0.9,
    height: "100%",
    alignSelf: "center",
  },
  line: {
    marginLeft: 40,
    borderLeftWidth: 2,
    borderLeftColor: "#c3c3c3",
    borderStyle: "dashed",
  },
  headerText: {
    fontFamily: "RC_Medium",
    fontSize: 20,
    color: "#000",
    lineHeight: 24,
  },
  headerTitle: {
    fontFamily: "RC_Regular",
    fontSize: 14,
  },
  accordionStyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#c3c3c3",
  },
  titleStyle: {
    fontFamily: "RC_Medium",
    fontSize: 18,
    lineHeight: 28,
  },
  descriptionStyle: {
    fontFamily: "RC_Regular",
  },
});

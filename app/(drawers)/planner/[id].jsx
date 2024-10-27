import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Icon, SegmentedButtons } from "react-native-paper";
import {
  ButtonComponent,
  ChatbotModal,
  DetailList,
  FormNewSchedule,
  MapList,
} from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";
import { CreateTripContext } from "@/configs/tripConfig";

const ScheduleScreen = () => {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState("list");
  const [visibleChatbot, setVisibleChatbot] = useState(false);
  const [visibleSchedule, setVisibleSchedule] = useState(false);
  const {tripDataContext, setTripDataContext} = useContext(CreateTripContext) || {}
  const [loading, setLoading] = useState(false);
  const [tripNote, setTripNote] = useState([]);
  const user = auth.currentUser;
  const route = useRouter()

  useEffect(() => {
    if (user && id) {
      getTripData();
    }
  }, [user, id]);

  const getTripData = async () => {
    setLoading(true);
    setTripNote([]);
    try {
      if (user?.uid && id) {
        const tripRef = query(
          collection(db, "users", user.uid, "userTrip"),
          where("tripId", "==", id)
        );
        const querySnap = await getDocs(tripRef);
        querySnap.forEach((doc) => {
          setTripNote((prev) => [...prev, doc.data()]);
        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
    setLoading(false);
  };

  const tripPlan = tripNote[0]?.tripPlan?.trip;

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
                label="Add place"
                icon="plus"
                height={40}
                mode="contained-tonal"
                labelStyle={{ fontSize: 18 }}
                customstyle={{ borderRadius: 10 }}
                onPress={() => console.log("press")}
              />
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
                  <Text style={styles.headerTitle}>{tripPlan?.budget}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Icon source="account-multiple-outline" size={20} />
                  <Text style={styles.headerTitle}>{tripPlan?.travelers}</Text>
                </View>
              </View>
              <Text style={styles.headerTitle}>{tripPlan?.duration}</Text>
            </View>
          </View>
          <ScrollView
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {value === "list" ? (
              <DetailList data={tripPlan?.itinerary} />
            ) : (
              <MapList />
            )}
          </ScrollView>
        </View>
      ) : (
      <View style={styles.wrapper}>
        <View style={{ alignItems: "center", gap: 10, marginTop: 30 }}>
          <Icon source="close-octagon" size={50} color="#6750a4" />
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
          handleSubmit={(title, traveler, price, startDate, endDate) => {
            setTripDataContext({
              location: title,
              traveller: traveler,
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

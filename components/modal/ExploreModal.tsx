import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ActivityIndicator, Icon, Surface, TextInput } from "react-native-paper";
import { chatSession } from "@/configs/GeminiConfig";
import { auth, db } from "@/configs/FirebaseConfig";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";

const ExploreModal = ({ visible, onDismiss, notes, tripData }: any) => {
  const [search, setSearch] = React.useState<string>("");
  const [selectedLocations, setSelectedLocations] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const user = auth.currentUser;

  const toggleLocationSelection = (location: any) => {
    const locationId = location.placeId || location.name;

    if (!locationId) {
      console.log("Location ID is missing:", location);
      return;
    }

    setSelectedLocations((prevSelectedLocations) => {
      const isSelected = prevSelectedLocations.some(
        (selected) => selected.id === locationId
      );

      if (isSelected) {
        return prevSelectedLocations.filter(
          (selected) => !(selected.id === locationId)
        );
      } else {
        return [...prevSelectedLocations, { ...location, id: locationId }];
      }
    });
  };

  const generate_planning = async () => {
    try {
      setLoading(true);
      const PROMPT_PLAN = `Given the following data:
      1. Locations with their activities, costs, and transportation costs: ${JSON.stringify(
        selectedLocations,
        null,
        2
      )}
      2. Weather data for the travel period: ${JSON.stringify(
        notes?.weatherData,
        null,
        2
      )}
      3. Travel schedule with start and end dates, budget, number of travelers, and transportation mode: ${JSON.stringify(
        notes?.tripData,
        null,
        2
      )}

      Recommend an optimal itinerary considering the following factors:
      - Ensure the total cost of locations, activities, and transportation costs does not exceed the budget.
      - Select locations and activities based on the weather conditions and the travelers' preferences.
      - Ensure transportation costs are calculated based on the number of people and the chosen mode of transport (e.g., car, bus).
      - Recommend the best combination of locations to fit the start and end dates, budget, weather, and the number of travelers.
      Return the result in the following JSON format:
        [
        {
        "day": "Day 1",
        "date": "YYYY-MM-DD",
        "activities": [
        {
        ...<locationsData.data>
        "transportationCost": <transport_cost>,
        "note": "<notes>",
        "timeVisited": "<time_period>",
        "distance_km": <distance_to_location>
        }
        ]
        },
        {
        "day": "Day 2",
        "date": "YYYY-MM-DD",
        "activities": [
        {
        ...<locationsData.data>
        "transportationCost": <transport_cost>,
        "note": "<notes>",
        "timeVisited": "<time_period>",
        "distance_km": <distance_to_location>
        }
        ]
        }
        ]`;

      const result = await chatSession.sendMessage(PROMPT_PLAN);
      const AI_PLAN = JSON.parse(result.response.text());
      console.log("AI_RCM", AI_PLAN);
      if (user?.uid) {
        const planRef = collection(
          db,
          "users",
          user.uid,
          "userTrip",
          notes?.tripId,
          "planning"
        );
        const querySnapshot = await getDocs(planRef);
        if (querySnapshot.empty) {
          // Add a new document
          await addDoc(planRef, { plan: AI_PLAN });
          alert("AI Planning generated and stored successfully!");
        } else {
          // Update the existing document
          const docId = querySnapshot.docs[0].id; 
          const existingDocRef = doc(planRef, docId);
          await updateDoc(existingDocRef, { plan: AI_PLAN });
          alert("AI Planning updated successfully!");
        }
        onDismiss();
      } else {
        console.warn("User ID not found; cannot store trip data under a user.");
      }
    } catch (error) {
      console.error("Error generating AI trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTripItem = ({ item }: any) => (
    <View style={styles.tripItemContainer}>
      {/* Activities Section */}
      <Text style={styles.sectionTitle}>Activities</Text>
      <FlatList
        horizontal
        data={item.activities}
        renderItem={({ item: activity }: any) => {
          // console.log(activity)
          const isSelected = selectedLocations.some(
            (selected) =>
              selected.id === activity.placeId || selected.id === activity.title
          );
          return (
            <TouchableOpacity
              key={activity.placeId}
              onPress={() => toggleLocationSelection(activity)}
              style={[
                styles.cardContainer,
                isSelected && styles.selectedCardContainer,
              ]}
            >
              <Image
                source={{ uri: activity.imageUrl }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{activity.title}</Text>
                <Text style={styles.cardPrice}>{activity.price}</Text>
                <Text style={styles.cardAddress}>{activity.address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(activity: any, idx: number) => idx.toString()}
      />

      {/* Hotels Section */}
      <Text style={styles.sectionTitle}>Hotels</Text>
      <FlatList
        horizontal
        data={item.hotels}
        renderItem={({ item: hotel }: any) => {
          const isSelected = selectedLocations.some(
            (selected) =>
              selected.id === hotel.placeId || selected.id === hotel.title
          );
          return (
            <TouchableOpacity
              onPress={() => toggleLocationSelection(hotel)}
              style={[
                styles.cardContainer,
                isSelected && styles.selectedCardContainer, // Apply selected styles
              ]}
            >
              <Image
                source={{ uri: hotel.imageUrl }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{hotel.title}</Text>
                <Text style={styles.cardPrice}>{hotel.price}</Text>
                <Text style={styles.cardAddress}>{hotel.address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(hotel: any, idx: number) => idx.toString()}
      />

      {/* Restaurants Section */}
      <Text style={styles.sectionTitle}>Restaurants & Cafes</Text>
      <FlatList
        horizontal
        data={item.restaurants}
        renderItem={({ item: restaurant }: any) => {
          const isSelected = selectedLocations.some(
            (selected) =>
              selected.id === restaurant.placeId ||
              selected.id === restaurant.title
          );
          return (
            <TouchableOpacity
              onPress={() => toggleLocationSelection(restaurant)}
              style={[
                styles.cardContainer,
                isSelected && styles.selectedCardContainer, // Apply selected styles
              ]}
            >
              <Image
                source={{ uri: restaurant.imageUrl }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{restaurant.title}</Text>
                <Text style={styles.cardPrice}>{restaurant.price}</Text>
                <Text style={styles.cardAddress}>{restaurant.address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(restaurant: any, idx: number) => idx.toString()}
      />

      {/* Transport Section */}
      <Text style={styles.sectionTitle}>Transport</Text>
      <FlatList
        horizontal
        data={item.transport}
        renderItem={({ item: trans }: any) => {
          const isSelected = selectedLocations.some(
            (selected) =>
              selected.id === trans.placeId || selected.id === trans.name
          );
          return (
            <TouchableOpacity
              onPress={() => toggleLocationSelection(trans)}
              style={[
                styles.transportCardContainer,
                isSelected && styles.selectedCardContainer, // Apply selected styles
              ]}
            >
              <Text style={styles.cardTitle}>{trans.name}</Text>
              <Text style={styles.cardPrice}>{trans.price_per_day}</Text>
              <Text style={styles.cardAddress}>{trans.type}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(trans: any, idx: number) => idx.toString()}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <Text style={styles.title}>Recommended Locations</Text>
            <TouchableOpacity
              onPress={generate_planning}
              style={{ borderWidth: 0.2, borderColor: "purple", padding: 5 }}
            >
              <Text style={{ fontFamily: "RC_Regular" }}>plan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source="close-circle-outline" size={24} />
            </TouchableOpacity>
          </View>
          {loading && 
            (
              <View style={styles.wrapLoading}>
                <ActivityIndicator animating={true} color="#6750a4" size={30} />
                <Text style={styles.descriptionStyle}>Please wait a minute...</Text>
              </View>
            )
          }
          <View>
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}> */}
            <TextInput
              style={{ margin: 20 }}
              mode="outlined"
              label="Search Location"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            {/* </KeyboardAvoidingView> */}
            <FlatList
              data={tripData}
              renderItem={renderTripItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={<Text>No trips available.</Text>}
            />
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

export default ExploreModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  surface: {
    height: Dimensions.get("screen").height * 0.9,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  bar: {
    borderBottomWidth: 1,
    borderBottomColor: "#adadad",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  wrapLoading: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
  accordionStyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8def8",
  },
  descriptionStyle: {
    fontFamily: "RC_Regular",
  },
  title: {
    fontSize: 20,
    fontFamily: "RC_Medium",
  },
  flatListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  tripItemContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "RC_Bold",
    marginBottom: 10,
    fontSize: 18,
  },
  cardContainer: {
    width: 140,
    margin: 5,
    gap: 5,
    borderWidth: 0.3,
    borderColor: "#6750a4",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedCardContainer: {
    backgroundColor: "#e8def8",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    padding: 3,
  },
  cardTitle: {
    fontFamily: "RC_Medium",
  },
  cardPrice: {
    color: "green",
    fontFamily: "RC_Regular",
  },
  cardAddress: {
    maxHeight: 20,
    fontFamily: "RC_Regular",
  },
  transportCardContainer: {
    width: 120,
    padding: 3,
    margin: 5,
    borderWidth: 0.3,
    borderColor: "lightpurple",
    borderRadius: 5,
    gap: 5,
  },
});

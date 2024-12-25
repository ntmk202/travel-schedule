import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from "@/configs/tripConfig";
import { AI_PROMPT } from '@/constants/options/Options';
import { chatRCM, chatSession } from '@/configs/GeminiConfig';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/FirebaseConfig';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { getWeatherData } from '@/configs/weatherConfig';
import locations from '@/constants/options/dataset_crawler-google-places_2.json';
import transport from '@/constants/options/dataset-transportations.json';

const GenerateLoading = () => {
  const { tripDataContext } = useContext(CreateTripContext) || {};
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser
  const route = useRouter();
  const {id} = useLocalSearchParams()
  const travellerCounts = {
    'Just me': 1,
    'Couple': 2,
    'Family': 6,
    'Friends': 10,
  };
  const calculateBudgetAllocation = (totalBudget) => {
    const allocation = {
      accommodation: totalBudget * 0.3, 
      food: totalBudget * 0.25, 
      transportation: totalBudget * 0.15, 
      activities: totalBudget * 0.2, 
      contingency: totalBudget * 0.1, 
    };
  
    return allocation;
  };
  const parsePrice = (priceString) => {
    if (!priceString || typeof priceString !== "string") {
      return 0;
    }
    if (priceString.toLowerCase().includes("free")) {
      return 0;
    }
    const sanitized = priceString.replace(/[^\d\-]/g, ""); 
    const [min, max] = sanitized.split("-").map((value) => {
      return parseInt(value, 10) * 1000; 
    });
    return (min + (max || min)) / 2; 
  };
  
  // const numberOfTravellers = travellerCounts[tripDataContext?.traveller] || 1;
  const calculateTripDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Chuyển đổi từ mili giây sang ngày
  };
  
  const tripDays = calculateTripDays(tripDataContext?.startDate, tripDataContext?.endDate);
  
  const numberOfTravellers = travellerCounts[tripDataContext?.traveller] || 1;
  const dailyBudget = (tripDataContext?.budget * numberOfTravellers) / tripDays;
  const budgetAllocation = calculateBudgetAllocation(dailyBudget); 
  
  const categoryCounts = {
    accommodation: 0,
    food: 0,
    activities: 0,
  };
  const categoryLocations = {
    accommodation: [],
    food: [],
    activities: [],
  };
  
  const suitableLocations = locations.filter((loc) => {
    if (!loc.price) return false; // Bỏ qua nếu không có giá
    const price = parsePrice(loc.price); // Chuyển đổi giá thành số
  
    // Phân loại theo danh mục
    const accommodationCategories = ['hotel', 'hotel resort', 'hotel villa'];
    const foodCategories = ['restaurant', 'bar', 'food', 'cafe'];
    const activityCategories = [
      'amusement', 'beach', 'Camping', 'museum', 'market', 
      'Tourist attraction', 'spa', 'store', 'theater', 'Village hall'
    ];
  
    // Kiểm tra danh mục và tăng bộ đếm
    if (accommodationCategories.includes(loc.categoryName)) {
      if (price <= budgetAllocation.accommodation) {
        categoryCounts.accommodation++;
        categoryLocations.accommodation.push(loc);
        return true;
      }
    } else if (foodCategories.includes(loc.categoryName)) {
      if (price <= budgetAllocation.food) {
        categoryCounts.food++;
        categoryLocations.food.push(loc);
        return true;
      }
    } else if (activityCategories.includes(loc.categoryName)) {
      if (price <= budgetAllocation.activities) {
        categoryCounts.activities++;
        categoryLocations.activities.push(loc);
        return true;
      }
    }
  
    return false; // Loại bỏ nếu không thuộc danh mục nào
  });
  
  
  // Lọc phương tiện phù hợp với ngân sách hàng ngày
  const suitableTransport = transport.filter(
    (trans) =>
      trans.type === tripDataContext?.transport &&
      trans.price_per_day <= budgetAllocation.transportation 
  );

  const randomFiveTransport = suitableTransport
  .sort(() => Math.random() - 0.5) 
  .slice(0, 5); 
  const randomFood = categoryLocations.food
  .sort(() => Math.random() - 0.5) 
  .slice(0, 30); 
  console.log(categoryCounts)
  const randomActivities = categoryLocations.activities
  .sort(() => Math.random() - 0.5) 
  .slice(0, 60); 
  console.log(categoryCounts)

  useEffect(() => {
    if (tripDataContext && !loading) {
      GenerateAiTrip();
    }
  }, [tripDataContext, user]);

  useEffect(() => {
      if (tripDataContext) {
        try {  
          const fetchWeather = async () => {
            const data = await getWeatherData(tripDataContext?.location, tripDataContext?.startDate, tripDataContext?.endDate);
            console.log("Fetched Weather Data:", data);
            setWeatherData(data);
          };

          fetchWeather();
        } catch (error) {
          console.error("Error parsing dates or fetching weather:", error.message);
        }
      } else {
        console.warn("No dateRange provided!");
      }
    }, [tripDataContext]);

  const GenerateAiTrip = async () => {
    try {
      setLoading(true); 
      const PROMPT_RCM = `Recommend locations in ${JSON.stringify(categoryLocations.activities, null, 2)} for 40 activities that match the weather forecast ${JSON.stringify(weatherData, null, 2)} in json format with placeId fields`
      // const PROMPT_RCM = `Given the current weather data: ${JSON.stringify(weatherData, null, 2)}
      // and the list of locations: ${JSON.stringify(categoryLocations.activities, null, 2)}
      // Recommend locations suitable for the weather, considering temperature, season, and activities. Return the result as a JSON array of recommended locations.`
      const result = await chatRCM.sendMessage(PROMPT_RCM);
      const AI_RCM = JSON.parse(result.response.text());
      const filteredActivities = categoryLocations.activities.filter((activity) =>
        AI_RCM.recommendations.some((loc) => loc.placeId === activity.placeId)
      );

      const tripRCMId = `${Date.now()}_${user?.uid}`;
      const tripRCMData = {
        tripId: tripRCMId,
        tripData: tripDataContext,
        weatherData: weatherData,
      };
      const tripRCM = {
        hotels: categoryLocations.accommodation,
        activities: filteredActivities,
        restaurants: randomFood,
        transport: randomFiveTransport
      }

      if (user?.uid && weatherData) {
        const tripRef = doc(db, 'users', user.uid, 'userTrip', tripRCMId);
        await setDoc(tripRef, tripRCMData);
        const rcmRef = collection(db, 'users', user.uid, 'userTrip', tripRCMId, 'recommendation');
        await addDoc(rcmRef, tripRCM);
      } else {
        console.warn("User ID not found; cannot store trip data under a user.");
      }
      route.push(`planner/${tripRCMId}`);
    } catch (error) {
      console.error("Error generating AI trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading?
      <>
        <ActivityIndicator animating={true} size={50} color="#6750a4" style={{marginBottom:30}} />
        <Text style={styles.title}>Generating trip plan...</Text>
        <Text style={styles.text}>Please dont go back or leave</Text>
      </>
      :
      <>
        <Icon source='restore-alert' color='#6750a4' size={50} />
        <Text style={styles.title}> Something wrong !!! </Text>
        <Text onPress={() => route.replace(`/planner/${id}`)} style={[styles.text, {color:'blue'}]}>Go back</Text>
      </>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontFamily: 'RC_Medium'
  },
  text: {
    fontSize: 14,
    color: "#adadad",
    fontFamily: 'RC_Regular'
  },
});

export default GenerateLoading;

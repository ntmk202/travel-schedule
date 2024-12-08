import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from "@/configs/tripConfig";
import { AI_PROMPT } from '@/constants/options/Options';
import { chatSession } from '@/configs/GeminiConfig';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/FirebaseConfig';
import { ActivityIndicator, Icon } from 'react-native-paper';

const GenerateLoading = () => {
  const { tripDataContext } = useContext(CreateTripContext) || {};
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser
  const route = useRouter();
  const {id} = useLocalSearchParams()

  useEffect(() => {
    if (tripDataContext && !loading) {
      GenerateAiTrip();
    }
  }, [tripDataContext, user]);

  const GenerateAiTrip = async () => {
    try {
      setLoading(true);
      const PROMPT_RCM = AI_PROMPT
        .replace('{location}', tripDataContext.location)
        .replace('{startDate}', tripDataContext.startDate)
        .replace('{endDate}', tripDataContext.endDate)
        .replace('{traveller}', tripDataContext.traveller)
        .replace('{budget}', tripDataContext.budget)
        .replace('{location}', tripDataContext.location)

      const result = await chatSession.sendMessage(PROMPT_RCM);
      const tripPlanRCM = JSON.parse(result.response.text());

      const tripRCMId = `${Date.now()}_${user?.uid}`;
      const tripRCMData = {
        tripId: tripRCMId,
        tripPlan: tripPlanRCM
      };
      const chatData = {
        chatId: `group_${tripRCMId}`,
        tripId: tripRCMId,
        owner: user.uid,
        tripRole: 'edit',
        members: [
          {
            userId: user.uid,
            email: user.email,
            username: user.displayName || 'Owner',
            joinAt: new Date().toISOString(),
          },
        ],
      };

      if (user?.uid) {
        const tripRef = doc(db, 'users', user.uid, 'userTrip', tripRCMId);
        await setDoc(tripRef, tripRCMData);
        const chatRef = doc(db, 'groups', `group_${tripRCMId}`);
        await setDoc(chatRef, chatData);
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

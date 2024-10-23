import React from 'react';
import { Text, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { auth } from '@/configs/FirebaseConfig';

export default function Index() {
  const route = useRouter()
  const user = auth.currentUser;
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user?
      <Redirect href={'/signin'} /> :
      <Text onPress={() => route.navigate('/(registrations)/signin')} >Sign in to page</Text>
      }
    </View>
  );
}


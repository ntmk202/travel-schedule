import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const route = useRouter()
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text onPress={() => route.navigate('/(registrations)/signin')} >Sign in to page</Text>
    </View>
  );
}


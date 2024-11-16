import React from 'react';
import { Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require('@/assets/images/world-discovery.gif')} style={{height: 150, resizeMode:'contain'}}/>
      <Text style={{fontFamily: 'RC_Medium', fontSize: 16, marginTop: 10, color:'#6750a4'}}>Have a perfect plan for an unforgettable trip!</Text>
    </View>
  );
}


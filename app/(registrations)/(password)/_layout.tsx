import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="verify-email"  />
      <Stack.Screen name="update-password"  />
    </Stack>
  );
};

export default _layout;
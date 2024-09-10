import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { CustomDrawerContent } from "@/components";

const _layout = () => {
  const headerTitleStyle = {fontFamily: 'RC_SemiBold', fontSize: 24, letterSpacing: .24 }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerType: "slide",
          headerTitleAlign: "center",
          drawerActiveBackgroundColor: "#d8cef3",
          drawerActiveTintColor: "#3c3c3c",
          drawerLabelStyle:{ fontFamily: 'RC_Medium'}
        }}
      >
        <Drawer.Screen
          name="planner/schedule"
          options={{
            headerTitle: "Schedule",
            drawerLabel: "Schedule",
            headerTitleStyle: headerTitleStyle,
            drawerIcon: ({ size, color }) => (
              <Icon source="notebook" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="account/profile"
          options={{
            headerTitle: "Profile",
            drawerLabel: "Profile",
            headerTitleStyle: headerTitleStyle,
            drawerIcon: ({ size, color }) => (
              <Icon source="account" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings/config"
          options={{
            headerTitle: "Setting",
            drawerLabel: "Setting",
            headerTitleStyle: headerTitleStyle,
            drawerIcon: ({ size, color }) => (
              <Icon source="cog" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;

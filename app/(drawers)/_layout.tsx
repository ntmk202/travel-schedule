import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { CustomDrawerContent } from "@/components";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerType: "slide",
          headerTitleAlign: "center",
          drawerActiveBackgroundColor: "#d8cef3",
          drawerActiveTintColor: "#3c3c3c",
        }}
      >
        <Drawer.Screen
          name="planner/schedule"
          options={{
            headerTitle: "Schedule",
            drawerLabel: "Schedule",
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

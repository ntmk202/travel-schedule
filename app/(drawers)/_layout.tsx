import React, { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import {
  ChatModal,
  CustomDrawerContent,
  InformationModal,
  ShareModal,
} from "@/components";
import { TouchableOpacity, View } from "react-native";

const _layout: React.FC = () => {
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  

  const headerTitleStyle = {
    fontFamily: "RC_SemiBold",
    fontSize: 24,
    letterSpacing: 0.24,
    maxWidth: 180,
  };

  const handleShareSubmit = (data: any) => {
    console.log("Shared URL:", data.url);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "slide",
          drawerLabelStyle: { fontFamily: "RC_Medium" }
        }}
      >
          <Drawer.Screen 
            name="planner/[id]" 
            options={{
            headerTitle: "Schedule",
            headerTitleStyle: headerTitleStyle,
              headerRight: () => (
                <View style={{ flexDirection: "row", gap: 15, marginEnd: 20 }}>
                  <TouchableOpacity onPress={() => setVisibleShare(true)}>
                    <Icon source="share-variant-outline" size={20} />
                  </TouchableOpacity>
                  <ShareModal
                    visible={visibleShare}
                    onDismiss={() => setVisibleShare(false)}
                    onSubmit={handleShareSubmit}
                  />
                  <TouchableOpacity onPress={() => setVisibleChat(true)}>
                    <Icon source="chat-processing-outline" size={20} />
                  </TouchableOpacity>
                  <ChatModal
                    visible={visibleChat}
                    onDismiss={() => setVisibleChat(false)}
                  />
                  <TouchableOpacity onPress={() => setVisibleInfo(true)}>
                    <Icon source="information-outline" size={20} />
                  </TouchableOpacity>
                  <InformationModal 
                    visible={visibleInfo}
                    onDismiss={() => setVisibleInfo(false)}
                  />
                </View>
              ),
              drawerIcon: ({ size, color }) => (
                <Icon source="notebook" size={size} color={color} />
              ),
            }} 
          />
        <Drawer.Screen
          name="account/profile"
          options={{
            headerTitle: "Profile",
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

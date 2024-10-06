import React, { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { ChatModal, CustomDrawerContent, ShareModal } from "@/components";
import { TouchableOpacity, View } from "react-native";

const _layout = () => {
  const headerTitleStyle = {fontFamily: 'RC_SemiBold', fontSize: 24, letterSpacing: .24, maxWidth: 180 }
  const [visibleShare, setVisibleShare] = useState(false)
  const [visibleChat, setVisibleChat] = useState(false)
  const handleShareSubmit = (data:any) => {
    console.log('Shared URL:', data.url);
    console.log('Role:', data.role);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerType: "slide",
          drawerActiveBackgroundColor: "#d8cef3",
          drawerActiveTintColor: "#3c3c3c",
          drawerLabelStyle:{ fontFamily: 'RC_Medium'}
        }}
      >
        <Drawer.Screen
          name="planner/schedule"
          options={{
            headerTitle: "Schedule",
            headerTitleStyle: headerTitleStyle,
            headerRight: () => (
              <View style={{flexDirection: 'row', gap: 15, marginEnd: 20}}>
                <TouchableOpacity onPress={() => setVisibleShare(true)}>
                  <Icon source='share-variant-outline' size={20} />
                </TouchableOpacity>
                <ShareModal visible={visibleShare} onDismiss={() => setVisibleShare(false)} onSubmit={handleShareSubmit} />
                <TouchableOpacity onPress={() => setVisibleChat(true)}>
                  <Icon source='chat-processing-outline' size={20} />
                </TouchableOpacity>
                <ChatModal visible={visibleChat} onDismiss={() => setVisibleChat(false)} />
                <TouchableOpacity>
                  <Icon source='information-outline' size={20} />
                </TouchableOpacity>
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

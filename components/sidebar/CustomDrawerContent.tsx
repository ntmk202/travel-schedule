import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "react-native-paper";
import ButtonComponent from "../button/ButtonComponent";
import UserAvatar from "../avatar/UserAvatar";

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  const route = useRouter();
  const filteredState = {
    ...props.state,
    routes: props.state.routes.filter(
      (route: any) =>
        route.name !== "/account/profile" &&
        route.name !== "/account/editPassword" &&
        route.name !== "/settings/config" 
    )
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ padding: 10, paddingTop: 20 }}>
          <View>
            <UserAvatar/>
            <Text
              style={{
                fontSize: 18,
                alignSelf: "center",
                marginTop: 10,
                fontFamily: "RC_Regular",
              }}
            >
              username
            </Text>
          </View>
          <View>
            <ButtonComponent
              icon="plus"
              height={50}
              marginTop={20}
              mode="contained"
              label="Add Schedule"
              labelStyle = {{fontSize: 16}}
              customstyle = {{borderRadius: 5}}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
        <DrawerItemList {...props} state={filteredState} />
      </DrawerContentScrollView>
      <View
        style={{
          gap: 20,
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Icon source="account" size={20} />
          <Text onPress={() => route.navigate("/account/profile")}>
            Account
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Icon source="cog" size={20} />
          <Text onPress={() => route.navigate("/settings/config")}>
            Setting
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Icon source="logout" size={20} />
          <Text onPress={() => route.replace("/")}>Log out</Text>
        </View>
      </View>
    </View>
  );
}

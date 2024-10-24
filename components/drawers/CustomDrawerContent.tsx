import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "react-native-paper";
import ButtonComponent from "../button/ButtonComponent";
import UserAvatar from "../avatar/UserAvatar";
import FormNewSchedule from "../modal/FormNewSchedule";
import { useAuth } from "@/configs/authConfig";

export default function CustomDrawerContent(props: any) {
  const route = useRouter();
  const {user, logout} = useAuth()
  const { top, bottom } = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  
  const handleSignOut = async () => {
    await logout()
  };

  const hiddenRoutes = ["account/profile", "settings/config"];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ padding: 10, paddingTop: 20 }}>
          <View>
            <UserAvatar size={100} uri={user?.avatar}/>
            <Text
              style={{
                fontSize: 18,
                alignSelf: "center",
                marginTop: 10,
                fontFamily: "RC_Regular",
              }}
            >
              {user?.username}
            </Text>
          </View>
          <View>
            <ButtonComponent
              icon="plus"
              height={50}
              marginTop={20}
              mode="contained"
              label="Add Schedule"
              labelStyle={{ fontSize: 16 }}
              customstyle={{ borderRadius: 5 }}
              onPress={() => setVisible(true)}
            />
          </View>
        </View>
        {props.state.routes.map((drawerRoute: any, index: number) => {
          if (!hiddenRoutes.includes(drawerRoute.name)) {
            return (
              <DrawerItem
                key={drawerRoute.key}
                label="Schedule"
                labelStyle={styles.textDrawer}
                icon={({ color, size }) => (
                  <Icon source="notebook" color={color} size={size} />
                )}
                onPress={() => props.navigation.navigate(drawerRoute.name)}
              />
            );
          }
          return null;
        })}
      </DrawerContentScrollView>

      <View
        style={{
          gap: 30,
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <TouchableOpacity
          onPress={() => route.navigate("/account/profile")}
          style={styles.row}
        >
          <Icon source="account" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => route.navigate("/settings/config")}
          style={styles.row}
        >
          <Icon source="cog" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.row}>
          <Icon source="logout" size={24} color="#454551" />
          <Text style={styles.textDrawer}>Log out</Text>
        </TouchableOpacity>
      </View>
      <FormNewSchedule
        visible={visible}
        onDismiss={hideModal}
        handleSubmit={(values: any) => {
          console.log(values);
          hideModal();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textDrawer: {
    fontSize: 16,
    color: "#454551",
    fontFamily: "RC_Medium",
  },
  row: {
    flexDirection: "row",
    gap: 40,
  },
});

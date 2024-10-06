import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, FormNewPasswordModal, TextInputComponent, UserAvatar } from "@/components";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <SafeAreaView style={style.container}>
      <View>
        <View style={{ width: width * 0.8 }}>
          <View>
            <UserAvatar />
          </View>
          <TextInputComponent
            label="Username"
            text={username}
            type="username"
            onChangeText={(value: string) => setUsername(value)}
          />
          <TextInputComponent
            label="Email Address"
            text={email}
            type="emailAddress"
            onChangeText={(value: string) => setEmail(value)}
          />
          <Text style={style.typoText} onPress={showModal}>
            Change Password
          </Text>
          <TextInputComponent
            label="Password"
            text={password}
            type="password"
            disable
          />
        </View>
        <ButtonComponent
          label="Save"
          mode="contained"
          onPress={() => console.log("press")}
          marginTop={20}
        />
      </View>
      <FormNewPasswordModal visible={visible} onDismiss={hideModal}  />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: "center", 
    alignItems: "center" 
  },
  typoText: {
    fontFamily: "RC_Regular",
    // height: 0,
    top: 35,
    marginEnd: 10,
    fontSize: 20,
    color: "#6750a4",
    alignSelf: "flex-end",
    zIndex: 999,
  },
});

import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonComponent, TextInputComponent } from '@/components';

const { width } = Dimensions.get("window");

const UpdatePasswordScreen = () => {
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    return (
      <SafeAreaView style={styles.flexVertical}>
        <Text style={styles.typoHeading}>Create New Password</Text>
        <Text style={styles.typoTitle}>Create password that powerful protection</Text>
        <View style={styles.form}>
          <TextInputComponent
            label="New password"
            text={password}
            type="password"
            onChangeText={(password: string) => setPassword(password)}
          />
          <TextInputComponent
            label="Rewrite new password"
            text={rePassword}
            type="emailAddress"
            onChangeText={(rePassword: string) => setRePassword(rePassword)}
          />
          <ButtonComponent
            label="Create"
            mode="contained"
            onPress={() => console.log("Pressed")}
            marginTop={20}
          />
        </View>
        <View style={styles.flexHorizontal}>
          <Text style={styles.typoTitle}>Don't have an account? </Text>
          <Text
            style={[styles.typoTitle, { color: "#6750a4" }]}
            onPress={() => console.log("Pressed")}
          >
            Sign Up
          </Text>
        </View>
      </SafeAreaView>
    );
  };

export default UpdatePasswordScreen

const styles = StyleSheet.create({
    flexVertical: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    flexHorizontal: {
      flexDirection: "row",
      marginTop: 20,
    },
    typoHeading: {
      fontSize: 32,
      color: "#000",
      fontFamily: "RC_SemiBold",
      marginBottom: 20,
    },
    typoTitle: {
      fontSize: 20,
      color: "#5a5a5a",
      fontFamily: "RC_Regular",
      marginTop: 20,
    },
    form: {
      width: width * 0.4,
    },
  });
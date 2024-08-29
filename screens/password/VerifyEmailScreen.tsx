import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonComponent, TextInputComponent } from '@/components';

const { width } = Dimensions.get("window");

const VerifyEmailScreen = () => {
    const [email, setEmail] = React.useState("");
    return (
      <SafeAreaView style={styles.flexVertical}>
        <Text style={styles.typoHeading}>Sign In to Planner</Text>
        <Text style={styles.typoTitle}>Verify your email to update password</Text>
        <View style={styles.form}>
          <TextInputComponent
            label="Email Address"
            text={email}
            type="emailAddress"
            onChangeText={(email: string) => setEmail(email)}
          />
          <ButtonComponent
            label="Verify Email"
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

export default VerifyEmailScreen

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
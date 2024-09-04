import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, TextInputComponent } from "@/components";
import { Formik } from "formik";
import { VerifyEmailFormValues, VerifyEmailSchema } from "@/constants";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const initialValues: VerifyEmailFormValues = {
  email: "",
};

const VerifyEmailScreen = () => {
  const route = useRouter();
  // const [email, setEmail] = React.useState("");
  return (
    <SafeAreaView style={styles.flexVertical}>
      <Text style={styles.typoHeading}>Sign In to Planner</Text>
      <Text style={styles.typoTitle}>Verify your email to update password</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={VerifyEmailSchema}
        onSubmit={(values) => {
          console.log(values);
          route.push('/update-password')
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInputComponent
              label="Email Address"
              text={values.email}
              type="emailAddress"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <ButtonComponent
              label="Verify Email"
              mode="contained"
              onPress={handleSubmit}
              marginTop={20}
            />
          </View>
        )}
      </Formik>
      <View style={styles.flexHorizontal}>
        <Text style={styles.typoTitle}>Don't have an account? </Text>
        <Text
          style={[styles.typoTitle, { color: "#6750a4" }]}
          onPress={() => route.navigate("/signup")}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmailScreen;

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
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
});

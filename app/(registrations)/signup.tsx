import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, TextInputComponent } from "@/components";
import { SignUpFormValues, SignUpSchema } from "@/constants";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useAuth } from "@/configs/authConfig";

const { width } = Dimensions.get("window");
const initialValues: SignUpFormValues = {
  email: "",
  password: "",
  username: "",
  avatar: null
};

const SignupScreen = () => {
  const route = useRouter()
  const { signup } = useAuth()

  return (
    <SafeAreaView style={styles.flexVertical}>
      <Text style={styles.typoHeading}>Sign Up for Planner</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            await signup(values.email, values.password, values.username, values.avatar);
            // route.push("/signin");
          } catch (error: any) {
            if (error.message.includes("email-already-in-use")) {
              setErrors({ email: "Email already in use" });
            } else {
              console.error(error.message);
            }
          }
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
              label="Username"
              text={values.username}
              type="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
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
            <TextInputComponent
              label="Password"
              text={values.password}
              type="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <ButtonComponent
              label="Sign Up"
              mode="contained"
              onPress={handleSubmit}
              marginTop={20}
            />
          </View>
        )}
        </Formik>
      <View style={styles.flexHorizontal}>
        <Text style={styles.typoTitle}>Already have an account? </Text>
        <Text
          style={[styles.typoTitle, { color: "#6750a4" }]}
          onPress={() => route.navigate('/signin')}
        >
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
  typoText: { 
    fontFamily: "RC_Regular", 
    fontSize: 20, 
    marginVertical: 10,
    marginEnd: 20,
    color: '#6750a4',
    alignSelf: 'flex-end'
  },
  form: {
    width: width * 0.8,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    paddingTop: 5,
    paddingStart: 5
  },
});

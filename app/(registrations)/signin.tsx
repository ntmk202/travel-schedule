import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, TextInputComponent } from "@/components";
import { Formik } from "formik";
import { SignInFormValues, SignInSchema } from "@/constants";
import { useRouter } from "expo-router";
import { useAuth } from "@/configs/authConfig";

const { width } = Dimensions.get("window");
const initialValues: SignInFormValues = {
  email: "",
  password: ""
};

const SigninScreen = () => {
  const route = useRouter()
  const { signin } = useAuth()

  return (
    <SafeAreaView style={styles.flexVertical}>
      <Text style={styles.typoHeading}>Sign In to Planner</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            await signin(values.email, values.password);  
          } catch (error: any) {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
              setErrors({
                email: 'Invalid email or password',
                password: 'Invalid email or password',
              });
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
            <Text style={styles.typoText} onPress={() => route.navigate('/verify-email')}>
              Forgot Password?
            </Text>
            <ButtonComponent
              label="Sign In"
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
          onPress={() => route.navigate('/signup')}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;

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

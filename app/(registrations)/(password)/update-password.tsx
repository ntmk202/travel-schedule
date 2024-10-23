import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonComponent, TextInputComponent } from '@/components';
import { Formik } from 'formik';
import { FixPasswordSchema, UpdatePasswordFormValues } from '@/constants';
import { useRouter } from 'expo-router';
import { auth } from '@/configs/FirebaseConfig';
import { updatePassword } from 'firebase/auth';

const { width } = Dimensions.get("window");

const initialValues: UpdatePasswordFormValues = {
  password: "",
  confirmPassword: ''
};

const UpdatePasswordScreen = () => {
  const route = useRouter()
  const handleUpdatePassword = async (password:string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, password);
        console.log("Mật khẩu đã được cập nhật thành công");
        route.push('/signin');
      } catch (error: any) {
        console.error("Cập nhật mật khẩu thất bại:", error.message);
      }
    } else {
      console.error("Không tìm thấy người dùng");
    }
  };
  return (
    <SafeAreaView style={styles.flexVertical}>
      <Text style={styles.typoHeading}>Create New Password</Text>
      <Text style={styles.typoTitle}>Create password that powerful protection</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={FixPasswordSchema}
        onSubmit={(values) => {
          handleUpdatePassword(values.password);
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
              label="Password"
              text={values.password}
              type="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
           <TextInputComponent
              label="Confirm password"
              text={values.confirmPassword}
              type="password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <ButtonComponent
              label="Create"
              mode="contained"
              onPress={handleSubmit}
              marginTop={20}
            />
          </View>
        )}
      </Formik>
      <View style={styles.flexHorizontal}>
        <Text style={styles.typoTitle}>Did you change your mind? </Text>
        <Text
          style={[styles.typoTitle, { color: "#6750a4" }]}
          onPress={() => route.back()}
        >
          Go back 
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
      width: width * 0.8,
    },
    errorText: {
      fontSize: 14,
      color: "red",
      marginBottom: 10,
    },
  });
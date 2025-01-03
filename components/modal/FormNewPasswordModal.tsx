import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import TextInputComponent from "../input/TextInputComponent";
import ButtonComponent from "../button/ButtonComponent";
import { EditPasswordFormValues, EditPasswordSchema } from "@/constants";
import { Formik } from "formik";
import { useAuth } from "@/configs/authConfig";

const { width } = Dimensions.get("window");
const initialValues: EditPasswordFormValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const FormNewPasswordModal = ({ visible, onDismiss }: any) => {
  const {changePassword} = useAuth()
  return (
    <Portal>
      <Modal
        style={{ alignItems: "center" }}
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Change Password</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={EditPasswordSchema}
          onSubmit={ async (values) => {
            await changePassword(values.oldPassword, values.newPassword)
            onDismiss();
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
            <View style={{ width: "90%" }}>
              <TextInputComponent
                label="Old Password"
                text={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                type="password"
              />
              {touched.oldPassword && errors.oldPassword && (
                <Text style={styles.errorText}>{errors.oldPassword}</Text>
              )}
              <TextInputComponent
                label="New Password"
                text={values.newPassword}
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                type="password"
              />
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              <TextInputComponent
                label="Confirm Password"
                text={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                type="password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
              <View style={styles.row}>
                <ButtonComponent
                  label="Cancel"
                  mode="elevated"
                  onPress={onDismiss}
                  marginTop={20}
                />
                <ButtonComponent
                  label="Save"
                  mode="contained"
                  onPress={handleSubmit}
                  marginTop={20}
                />
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default FormNewPasswordModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    width: width * 0.9,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "RC_SemiBold",
    paddingBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    paddingTop: 5,
    paddingStart: 5
  },
});

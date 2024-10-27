import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "../button/ButtonComponent";
import TextInputComponent from "../input/TextInputComponent";
import DateRangePicker from "../input/DateRangePicker";
import AutocompleteComponent from "../input/AutoComplete";
import { newScheduleSchema } from "@/constants";

const { width, height } = Dimensions.get("window");

const budgetData = [
  {
    id: "1",
    title: "Cheap",
    desc: "Budget-friendly",
    icon: "emoticon-excited-outline",
  },
  {
    id: "2",
    title: "Moderate",
    desc: "Mid-range",
    icon: "emoticon-kiss-outline",
  },
  { id: "3", title: "Luxury", desc: "High-end", icon: "emoticon-cool-outline" },
];

const travelerData = [
  {
    id: "1",
    title: "Just Me",
    desc: "Solo traveler",
    icon: "glass-mug-variant",
  },
  {
    id: "2",
    title: "Couple",
    desc: "Traveling with partner",
    icon: "human-male-female",
  },
  {
    id: "3",
    title: "Family",
    desc: "Traveling with family",
    icon: "hoop-house",
  },
  {
    id: "4",
    title: "Friends",
    desc: "Traveling with friends",
    icon: "account-group-outline",
  },
];

const FormNewSchedule = ({ visible, onDismiss, handleSubmit }: any) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined
  );

  return (
    <Portal>
      <Modal
        style={{ alignItems: "center" }}
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>New Schedule</Text>
        <Text style={styles.text}>
          Plan your trip more intelligently and quickly
        </Text>

        <Formik
          initialValues={{
            title: "",
            traveler: "",
            price: "",
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          }}
          validationSchema={newScheduleSchema}
          onSubmit={(values) => {
            handleSubmit(values.title, values.traveler, values.price, values.startDate, values.endDate);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={{ width: "100%", flex: 1 }}>
              <TextInputComponent
                label="Where do you want to go?"
                text={values.title}
                onBlur={handleBlur("title")}
                onChangeText={handleChange("title")}
              />
              {errors.title && touched.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}

              <AutocompleteComponent
                label="How is your budget?"
                data={budgetData}
                query={values.price}
                onQueryChange={(text) => setFieldValue("price", text)}
              />
              {errors.price && touched.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}

              <AutocompleteComponent
                label="Who is travelling?"
                data={travelerData}
                query={values.traveler}
                onQueryChange={(text) => setFieldValue("traveler", text)}
              />
              {errors.traveler && touched.traveler && (
                <Text style={styles.errorText}>{errors.traveler}</Text>
              )}

              <DateRangePicker
                startDate={values.startDate}
                endDate={values.endDate}
                onDateChange={(date, type) => {
                  if (type === "START_DATE") {
                    setFieldValue("startDate", date);
                  } else {
                    setFieldValue("endDate", date);
                  }
                }}
              />
              {errors.startDate && touched.startDate && (
                <Text style={styles.errorText}>{errors.startDate}</Text>
              )}
              {errors.endDate && touched.endDate && (
                <Text style={styles.errorText}>{errors.endDate}</Text>
              )}

              <View style={[styles.row, { alignSelf: "flex-end" }]}>
                <ButtonComponent
                  label="Cancel"
                  mode="elevated"
                  onPress={onDismiss}
                  marginTop={20}
                />
                <ButtonComponent
                  label="Create"
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

export default FormNewSchedule;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    width: width * 0.9,
    height: height * 0.98,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "RC_SemiBold",
    lineHeight: 30,
  },
  text: {
    fontSize: 14,
    color: "#5a5a5a",
    fontFamily: "RC_Regular",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    top: 5,
    paddingStart: 5,
  },
});

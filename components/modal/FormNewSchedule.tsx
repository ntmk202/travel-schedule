import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { Formik } from "formik";
import ButtonComponent from "../button/ButtonComponent";
import TextInputComponent from "../input/TextInputComponent";
import DateRangePicker from "../input/DateRangePicker";
import AutocompleteComponent from "../input/AutoComplete";
import { newScheduleSchema } from "@/constants";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

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

const transformData = [
  { id: "1", title: "grapBike", desc: "20VND/km", icon: "motorbike" },
  { id: "2", title: "grapCar", desc: "50VND/km", icon: "car" },
  {
    id: "3",
    title: "Rent motorbike",
    desc: "18VND/hr",
    icon: "account-clock-outline",
  },
  { id: "4", title: "Rent car", desc: "20VND/hr", icon: "car-clock" },
];

const FormNewSchedule = ({ visible, onDismiss, handleSubmit }: any) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined
  );
  // const [sliderValues, setSliderValues] = useState([2000000, 3000000]);
  const [isSecondStep, setIsSecondStep] = useState(false);

  return (
    <Portal>
      <Modal
        style={{ alignItems: "center" }}
        visible={visible}
        onDismiss={() => {
          onDismiss();
          setIsSecondStep(false);
        }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>New Schedule</Text>
        <Text style={styles.text}>
          Plan your trip more intelligently and quickly
        </Text>

        <Formik
          initialValues={{
            location: "",
            traveler: "",
            transport: "",
            price: [],
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          }}
          validationSchema={newScheduleSchema}
          onSubmit={(values) => {
            handleSubmit(
              values.location,
              values.traveler,
              values.transport,
              values.price,
              values.startDate,
              values.endDate
            );
            console.log(values.price)
            setIsSecondStep(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            validateForm,
            setFieldValue,
            setFieldTouched,
          }) => (
            <View style={{ width: "100%", flex: 1 }}>
              {!isSecondStep ? (
                <>
                  <TextInputComponent
                    label="Where do you want to go?"
                    text={values.location}
                    onBlur={handleBlur("location")}
                    onChangeText={handleChange("location")}
                  />
                  {errors.location && touched.location && (
                    <Text style={styles.errorText}>{errors.location}</Text>
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

                  
                  <AutocompleteComponent
                    label="Do you want to use any transport?"
                    data={transformData}
                    query={values.transport}
                    onQueryChange={(text) => setFieldValue("transport", text)}
                  />
                  {errors.transport && touched.transport && (
                    <Text style={styles.errorText}>{errors.transport}</Text>
                  )}

                  <Text style={styles.label}>How is your budget?</Text>
                  <MultiSlider
                    values={[2000000,3000000]} 
                    sliderLength={width*.83}
                    step={500000} 
                    min={1000000}
                    max={10000000}
                    enableLabel={true}
                    markerStyle={{backgroundColor: '#6750a4'}}
                    selectedStyle={{backgroundColor: "#6750a4"}}
                    onValuesChange={(sliderValues) => {
                      setFieldValue("price", sliderValues)
                    }}
                  />
                  {errors.price && touched.price && (
                    <Text style={styles.errorText}>{errors.price}</Text>
                  )}

                  <View
                    style={[
                      styles.row,
                      {
                        alignSelf: "flex-end",
                        position: "absolute",
                        bottom: 0,
                      },
                    ]}
                  >
                    <ButtonComponent
                      label="Next"
                      mode="elevated"
                      onPress={() => {
                        validateForm().then((formErrors) => {
                          setFieldTouched("location", true);
                          setFieldTouched("traveler", true);
                          setFieldTouched("transport", true);
                          // setFieldTouched("price", true);
                          setIsSecondStep(true)
                          // if (Object.keys(formErrors).length <= 1) {
                          //   setIsSecondStep(true);
                          // }
                        });
                      }}
                      marginTop={20}
                    />
                    <ButtonComponent
                      label="Create"
                      mode="contained"
                      onPress={handleSubmit}
                      marginTop={20}
                      disabled
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={{ height: 220 }}>
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
                  </View>

                  <View
                    style={[
                      styles.row,
                      {
                        alignSelf: "flex-end",
                        position: "absolute",
                        bottom: 0,
                      },
                    ]}
                  >
                    <ButtonComponent
                      label="Prev"
                      mode="elevated"
                      onPress={() => {
                        setIsSecondStep(false);
                      }}
                      marginTop={20}
                    />
                    <ButtonComponent
                      label="Create"
                      mode="contained"
                      onPress={handleSubmit}
                      marginTop={20}
                    />
                  </View>
                </>
              )}
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
    justifyContent: "flex-end",
    padding: 20,
    width: width * 0.95,
    height: height * 0.9,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "RC_SemiBold",
    lineHeight: 30,
  },
  label: {
    fontFamily: "RC_Regular",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 10
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

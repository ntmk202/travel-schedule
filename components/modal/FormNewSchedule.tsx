import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import ButtonComponent from '../button/ButtonComponent';
import TextInputComponent from '../input/TextInputComponent';
import CalendarPicker from "react-native-calendar-picker";
import DateRangePicker from '../input/DateRangePicker';
import AutocompleteComponent from '../input/AutoComplete';

const { width } = Dimensions.get("window");
const budgetData = [
  { title: "Cheap", desc: "Budget-friendly", icon: "emoticon-excited-outline" },
  { title: "Moderate", desc: "Mid-range", icon: "emoticon-kiss-outline"},
  { title: "Luxury", desc: "High-end", icon: "emoticon-cool-outline"}
]

const travelerData = [
{ title: "Just Me", desc: "Solo traveler", icon: "glass-mug-variant" },
{ title: "Couple", desc: "Traveling with partner", icon: "human-male-female" },
{ title: "Family", desc: "Traveling with family", icon: "hoop-house" },
{ title: "Friends", desc: "Traveling with friends", icon: "account-group-outline" }
]

const FormNewSchedule = ({ visible, onDismiss, handleSubmit }: any) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onDateChange = (date: Date, type: "START_DATE" | "END_DATE") => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(undefined);
    }
  };

  return (
    <Portal>
      <Modal
        style={{ alignItems: "center" }}
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>New Schedule</Text>
        <Text style={styles.text}>Plan your trip more intelligently and quickly</Text>
        <View style={{ width: '90%' }}>
          <View style={styles.row}>
            <View style={{ flex: 0.4 }}>
              <TextInputComponent
                label="Where do you want to go?"
                text={title}
                type="text"
                onChangeText={(value: string) => setTitle(value)}
              />
              {/* <TextInputComponent
                label="How is your budget?"
                text={price}
                type="text"
                onChangeText={(value: string) => setPrice(value)}
                /> */}
              <AutocompleteComponent label="What is your budget for this trip?" data={budgetData} />
              <AutocompleteComponent label="Who is travelling?" data={travelerData} />
            </View>
            <View style={{ flex: 0.6 }}>
              <DateRangePicker
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                onDateChange={onDateChange}
              />
            </View>
          </View>
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
    width: width * 0.6,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "RC_SemiBold",
    paddingBottom: 10,
    marginTop: 30,
  },
  text: {
    fontSize: 14,
    color: "#5a5a5a",
    fontFamily: "RC_Regular",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
});

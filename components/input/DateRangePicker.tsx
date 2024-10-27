import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (date: Date, type: 'START_DATE' | 'END_DATE') => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const minDate = new Date(); // Today

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How many days for your trip?</Text>
      <CalendarPicker
        width={300} 
        allowRangeSelection
        minDate={minDate}
        maxRangeDuration={10}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
      />
    </View>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'RC_Regular',
    fontSize: 20,
    // marginStart: -10,
    marginBottom: 10,
  },
});

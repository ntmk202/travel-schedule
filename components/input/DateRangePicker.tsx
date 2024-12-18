import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-paper';

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
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const minDate = new Date();
  const maxDate = new Date(); 
  maxDate.setDate(minDate.getDate() + 10);

  const handleStartDateConfirm = (selectedDate: Date) => {
    onDateChange(selectedDate, 'START_DATE');
    setShowStartPicker(false);
  };

  const handleEndDateConfirm = (selectedDate: Date) => {
    onDateChange(selectedDate, 'END_DATE');
    setShowEndPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How many days for your trip?</Text>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.label}>Start Date & Time:</Text>
        <TouchableOpacity style={styles.row} onPress={() => setShowStartPicker(true)}>
          <Text style={[styles.label, { color: '#6750a4' }]}>
            {startDate ? startDate.toLocaleString() : 'Select Start Date & Time'}
          </Text>
          <Icon source="calendar" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.label}>End Date & Time:</Text>
        <TouchableOpacity style={styles.row} onPress={() => setShowEndPicker(true)}>
          <Text style={[styles.label, { color: '#6750a4' }]}>
            {endDate ? endDate.toLocaleString() : 'Select End Date & Time'}
          </Text>
          <Icon source="calendar" size={24} />
        </TouchableOpacity>
      </View>

      {/* Start Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="datetime"
        date={startDate ? new Date(startDate) : undefined}
        is24Hour
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={handleStartDateConfirm}
        onCancel={() => setShowStartPicker(false)}
      />

      {/* End Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={showEndPicker}
        mode="datetime"
        date={endDate ? new Date(endDate) : undefined}
        is24Hour
        minimumDate={startDate ? new Date(startDate.getTime() + 86400000) : startDate}
        maximumDate={maxDate}
        onConfirm={handleEndDateConfirm}
        onCancel={() => setShowEndPicker(false)}
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
    marginBottom: 10,
  },
  dateTimeContainer: {
    marginVertical: 10,
  },
  label: {
    fontFamily: 'RC_Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

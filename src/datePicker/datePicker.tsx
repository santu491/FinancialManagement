import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {isIOS} from '../utils/utils';

interface DatePickerComponentProps {
  showDatePicker: boolean;
  date: Date;
  onChangePicker: (event: any, selectedDate: any) => void;
}

export const DatePickerComponent = ({
  showDatePicker,
  date,
  onChangePicker,
}: DatePickerComponentProps) => {
  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={isIOS() ? 'inline' : 'default'}
          onChange={onChangePicker}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DatePickerComponent;

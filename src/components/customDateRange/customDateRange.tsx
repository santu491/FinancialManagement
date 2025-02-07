import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR, FONT_SIZE, FONTS} from '../../theme';
import {Button} from '../button/button';
import {DatePickerComponent} from '../../datePicker/datePicker';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateFilter} from '../../redux/actions/transactions';
import {FILTER_TYPE} from '../filters/filters';

type RouteParams = {
  filterTransactionBasedOnDate?: (startDate: Date, endDate: Date) => void;
};

export const CustomDateRange = () => {
  const route = useRoute<{params: RouteParams}>();
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [getDate, setDate] = React.useState(new Date());
  const [startDateEnabled, setStartDateEnabled] = React.useState(false);
  const [endDateEnabled, setEndDateEnabled] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setStartDate(yesterday);
  }, []);

  console.log('route', route.params);
  const onChangeDatePicker = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || getDate;
    console.log('currentDate', currentDate);
    setShowDatePicker(false);
    if (startDateEnabled) {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }

    setDate(currentDate);
  };
  const onPressButton = async () => {
    console.log('Button Pressed');
    if (route.params.filterTransactionBasedOnDate) {
      dispatch(
        updateFilter({
          type: FILTER_TYPE.CUSTOM,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      );
      //   await route.params.filterTransactionBasedOnDate(
      //     startDate.toISOString(),
      //     endDate.toISOString(),
      //   );
    }
    navigation.goBack();
  };

  const onPressStartDate = () => {
    setShowDatePicker(true);
    setStartDateEnabled(true);
    setEndDateEnabled(false);
  };

  const onPressEndDate = () => {
    setShowDatePicker(true);
    setStartDateEnabled(false);
    setEndDateEnabled(true);
  };

  return (
    <View style={styles.container}>
      {showDatePicker ? (
        <DatePickerComponent
          showDatePicker={showDatePicker}
          date={getDate}
          onChangePicker={onChangeDatePicker}
        />
      ) : null}
      <Text style={styles.dateRangeTitle}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateRangeButton}
        onPress={onPressStartDate}>
        <Text>{moment(startDate).format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>

      <Text style={styles.dateRangeTitle}>End Date</Text>
      <TouchableOpacity style={styles.dateRangeButton} onPress={onPressEndDate}>
        <Text>{moment(endDate).format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>

      <Button
        title="Submit"
        onPress={onPressButton}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.GRAY,
    padding: 10,
  },
  dateRangeTitle: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    color: COLOR.TEXT,
    fontSize: FONT_SIZE.LG,
  },
  dateRangeButton: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: COLOR.WHITE,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
  },
});

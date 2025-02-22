import React from 'react';

import {TextInput} from '../textInput/textInput';
import {Button} from '../button/button';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '../picker/picker';
import {useForm} from './useForm';

import {DatePickerComponent} from '../../datePicker/datePicker';
import {COLOR, FONT_SIZE, FONTS} from '../../theme';
import moment from 'moment';

export const Form = () => {
  const {
    transactionType,
    formik,
    getCategory,
    showDatePicker,
    onChangeDatePicker,
    setShowDatePicker,
    getDate,
    getAccountType,
  } = useForm();

  const formattedDate = moment(getDate).format('DD/MM/YYYY');

  return (
    <ScrollView>
      <>
        {/* <CalendarPicker /> */}

        <Text style={styles.datePickerTitle}>Date</Text>
        {showDatePicker ? (
          <DatePickerComponent
            showDatePicker={showDatePicker}
            date={getDate}
            onChangePicker={onChangeDatePicker}
          />
        ) : null}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePicker}>
          <Text style={styles.datePickerText}>{formattedDate}</Text>
        </TouchableOpacity>

        <Picker
          data={transactionType}
          label={'Transaction Type'}
          onValueChange={value => {
            formik.setFieldValue('transactionType', value);
          }}
          selectedValue={formik.values.transactionType}
        />

        {getAccountType && getAccountType.length > 0 ? (
          <Picker
            data={getAccountType}
            label={'Account Type'}
            onValueChange={value => {
              formik.setFieldValue('accountType', value);
            }}
            selectedValue={formik.values.accountType}
          />
        ) : null}

        <TextInput
          value={formik.values.amount}
          onChangeText={formik.handleChange('amount')}
          errorMessage={formik.errors.amount ?? ''}
          label="Amount"
          required
          inputViewStyle={styles.input}
          keyboardType="number-pad"
        />
        {getCategory && getCategory?.length > 0 ? (
          <View style={styles.input}>
            <Picker
              data={getCategory}
              label={'Category'}
              selectedValue={formik.values.category}
              onValueChange={value => formik.setFieldValue('category', value)}
            />
          </View>
        ) : null}
        <TextInput
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          errorMessage={formik.errors.title ?? ''}
          label="Title"
          required
          inputViewStyle={styles.input}
        />
        <TextInput
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          label="Description"
          inputViewStyle={styles.input}
          multiline
        />
        <Button
          title="Submit"
          onPress={formik.handleSubmit}
          buttonStyle={styles.input}
          disabled={!formik.isValid}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },
  datePickerText: {
    color: COLOR.TEXT,
    fontFamily: FONTS.LATO,
    fontSize: FONT_SIZE.MD,
  },

  datePicker: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 12,
    height: 46,

    marginBottom: 30,
  },
  datePickerTitle: {
    marginTop: 30,
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.MD,
    color: COLOR.TEXT,
    paddingBottom: 8,
    paddingLeft: 2,
  },
});

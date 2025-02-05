import React from 'react';

import {TextInput} from '../textInput/textInput';
import {Button} from '../button/button';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Picker} from '../picker/picker';
import {useForm} from './useForm';

export const Form = () => {
  const {transactionType, formik, getCategory} = useForm();

  return (
    <ScrollView>
      <>
        <View style={styles.input}>
          <Picker
            data={transactionType}
            label={'Transaction Type'}
            onValueChange={value => {
              formik.setFieldValue('transactionType', value);
            }}
            selectedValue={formik.values.transactionType}
          />
        </View>
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
});

import {Formik} from 'formik';
import React from 'react';

import {TextInput} from '../textInput/textInput';
import {Button} from '../button/button';

import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {updateExpenses, updateIncome} from '../../redux/actions/transactions';
import {StyleSheet, View} from 'react-native';
import {Picker} from '../picker/picker';
import {useForm} from './useForm';

// const transactionType = ['Expenses', 'Income'];
const categoryType = ['Rent', 'Hospital', 'Loan'];

// const validationSchema = () => {
//   return Yup.object().shape({
//     amount: Yup.string().required('Amount is required'),
//   });
// };

export const Form = () => {
  const {transactionType, formik, getCategory, onFormSubmit} = useForm();
  const dispatch = useDispatch();

  // const onFormSubmit = (values: any) => {
  //   const payload = {
  //     amount: values.amount,
  //     title: values.title,
  //     description: values.description,
  //     type: values.transactionType,
  //     category: values.category,
  //   };
  //   dispatch(
  //     values.transactionType.label === transactionType[0].label
  //       ? updateExpenses(payload)
  //       : updateIncome(payload),
  //   );
  //   console.log('value....', values);
  // };
  return (
    <View>
      {/* <Formik
        initialValues={{
          transactionType: transactionType[0].label,
          //  category: categoryType[0],
          amount: '',
          title: '',
          description: '',
        }}
        validationSchema={validationSchema()}
        onSubmit={onFormSubmit}
        > */}
      {/* {({handleChange, handleSubmit, values, errors, setFieldValue}) => ( */}
      <>
        <View style={styles.input}>
          <Picker
            data={transactionType}
            label={'Transaction Type'}
            onValueChange={value => {
              console.log('value...', value);
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
          errorMessage={formik.errors.description ?? ''}
          label="Description"
          required
          inputViewStyle={styles.input}
          multiline
        />
        <Button
          title="Submit"
          onPress={formik.handleSubmit}
          buttonStyle={styles.input}
        />
      </>
      {/* )}
      </Formik> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },
});

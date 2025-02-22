import {useFormik} from 'formik';
import {PreferenceType} from '../../constants/constants';
import {insertData, openDataBase} from '../../database/database';
import * as Yup from 'yup';
import {useCallback, useEffect, useState} from 'react';
import {PreferenceCategory} from '../../models/preference';
import {TABLES} from '../../database/constants';
import {generateUniqueId} from '../../utils/utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NAVIGATION_SCREEN, TAB} from '../../navigator/navigationTypes';

const transactionType = [
  {label: 'Expenses', type: PreferenceType.EXPENSES},
  {label: 'Income', type: PreferenceType.INCOME},
  {label: 'Investments', type: PreferenceType.INVESTMENTS},
];

const validationSchema = () => {
  return Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
    title: Yup.string().required('Title is required'),
  });
};
export const useForm = () => {
  const [getCategory, setCategory] = useState<PreferenceCategory[]>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [getDate, setDate] = useState<Date>(new Date());
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [getAccountType, setAccountType] = useState<PreferenceCategory[]>();

  const getTransactionMode = (type?: string) => {
    switch (type) {
      case PreferenceType.EXPENSES:
        return 'Debit';
      case PreferenceType.INCOME:
        return 'Credit';
      case PreferenceType.INVESTMENTS:
        return 'Investment';
    }
  };

  const onFormSubmit = async () => {
    const {
      transactionType: type,
      category,
      amount,
      title,
      description,
      accountType,
    } = formik.values;
    const getType = transactionType.find(item => item.label === type)?.type;
    const categoryId = getCategory?.find(item => item.label === category)?.id;

    const data = {
      id: generateUniqueId(),
      amount: amount,
      title: title,
      description: description,
      category: category,
      categoryId: categoryId,
      transactionType: getType,
      date: getDate.toISOString(),
      createdAt: new Date().toISOString(),
      accountType: accountType,
      accountTypeId: getAccountType?.find(item => item.label === accountType)
        ?.id,
      transactionMode: getTransactionMode(getType),
    };

    await insertData(TABLES.TRANSACTIONS, data);
    formik.resetForm();

    navigation.navigate(TAB.HOME);
  };

  const formik = useFormik({
    initialValues: {
      transactionType: transactionType[0].label,
      category: getCategory ? getCategory[0]?.label ?? '' : '',
      amount: '',
      title: '',
      description: '',
      accountType: getAccountType ? getAccountType[0]?.label ?? '' : '',
    },
    validationSchema: validationSchema,
    onSubmit: onFormSubmit,
  });

  const getCategoryType = useCallback(async () => {
    const db = openDataBase();
    (await db).transaction(tx => {
      const getType = transactionType.find(
        item => item.label === formik.values.transactionType,
      );
      tx.executeSql(
        'SELECT * FROM preference WHERE type=?',
        [getType?.type],
        (_, result) => {
          if (result.rows.item(0)?.category) {
            setCategory(JSON.parse(result.rows.item(0).category));
            formik.setFieldValue(
              'category',
              JSON.parse(result.rows.item(0).category)[0].label,
            );
          } else {
            setCategory([]);
            formik.setFieldValue('category', []);
          }
        },
        error => {
          console.log('error...', error);
        },
      );
    });
  }, [formik]);

  const getAccountTypeInfo = useCallback(async () => {
    const db = openDataBase();
    (await db).transaction(tx => {
      tx.executeSql(
        'SELECT * FROM preference WHERE type=?',
        [PreferenceType.ACCOUNTS],
        (_, result) => {
          if (result.rows.item(0).category) {
            setAccountType(JSON.parse(result.rows.item(0).category));
            formik.setFieldValue(
              'accountType',
              JSON.parse(result.rows.item(0).category)[0].label,
            );
          } else {
            console.log('data is not available');
          }
        },
        error => {
          console.log('error...', error);
        },
      );
    });
  }, []);

  useEffect(() => {
    getAccountTypeInfo();
  }, []);

  useEffect(() => {
    getCategoryType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.transactionType, isFocused]);

  const onChangeDatePicker = (event: any, selectedDate: any) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  return {
    getDate,
    transactionType,
    formik,
    getCategory,
    onFormSubmit,
    showDatePicker,
    setShowDatePicker,
    onChangeDatePicker,
    getAccountType,
  };
};

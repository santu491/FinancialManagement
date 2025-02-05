import {useFormik} from 'formik';
import {PreferenceType} from '../../constants/constants';
import {insertData, openDataBase} from '../../database/database';
import * as Yup from 'yup';
import {useCallback, useEffect, useState} from 'react';
import {PreferenceCategory} from '../../models/preference';
import {TABLES} from '../../database/constants';
import {generateUniqueId} from '../../utils/utils';

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

  const onFormSubmit = async () => {
    console.log('formik...', formik.isValid, formik.errors);
    const {
      transactionType: type,
      category,
      amount,
      title,
      description,
    } = formik.values;
    const getType = transactionType.find(item => item.label === type)?.type;
    const categoryId = getCategory?.find(item => item.label === category)?.id;

    const data = {
      amount: amount,
      title: title,
      description: description,
      category: category,
      categoryId: categoryId,
      transactionType: getType,
      date: getDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    await insertData(TABLES.TRANSACTIONS, data);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      transactionType: transactionType[0].label,
      category: getCategory ? getCategory[0]?.label ?? '' : '',
      amount: '',
      title: '',
      description: '',
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
          setCategory(JSON.parse(result.rows.item(0).category));
          formik.setFieldValue(
            'category',
            JSON.parse(result.rows.item(0).category)[0].label,
          );
        },
        error => {
          console.log('error...', error);
        },
      );
    });
  }, [formik]);

  useEffect(() => {
    getCategoryType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.transactionType]);

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
  };
};

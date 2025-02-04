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
  });
};
export const useForm = () => {
  const [getCategory, setCategory] = useState<PreferenceCategory[]>();

  const onFormSubmit = async () => {
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
    };

    await insertData(TABLES.TRANSACTIONS, data);
    formik.resetForm();
    console.log('formik,.....', formik);
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

  console.log('category...', getCategory);

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
          console.log('result...', result.rows.item(0));
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

  return {
    transactionType,
    formik,
    getCategory,
    onFormSubmit,
  };
};

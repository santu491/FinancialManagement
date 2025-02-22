import {useEffect, useMemo, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDataBase} from '../../database/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateExpenses,
  updateIncome,
  updateInvestment,
  updateTransaction,
  updateFilter,
  updateTransactionTpe,
} from '../../redux/actions/transactions';
import {transactionDetails} from '../../redux/reducers/transactions/transactions';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {PreferenceType} from '../../constants/constants';
import {Transactions} from '../../models/transactions';
import {TABLES} from '../../database/constants';
import {date} from 'yup';
import {FILTER_TYPE} from '../../components/filters/filters';
import {NAVIGATION_SCREEN} from '../../navigator/navigationTypes';
import moment from 'moment';
import {updatePreferenceInfo} from '../../redux/actions/preferences';
import {updateAccountsInfo} from '../../redux/actions/accounts';
import {accountsInfo} from '../../redux/reducers/accounts/accounts';

export const useHome = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [getFilter, setFilter] = useState();
  const navigation = useNavigation();
  const transactionData = useSelector(transactionDetails);
  const accountsList = useSelector(accountsInfo);
  const {investmentDetails, incomeDetails, expensesDetails, totalAmount} =
    transactionData;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // const dateRange = transactionData.filter.type;
  const dateRange = useMemo(() => {
    const label = 'All';
    switch (transactionData.filter.type) {
      case FILTER_TYPE.THIS_MONTH:
        return 'This Month';
      case FILTER_TYPE.LAST_7_DAYS:
        return 'Last 7 Days';
      case FILTER_TYPE.LAST_ONE_MONTH:
        return 'Last One Month';
      case FILTER_TYPE.TODAY:
        return 'Today';
      case FILTER_TYPE.CUSTOM:
        const startDate = moment(transactionData.filter.startDate).format(
          'DD-MM-YYYY',
        );
        const endDate = moment(transactionData.filter.endDate).format(
          'DD-MM-YYYY',
        );
        return `${startDate} - ${endDate}`;
    }
    return label;
  }, [
    transactionData.filter.endDate,
    transactionData.filter.startDate,
    transactionData.filter.type,
  ]);
  const getTransactions = async () => {
    try {
      const db = openDataBase();
      const [incomeData, expensesData, InvestmentData] = await Promise.all([
        getTransactionBasedOnType(db, PreferenceType.INCOME),
        getTransactionBasedOnType(db, PreferenceType.EXPENSES),
        getTransactionBasedOnType(db, PreferenceType.INVESTMENTS),
      ]);
      dispatch(updateExpenses(expensesData));
      dispatch(updateIncome(incomeData));
      dispatch(updateInvestment(InvestmentData));
    } catch (error) {
      console.log('error', error);
    }
  };

  const isEmpty =
    incomeDetails.data.length === 0 &&
    expensesDetails.data.length === 0 &&
    investmentDetails.data.length === 0;

  const getTransactionBasedOnType = async (
    db: SQLiteDatabase,
    type: string,
  ): Promise<Transactions[]> => {
    return new Promise(async (resolve, reject) => {
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM transactions WHERE transactionType = ?',
          [type],
          (_, result) => {
            let transactionDetailsInfo = [];
            if (result.rows.length > 0) {
              for (let i = 0; i < result.rows.length; i++) {
                const data = result.rows.item(i);
                transactionDetailsInfo.push(data);
              }
            }
            resolve(transactionDetailsInfo);
          },
          error => {
            reject(error);
          },
        );
      });
    });
  };

  useEffect(() => {
    if (transactionData.filter.type !== FILTER_TYPE.ALL) {
      filterTransactionBasedOnDate(
        transactionData.filter.startDate,
        transactionData.filter.endDate,
      );
    } else {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, transactionData.filter.type]);

  const deleteTransaction = (id: string) => {
    const db = openDataBase();
    (async () => {
      const transaction = await db;
      transaction.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ${TABLES.TRANSACTIONS} WHERE id = ?`,
          [id],
          () => {
            getTransactions();
          },
          error => {
            console.log('error', error);
          },
        );
      });
    })();
  };

  const filterTransaction = async (
    startDate: string,
    endDate: string,
    type: string,
  ) => {
    const db = openDataBase();
    return new Promise(async (resolve, reject) => {
      (await db).transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${TABLES.TRANSACTIONS} WHERE transactionType = ? AND date BETWEEN ? AND ?`,
          [type, startDate, endDate],
          (_, result) => {
            let transactionDetailsInfo = [];
            if (result.rows.length > 0) {
              for (let i = 0; i < result.rows.length; i++) {
                const data = result.rows.item(i);
                transactionDetailsInfo.push(data);
              }
            }

            resolve(transactionDetailsInfo);
          },
          error => {
            console.log('error...', error);
            reject(error);
          },
        );
      });
    });
  };

  const onPressFilter = () => {
    setShowFilter(true);
  };

  const getCurrentMonthStartAndEndDateISO = () => {
    const startDate = new Date();
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set to 00:00:00

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the next month
    endDate.setDate(0); // Set to the last day of the previous month
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    return {
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
    };
  };

  const getLast7DaysStartAndEndDateISO = () => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Go back 6 days
    startDate.setHours(0, 0, 0, 0); // Set to 00:00:00

    return {
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
    };
  };

  const getLastOneMonthStartAndEndDateISO = () => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Go back 30 days
    startDate.setHours(0, 0, 0, 0); // Set to 00:00:00

    return {
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
    };
  };

  const getTodayStartAndEndDateISO = () => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Set to 00:00:00

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    return {
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
    };
  };

  const updateFilters = async item => {
    setFilter(item.type);
    let startDateISO = '';
    let endDateISO = '';

    switch (item.type) {
      case FILTER_TYPE.THIS_MONTH:
        ({startDateISO, endDateISO} = getCurrentMonthStartAndEndDateISO());
        dispatch(
          updateFilter({
            type: FILTER_TYPE.THIS_MONTH,
            startDate: startDateISO,
            endDate: endDateISO,
          }),
        );
        break;
      case FILTER_TYPE.LAST_7_DAYS:
        ({startDateISO, endDateISO} = getLast7DaysStartAndEndDateISO());
        dispatch(
          updateFilter({
            type: FILTER_TYPE.LAST_7_DAYS,
            startDate: startDateISO,
            endDate: endDateISO,
          }),
        );
        break;
      case FILTER_TYPE.LAST_ONE_MONTH:
        ({startDateISO, endDateISO} = getLastOneMonthStartAndEndDateISO());
        dispatch(
          updateFilter({
            type: FILTER_TYPE.LAST_ONE_MONTH,
            startDate: startDateISO,
            endDate: endDateISO,
          }),
        );
        break;

      case FILTER_TYPE.TODAY:
        ({startDateISO, endDateISO} = getTodayStartAndEndDateISO());
        dispatch(
          updateFilter({
            type: FILTER_TYPE.TODAY,
            startDate: startDateISO,
            endDate: endDateISO,
          }),
        );
        break;
      case FILTER_TYPE.ALL:
        dispatch(
          updateFilter({
            type: FILTER_TYPE.ALL,
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
          }),
        );
        getTransactions();
        break;
      case FILTER_TYPE.CUSTOM:
        navigation.navigate(NAVIGATION_SCREEN.CUSTOM_DATE_RANGE, {
          filterTransactionBasedOnDate,
        });
        break;

      // Add other cases for different filters if needed
    }

    // try {
    //   // filterTransactionBasedOnDate(startDateISO, endDateISO);
    //   // dispatch(
    //   //   updateFilter({
    //   //     type: FILTER_TYPE.CUSTOM,
    //   //     startDate: startDateISO,
    //   //     endDate: startDateISO,
    //   //   }),
    //   // );
    // } catch (error) {
    //   console.log('error', error);
    // }
    setShowFilter(false);
  };

  const filterTransactionBasedOnDate = async (
    startDateISO: string,
    endDateISO: string,
  ) => {
    console.log('startDateISO...', startDateISO, endDateISO);
    const [incomeData, expensesData, InvestmentData] = await Promise.all([
      filterTransaction(startDateISO, endDateISO, PreferenceType.INCOME),
      filterTransaction(startDateISO, endDateISO, PreferenceType.EXPENSES),
      filterTransaction(startDateISO, endDateISO, PreferenceType.INVESTMENTS),
    ]);
    dispatch(updateExpenses(expensesData));
    dispatch(updateIncome(incomeData));
    dispatch(updateInvestment(InvestmentData));
  };

  const onPressTransactionType = (type: string) => {
    // if(type === transactionData.transactionType) {}
    // else{

    // }
    dispatch(updateTransactionTpe(type));
    if (type === PreferenceType.ACCOUNTS) {
      onPressAccounts(type);
    }
  };

  const onPressAccounts = async (type: string) => {
    const db = openDataBase();
    (await db).transaction(txOuter => {
      txOuter.executeSql(
        'SELECT * FROM preference WHERE type = ?',
        [type],
        (_, result) => {
          if (result.rows.length > 0) {
            const data = result.rows.item(0);
            dispatch(updateAccountsInfo(data.category));
          } else {
            dispatch(updateAccountsInfo([]));
          }
        },
        error => {
          console.log('fetch error....', error);
        },
      );
    });
  };

  const onPressAccount = item => {
    console.log('item...1231234', item);

    navigation.navigate(NAVIGATION_SCREEN.ACCOUNTS, {data: item});
  };

  return {
    transactionData,
    investmentDetails,
    incomeDetails,
    expensesDetails,
    totalAmount,
    isEmpty,
    deleteTransaction,
    onPressFilter,
    showFilter,
    setShowFilter,
    updateFilters,
    getFilter,
    dateRange,
    onPressTransactionType,
    transactionType: transactionData.transactionType,
    onPressAccounts,
    accountsList,
    onPressAccount,
  };
};

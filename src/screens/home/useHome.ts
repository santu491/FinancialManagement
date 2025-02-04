import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {openDataBase} from '../../database/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateExpenses,
  updateIncome,
  updateInvestment,
  updateTransaction,
} from '../../redux/actions/transactions';
import {transactionDetails} from '../../redux/reducers/transactions/transactions';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {PreferenceType} from '../../constants/constants';
import {Transactions} from '../../models/transactions';

export const useHome = () => {
  const transactionData = useSelector(transactionDetails);
  const {investmentDetails, incomeDetails, expensesDetails, totalAmount} =
    transactionData;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return {
    transactionData,
    investmentDetails,
    incomeDetails,
    expensesDetails,
    totalAmount,
  };
};

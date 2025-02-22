import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Transactions} from '../../models/transactions';
import {useEffect} from 'react';
import {openDataBase} from '../../database/database';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateAccountsCategory} from '../../redux/actions/accounts';
import {transactionDetails} from '../../redux/reducers/transactions/transactions';
import {accountsInfo} from '../../redux/reducers/accounts/accounts';
export const useAccounts = () => {
  const params = useRoute().params;
  const dispatch = useDispatch();
  const transactionData = useSelector(transactionDetails);

  const {accountDetails} = transactionData;

  const getAccounts = async (
    db: SQLiteDatabase,
    id: string,
  ): Promise<Transactions[]> => {
    return new Promise(async (resolve, reject) => {
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM transactions WHERE accountTypeId = ?',
          [id],
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
    if (params.data.id) {
      const db = openDataBase();
      getAccounts(db, params.data.id).then(data => {
        dispatch(updateAccountsCategory(data));
      });
    }
  }, []);

  return {getAccounts, accountDetails};
};

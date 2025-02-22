import {combineReducers} from 'redux';
import {transactionReducer} from '../reducers/transactions/transactions';
import {preferenceReducer} from '../reducers/preferences/preferences';
import {accountsReducer} from '../reducers/accounts/accounts';

export const rootReducer = combineReducers({
  transaction: transactionReducer,
  preference: preferenceReducer,
  accounts: accountsReducer,
});

import {combineReducers} from 'redux';
import {transactionReducer} from '../reducers/transactions/transactions';
import {preferenceReducer} from '../reducers/preferences/preferences';

export const rootReducer = combineReducers({
  transaction: transactionReducer,
  preference: preferenceReducer,
});

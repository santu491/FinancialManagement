import {FILTER_TYPE} from '../../../components/filters/filters';
import {Transactions} from '../../../models/transactions';

import moment from 'moment';
import {PreferenceType} from '../../../constants/constants';

const transformTransaction = (data: any[]) => {
  let updatedData: {[key: string]: any[]} = {};
  data.forEach(item => {
    const month_date = moment(item.date).format('MMMM YYYY');
    if (!updatedData[month_date]) {
      updatedData[month_date] = [];
    }
    updatedData[month_date].push(item);
  });
  const formData = Object.keys(updatedData).map(key => ({
    title: key,
    data: updatedData[key],
  }));
  return formData;
};

const initialState = {
  totalAmount: 0,
  transactionType: PreferenceType.EXPENSES,
  transactionDetails: [] as Transactions[],
  filter: {
    type: FILTER_TYPE.ALL,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
  investmentDetails: {
    title: 'Investments',
    data: [
      {
        title: '',
        data: [] as Transactions[],
      },
    ],
  },
  incomeDetails: {
    title: 'Income',
    data: [
      {
        title: '',
        data: [] as Transactions[],
      },
    ],
  },
  expensesDetails: {
    title: 'Expenses',
    data: [
      {
        title: 'Expenses',
        data: [] as Transactions[],
      },
    ],
  },
};

export const transactionReducer = (
  state = initialState,
  action: {
    payload: any;
    type: any;
  },
) => {
  switch (action.type) {
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactionDetails: action.payload,
      };
    case 'UPDATE_INCOME':
      return {
        ...state,
        incomeDetails: {
          ...state.incomeDetails,
          data: transformTransaction(action.payload),
        },
      };

    case 'UPDATE_EXPENSES':
      return {
        ...state,
        expensesDetails: {
          ...state.expensesDetails,
          data: transformTransaction(action.payload),
        },
      };
    case 'UPDATE_INVESTMENT':
      return {
        ...state,
        investmentDetails: {
          ...state.investmentDetails,
          data: transformTransaction(action.payload),
        },
      };
    case 'UPDATE_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case 'UPDATE_TRANSACTION_TYPE':
      return {
        ...state,
        transactionType: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export const transactionDetails = state => state.transaction;

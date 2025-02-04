import {Transactions} from '../../../models/transactions';
const initialState = {
  totalAmount: 0,
  transactionDetails: [] as Transactions[],
  investmentDetails: {
    title: 'Investments',
    data: [] as Transactions[],
  },
  incomeDetails: {
    title: 'Income',
    data: [] as Transactions[],
  },
  expensesDetails: {
    title: 'Expenses',
    data: [] as Transactions[],
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
          data: action.payload,
        },
      };

    case 'UPDATE_EXPENSES':
      return {
        ...state,
        expensesDetails: {
          ...state.expensesDetails,
          data: action.payload,
        },
      };
    case 'UPDATE_INVESTMENT':
      return {
        ...state,
        investmentDetails: {
          ...state.investmentDetails,
          data: action.payload,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export const transactionDetails = state => state.transaction;

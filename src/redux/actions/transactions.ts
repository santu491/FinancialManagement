export const updateExpenses = (payload: any) => {
  return {
    type: 'UPDATE_EXPENSES',
    payload,
  };
};

export const updateIncome = (payload: any) => {
  return {
    type: 'UPDATE_INCOME',
    payload,
  };
};

export const updateInvestment = (payload: any) => {
  return {
    type: 'UPDATE_INVESTMENT',
    payload,
  };
};

export const updateTransaction = (payload: any) => {
  return {
    type: 'UPDATE_TRANSACTION',
    payload,
  };
};

export const updateFilter = (payload: any) => {
  return {
    type: 'UPDATE_FILTER',
    payload,
  };
};

export const updateTransactionTpe = (payload: any) => {
  return {
    type: 'UPDATE_TRANSACTION_TYPE',
    payload,
  };
};

export const updateAccountsInfo = (payload: any) => {
  return {
    type: 'UPDATE_ACCOUNTS',
    payload,
  };
};

export const updateAccountsCategory = (payload: any) => {
  return {
    type: 'UPDATE_ACCOUNT_CATEGORY',
    payload,
  };
};

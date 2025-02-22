const initialState = {
  accounts: [],
};

export const accountsReducer = (
  state = initialState,
  action: {
    payload: any;
    type: any;
  },
) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const accountsInfo = state => state.accounts.accounts;

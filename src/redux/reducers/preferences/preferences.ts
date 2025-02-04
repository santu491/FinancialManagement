import {PreferenceType} from '../../../constants/constants';

const initialState = {
  preference: [
    {type: PreferenceType.EXPENSES, label: []},
    {type: PreferenceType.INCOME, label: []},
    {type: PreferenceType.INVESTMENTS, label: []},
  ],
};

export const preferenceReducer = (
  state = initialState,
  action: {
    payload: any;
    type: any;
  },
) => {
  switch (action.type) {
    case 'UPDATE_PREFERENCE':
      return {
        ...state,
        preference: action.payload,
      };

    case 'DELETE_PREFERENCE':
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export const preferenceInfo = state => state.preference.preference;

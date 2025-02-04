export const addPreference = (payload: any) => {
  return {
    type: 'ADD_PREFERENCE',
    payload,
  };
};

export const updatePreferenceInfo = (payload: any) => {
  return {
    type: 'UPDATE_PREFERENCE',
    payload,
  };
};

// export const updatePreference = (payload: any) => {
//   return {
//     type: 'UPDATE_PREFERENCE',
//     payload,
//   };
// };

export const editPreference = (payload: any) => {
  return {
    type: 'EDIT_PREFERENCE',
    payload,
  };
};

export const DeletePreference = (payload: any) => {
  return {
    type: 'DELETE_PREFERENCE',
    payload,
  };
};

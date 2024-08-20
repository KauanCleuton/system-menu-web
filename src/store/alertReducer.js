import * as actionTypes from './actions';

export const initialState = {
  open: false,
  message: '',
  severity: 'success',
  type: "user"
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        open: true,
        message: action.message,
        severity: action.severity || 'success',
        type: action.type
      };
    case actionTypes.CLOSE_ALERT:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default alertReducer;

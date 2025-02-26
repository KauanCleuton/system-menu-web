import * as actionTypes from './actions';

export const initialState = {
  open: false,
  message: '',
  severity: 'success',
  alertType: "user",
  timeStamp: 6000
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        open: true,
        message: action.message,
        severity: action.severity || 'success',
        alertType: action.alertType,
        timeStamp: action.timeStamp
      };
    case actionTypes.CLOSE_ALERT:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default alertReducer;

import { extractDataFromSession, isLoggedIn } from '@/utils/auth';
import * as actionTypes from './actions';

export const initialState = {
  opened: false,
  func: null,
  mode: 'login',
  data: {},
  auth: false,
};

const loginReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SET_LOGIN_MENU:
      const opened = action.opened !== undefined ? action.opened : state.opened;
      const mode = action.mode || state.mode;
      process.env.NODE_ENV !== 'production' &&
        console.log(303012, { ...state, opened: action.opened, func: action.func, mode: action.mode });
      const newSt = { ...state, opened, func: action.func, mode };
      process.env.NODE_ENV !== 'production' && console.log('ns', newSt);
      return newSt;
    case actionTypes.SET_LOGOUT:
      return {
        opened: false,
        func: null,
        data: null,
        auth: false
      };
    case actionTypes.SET_LOGIN_DATA:
      const data = extractDataFromSession();
      const newState = { ...state, data, auth: true };
      process.env.NODE_ENV !== 'production' && console.log(3039, newState);
      return newState;
    default:
      return state;
  }
};

export default loginReducer;

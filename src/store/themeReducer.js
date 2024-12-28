import * as actionTypes from './actions';


export const initialState = {
  id: null,
  nameTheme: '',
  domain: '',
  primary: '',
  secondary: '',
  logo: '',
  title: '',
  favicon: '',
  siteName: '',
  address: '',
  phone: '',
  createdAt: '',
  updatedAt: '',
  visibleTheme: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      console.log(action.payload, 19391239129)

      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.RESET_THEME:
      return initialState;
    default:
      return state;
  }
};

export default themeReducer;

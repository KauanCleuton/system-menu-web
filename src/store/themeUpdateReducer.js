
import * as actionTypes from './actions';

export const initialState = {
  themeUpdated: false,
};

const themeUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SYNC_THEME_UPDATE:
      return {
        ...state,
        themeUpdated: action.payload,
      };
    case actionTypes.SYNC_THEME:
      return {
        ...state,
        themeUpdated: action.payload,
      };
    default:
      return state;
  }
};

export default themeUpdateReducer;

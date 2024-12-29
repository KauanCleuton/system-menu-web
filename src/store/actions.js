export const SET_LOGIN_DATA = '@login/SET_LOGIN_DATA';
export const SET_LOGOUT = '@login/SET_LOGOUT';
export const SET_LOGIN_MENU = '@login/SET_LOGIN_MENU';
export const SET_ALERT = '@alert/SET_ALERT';
export const CLOSE_ALERT = '@alert/CLOSE_ALERT';
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const SET_THEME = '@theme/SET_THEME';
export const RESET_THEME = '@theme/RESET_THEME';
export const SYNC_THEME_UPDATE = '@themeUpdate/SYNC_THEME_UPDATE';
export const SYNC_THEME = '@themeUpdate/SYNC_THEME';



export const setTheme = (themeData) => ({
  type: SET_THEME,
  payload: themeData,
});

export const resetTheme = () => ({
  type: RESET_THEME,
});

export const showAlert = (message, severity, type) => ({
  type: SHOW_ALERT,
  payload: { message, severity, type, open: true },
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
});

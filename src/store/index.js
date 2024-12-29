import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer from './cartSlice';
import loginReducer from './loginSlice';
import customizationReducer from './customizationOpened';
import alertReducer from './alertReducer';
import themeReducer from './themeReducer';
import themeUpdateReducer from './themeUpdateReducer';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        cart: cartReducer,
        login: loginReducer,
        customization: customizationReducer,
        alert: alertReducer,
        theme: themeReducer,
        themeUpdate: themeUpdateReducer
    },
});

export default store;

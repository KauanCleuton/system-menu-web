import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer from './cartSlice';
import loginReducer from './loginSlice';
import customizationReducer from './customizationOpened';
import alertReducer from './alertReducer';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        cart: cartReducer,
        login: loginReducer,
        customization: customizationReducer,
        alert: alertReducer
    },
});

export default store;

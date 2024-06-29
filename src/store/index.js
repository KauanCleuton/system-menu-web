import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer from './cartSlice';
import loginReducer from './loginSlice';
import customizationReducer from './customizationOpened';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        cart: cartReducer,
        login: loginReducer,
        customization: customizationReducer
    },
});

export default store;

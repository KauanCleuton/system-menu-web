import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        cart: cartReducer,
    },
});

export default store;

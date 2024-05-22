import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  items: getStoredItems(),
  totalAmount: getStoredAmount(),
  totalItems: getStoredItems().length,
};

function getStoredItems() {
  try {
    const storedItems = window.localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error retrieving cart items from localStorage:', error);
    return [];
  }
}

function getStoredAmount() {
  try {
    const storedAmount = window.localStorage.getItem('totalAmount');
    return storedAmount ? JSON.parse(storedAmount) : 0;
  } catch (error) {
    console.error('Error retrieving total amount from localStorage:', error);
    return 0;
  }
}

export const addItemToCart = createAction('cart/addItemToCart', (item) => {
  return {
    payload: item,
  };
});

export const removeItemFromCart = createAction('cart/removeItemFromCart', (id) => {
  return {
    payload: id,
  };
});

export const clearCart = createAction('cart/clearCart');

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToCart, (state, action) => {
      const newItem = action.payload;
      if (newItem) {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (!existingItem) {
          state.items.push(newItem);
          state.totalItems++;
        } else {
          existingItem.quantity += newItem.quantity;
        }
        state.totalAmount += newItem.price * newItem.quantity;
        window.localStorage.setItem('cartItems', JSON.stringify(state.items));
        window.localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        window.localStorage.setItem('totalItems', JSON.stringify(state.totalItems));
      }
    })
    .addCase(removeItemFromCart, (state, action) => {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
        state.totalItems--;
        window.localStorage.setItem('cartItems', JSON.stringify(state.items));
        window.localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        window.localStorage.setItem('totalItems', JSON.stringify(state.totalItems));
      }
    })
    .addCase(clearCart, (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      window.localStorage.removeItem('cartItems');
      window.localStorage.removeItem('totalAmount');
      window.localStorage.removeItem('totalItems');
    });
});

export default cartReducer;

import { createAction, createReducer } from '@reduxjs/toolkit';

const initialModalState = {
  opened: false,
  selectedItem: null,
  quantity: 1,
  deliveryDescription: '',
};

export const openModal = createAction('modal/openModal', (item) => {
  return {
    payload: item,
  };
});

export const closeModal = createAction('modal/closeModal');

export const updateQuantity = createAction('modal/updateQuantity', (quantity) => {
  return {
    payload: quantity,
  };
});

export const updateDeliveryDescription = createAction('modal/updateDeliveryDescription', (description) => {
  return {
    payload: description,
  };
});

const modalReducer = createReducer(initialModalState, (builder) => {
  builder
    .addCase(openModal, (state, action) => {
      state.opened = true;
      state.selectedItem = action.payload;
      state.quantity = 1; // reset to 1 when opening the modal
      state.deliveryDescription = '';
    })
    .addCase(closeModal, (state) => {
      state.opened = false;
      state.selectedItem = null;
      state.quantity = 1;
      state.deliveryDescription = '';
    })
    .addCase(updateQuantity, (state, action) => {
      state.quantity = action.payload;
    })
    .addCase(updateDeliveryDescription, (state, action) => {
      state.deliveryDescription = action.payload;
    });
});

export default modalReducer;

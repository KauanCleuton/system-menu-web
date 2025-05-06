import { createAction, createReducer } from '@reduxjs/toolkit';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Certifique-se de ter este plugin instalado

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
    return storedAmount ? Number(storedAmount) : 0;
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
      const existingItem = state.items.find((item) => item.idProducts === newItem.idProducts);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        existingItem.quantity = newItem.quantity;
        existingItem.deliveryDescription = newItem.deliveryDescription;
        state.totalAmount += newItem.price * newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity });
        state.totalItems++;
        state.totalAmount += newItem.price * newItem.quantity;
      }
      window.localStorage.setItem('cartItems', JSON.stringify(state.items));
      window.localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      window.localStorage.setItem('totalItems', JSON.stringify(state.totalItems));
    }
  })
    .addCase(removeItemFromCart, (state, action) => {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.idProducts === id);
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

export function printCartItems() {
  const items = getStoredItems();
  const totalAmount = getStoredAmount();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Pedido do Carrinho', 14, 22);

  doc.setFontSize(12);
  doc.autoTable({
    head: [['Nome', 'Preço', 'Quantidade', 'Descrição']],
    body: items.map(item => [item.title, item.price.toFixed(2), item.quantity, item.description || '']),
    startY: 30,
    styles: { fontSize: 12 },
    theme: 'grid',
  });

  const finalY = doc.lastAutoTable.finalY || 30;

  doc.text(`Total de Itens: ${totalItems}`, 14, finalY + 10);
  doc.text(`Total a Pagar: R$ ${totalAmount.toFixed(2)}`, 14, finalY + 20);

  doc.save('comanda.pdf');
}
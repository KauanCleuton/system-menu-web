// src/store/cartSlice.js
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
    items: getStoredItems(),
    totalAmount: 0,
    totalItems: 0,
};

function getStoredItems() {
    try {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
        console.error('Error retrieving cart items from localStorage:', error);
        return [];
    }
}

export const addItemToCart = createAction('cart/addItemToCart');
export const removeItemFromCart = createAction('cart/removeItemFromCart');
export const clearCart = createAction('cart/clearCart');

const cartReducer = createReducer(initialState, builder => {
    builder
        .addCase(addItemToCart, (state, action) => {
            const newItem = action.payload;
            if (newItem) {
                const existingItem = state.items.find(item => item.id === newItem.id);

                if (!existingItem) {
                    state.items.push({
                        ...newItem,
                        quantity: newItem.quantity,
                        totalPrice: newItem.price * newItem.quantity,
                    });
                } else {
                    existingItem.quantity += newItem.quantity;
                    existingItem.totalPrice += newItem.price * newItem.quantity;
                }

                state.totalAmount += newItem.price * newItem.quantity;
                state.totalItems += newItem.quantity;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        })
        .addCase(removeItemFromCart, (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.totalItems -= existingItem.quantity;

                state.items = state.items.filter(item => item.id !== id);
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        })
        .addCase(clearCart, state => {
            state.items = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            localStorage.removeItem('cartItems');
        });
});

export default cartReducer;


// import { createAction, createReducer } from '@reduxjs/toolkit';

// const initialState = {
//     items: getStoredItems(),
//     totalAmount: 0,
//     totalItems: 0,
// };

// function getStoredItems() {
//     try {
//         const storedItems = localStorage.getItem('cartItems');
//         return storedItems ? JSON.parse(storedItems) : [];
//     } catch (error) {
//         console.error('Error retrieving cart items from localStorage:', error);
//         return [];
//     }
// }

// export const addItemToCart = createAction('cart/addItemToCart', (item) => {
//     return {
//         payload: item,
//     };
// });

// export const removeItemFromCart = createAction('cart/removeItemFromCart', (id) => {
//     return {
//         payload: id,
//     };
// });

// export const clearCart = createAction('cart/clearCart');

// const cartReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addItemToCart, (state, action) => {
//             const newItem = action.payload;
//             if (newItem) {
//                 const existingItem = state.items.find((item) => item.id === newItem.id);
//                 if (!existingItem) {
//                     state.items.push(newItem);
//                 } else {
//                     existingItem.quantity += newItem.quantity;
//                 }
//                 state.totalAmount += newItem.price * newItem.quantity;
//                 state.totalItems += newItem.quantity;
//                 localStorage.setItem('cartItems', JSON.stringify(state.items));
//             }
//         })
//         .addCase(removeItemFromCart, (state, action) => {
//             const id = action.payload;
//             const existingItemIndex = state.items.findIndex((item) => item.id === id);
//             if (existingItemIndex !== -1) {
//                 const existingItem = state.items[existingItemIndex];
//                 state.totalAmount -= existingItem.price * existingItem.quantity;
//                 state.totalItems -= existingItem.quantity;
//                 state.items.splice(existingItemIndex, 1);
//                 localStorage.setItem('cartItems', JSON.stringify(state.items));
//             }
//         })
//         .addCase(clearCart, (state) => {
//             state.items = [];
//             state.totalAmount = 0;
//             state.totalItems = 0;
//             localStorage.removeItem('cartItems');
//         });
// });

// export default cartReducer;

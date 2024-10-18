// src/features/cart/cartSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/types';

// Helper function for LocalStorage
const loadCartFromLocalStorage = (): CartState => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
};
const saveCartToLocalStorage = (cartState: CartState): void => {
    localStorage.setItem('cart', JSON.stringify(cartState))
}

// Initial cart state
const initialState: CartState = loadCartFromLocalStorage()

// Helper function to calculate the total quantity and price
const calculateTotals = (items: CartItem[]): { totalQuantity: number; totalPrice: number } => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
        totalQuantity,
        totalPrice: parseFloat(totalPrice.toFixed(2))
    };
};

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const itemExists = state.items.find((item) => item.id === action.payload.id);

            if (itemExists) {
                // Update quantity if the item exists (pure function, immutability maintained)
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                state.items = updatedItems;
            } else {
                // Add new item to the cart
                state.items.push(action.payload);
            }

            // Recalculate total quantity and price
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;

            saveCartToLocalStorage(state);
        },

        removeItem: (state, action: PayloadAction<{ id: number }>) => {
            const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
            state.items = updatedItems;

            // Recalculate total quantity and price
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;

            saveCartToLocalStorage(state);
        },

        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const updatedItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            state.items = updatedItems;

            // Recalculate total quantity and price
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;

            saveCartToLocalStorage(state);

        },

        // Clear the cart
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            saveCartToLocalStorage(state);
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

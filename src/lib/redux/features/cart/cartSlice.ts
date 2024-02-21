import { findItemById, findItemByIndex } from '@/lib/utils';
import { TCartItem } from '@/types/cart.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TCartState = {
  cartItems: TCartItem[];
};

const initialState: TCartState = {
  cartItems: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product item to cart
    addCartItem: (state, action: PayloadAction<TCartItem>) => {
      if(findItemById(state.cartItems, action.payload.id))
        return;
      
      state.cartItems = [action.payload, ...state.cartItems];
    },

    // Remove product item from cart
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => action.payload !== cartItem.id
      );
    },

    // Update cart item quantity
    cartItemQuantChange: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const foundIndex = findItemByIndex(state.cartItems, action.payload.id);

      if(foundIndex !== -1) {
        state.cartItems[foundIndex].quantity = action.payload.quantity;
      }
    },
  }
});

// Action creators are generated for each case reducer function
export const { addCartItem, removeCartItem, cartItemQuantChange } = cartSlice.actions;

export default cartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import shopReducer from './features/shop/shopSlice';
import commentReducer from './features/comment/commentSlice';
import productReducer from './features/product-admin/productSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      shop: shopReducer,
      product: productReducer,
      comment: commentReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

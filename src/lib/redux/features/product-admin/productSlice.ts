import { Product } from '@/components/customs/account/product/Columns';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const products: Product[] = [
  {
    id: '1',
    name: 'John D',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '2',
    name: 'Goddess Hart',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '3',
    name: 'Devil',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '4',
    name: 'Roxy Suveila',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '5',
    name: 'Dragon Roar',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '6',
    name: 'Valahalla',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '7',
    name: 'Dead meat',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '8',
    name: 'Harvel Rickert',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '9',
    name: 'RASszesy',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '10',
    name: 'Hamster donkey',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '11',
    name: 'Vergilante',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '12',
    name: 'Levithian',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
];

type TProductState = {
  productItems: Product[];
};

const initialState: TProductState = {
  productItems: products.slice(0, 10),
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Get products by page
    getProductsByPage: (state, action: PayloadAction<number>) => {
      // const currentPage = action.payload;
      state.productItems = products;
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      console.log('Remove product: ', action.payload);
      // const productId = action.payload;
    },

    editProduct: (state, action: PayloadAction<Product>) => {
      console.log('Edit product: ', action.payload);
      // const editedProduct = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { getProductsByPage, removeProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;

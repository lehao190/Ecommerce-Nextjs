import { Product } from '@/components/customs/account/product/Columns';
import { handleRequest } from '@/utils/handle-requests';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parse } from 'graphql';
import { gql } from 'graphql-request';

// const products: Product[] = [
//   {
//     id: '1',
//     name: 'John D',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '2',
//     name: 'Goddess Hart',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '3',
//     name: 'Devil',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '4',
//     name: 'Roxy Suveila',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '5',
//     name: 'Dragon Roar',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '6',
//     name: 'Valahalla',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '7',
//     name: 'Dead meat',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '8',
//     name: 'Harvel Rickert',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '9',
//     name: 'RASszesy',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '10',
//     name: 'Hamster donkey',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '11',
//     name: 'Vergilante',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   },
//   {
//     id: '12',
//     name: 'Levithian',
//     image:
//       'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
//     price: 316.4,
//     quantity: 8,
//     createdAt: '19/11/1999'
//   }
// ];

export type TMeta = {
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  next: number;
  prev: number;
};

type TProductsByPageResponse = {
  getProductsByPage: {
    data: Product[];
    meta: TMeta;
  };
};

export const getProductsByPage = createAsyncThunk(
  'product/getProductsByPage',
  async (currentPage: number) => {
    const getProductsSchema = parse(gql`
      query GetProductsByPage($page: Int!) {
        getProductsByPage(paginationInput: { page: $page, perPage: 10 }) {
          data {
            id
            name
            price
            quantity
            category
            image
          }
          meta {
            total
            currentPage
            lastPage
            perPage
            next
            prev
          }
        }
      }
    `);

    const [data, _] = await handleRequest<TProductsByPageResponse>(
      getProductsSchema,
      {
        page: +currentPage
      }
    );

    return data;
  }
);

type TProductState = {
  loading: boolean;
  productItems: Product[];
  meta: TMeta;
};

const initialState: TProductState = {
  loading: false,
  productItems: [],
  meta: {
    total: 1,
    currentPage: 1,
    lastPage: 1,
    perPage: 1,
    next: 1,
    prev: 1
  }
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Get products by page
    // getProductsByPage: (state, action: PayloadAction<number>) => {
    //   // const currentPage = action.payload;
    //   state.productItems = products;
    // },

    removeProduct: (state, action: PayloadAction<number>) => {
      console.log('Remove product: ', action.payload);
      // const productId = action.payload;
    },

    editProduct: (state, action: PayloadAction<Product>) => {
      console.log('Edit product: ', action.payload);
      // const editedProduct = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByPage.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.getProductsByPage.data.length) {
          state.productItems = [
            ...state.productItems,
            ...action.payload?.getProductsByPage.data
          ];

          state.meta = action.payload?.getProductsByPage.meta;
        }
      })
      .addCase(getProductsByPage.rejected, (state) => {
        state.loading = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { removeProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;

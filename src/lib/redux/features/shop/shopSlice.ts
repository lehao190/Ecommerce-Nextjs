import { TProduct, TProductCategory, TProductPriceFilter } from '@/types/product.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const products: TProduct[] = [
  {
    id: 1,
    name: 'Idea gear Headphone Max 23',
    price: 499,
    starRating: 4,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    category: 'ELECTRONICS'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    price: 1299,
    starRating: 5,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/15-inch-macbook-air-2tb-midnight.png',
    category: 'ELECTRONICS'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 228.3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'ELECTRONICS'
  },
  {
    id: 4,
    name: 'Apple Watch',
    price: 49.5,
    starRating: 2,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'ELECTRONICS'
  },
  {
    id: 5,
    name: 'Apple Watch',
    price: 500,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'CLOTHES'
  },
  {
    id: 6,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'SHOES'
  },
  {
    id: 7,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'SHOES'
  },
  {
    id: 8,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'CLOTHES'
  },
  {
    id: 9,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'ELECTRONICS'
  },
  {
    id: 10,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png',
    category: 'ACCESSORIES'
  }
];

type TShopState = {
  productItems: TProduct[];
  filterByCategories: TProductCategory[];
  filterByPrices: TProductPriceFilter;
};

const initialState: TShopState = {
  productItems: products.slice(0, 8),
  filterByCategories: [],
  filterByPrices: 'ALL'
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    // Get products by page
    getProductsByPage: (state, action: PayloadAction<TProduct[]>) => {
      state.productItems = action.payload;
    },

    // Add category to the list of filter
    addCategoryCriteria: (state, action: PayloadAction<TProductCategory>) => {
      state.filterByCategories.push(action.payload);
    },

    // Remove category from the list of filter
    removeCategoryCriteria: (state, action: PayloadAction<TProductCategory>) => {
      const index = state.filterByCategories.findIndex(category => category === action.payload);

      if (index !== -1) {
        state.filterByCategories.splice(index, 1);
      }
    },

    // Filter products by categories
    filterProductByCategories: (state) => {
      const filteredProducts = products.filter(product => state.filterByCategories.includes(product.category));
      
      if(filteredProducts.length) {
        state.productItems = filteredProducts;
      } else {
        state.productItems = products;
      }
    },

    // Filter products by prices
    filterProductByPrices: (state) => {
      const filteredProducts = products.filter(product => product.price < 500);
      
      state.productItems = filteredProducts;
    }
  }
});

// Action creators are generated for each case reducer function
export const { filterProductByCategories, filterProductByPrices, addCategoryCriteria, removeCategoryCriteria, getProductsByPage } = shopSlice.actions;

export default shopSlice.reducer;

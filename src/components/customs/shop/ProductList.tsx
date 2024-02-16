'use client';

import { useState } from 'react';
import Pagination from '../Pagination';
import ProductItem from '../product/ProductItem';
import { TProduct } from '@/types/product.types';

const products: TProduct[] = [
  {
    id: 1,
    name: 'Idea gear Headphone Max 23',
    price: 499,
    starRating: 4,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    price: 1299,
    starRating: 5,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/15-inch-macbook-air-2tb-midnight.png'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 228.3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 4,
    name: 'Apple Watch',
    price: 49.5,
    starRating: 2,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 5,
    name: 'Apple Watch',
    price: 500,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 6,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 7,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 8,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 9,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 10,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 11,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  },
  {
    id: 12,
    name: 'Apple Max Pro Plus+',
    price: 1023,
    starRating: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  }
];



const ProductList = () => {
  const [currentProducts, setCurrentProducts] = useState<TProduct[]>(products.slice(0, 10));

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            starRating={product.starRating}
          />
        ))}

        <section className="col-span-full">
          <Pagination
            itemsPerPage={10}
            items={products}
            setCurrentItems={setCurrentProducts}
          />
        </section>
      </section>
    </>
  );
};

export default ProductList;

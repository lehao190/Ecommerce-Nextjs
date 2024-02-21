'use client';

import { useState } from 'react';
import Pagination from '../Pagination';
import ProductItem from '../product/ProductItem';
import { TProduct } from '@/types/product.types';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const productItems = useSelector(
    (state: RootState) => state.shop.productItems
  );

  const [currentProducts, setCurrentProducts] = useState<TProduct[]>(
    productItems.slice(0, 8)
  );

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productItems.map((product, index) => (
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
            itemsPerPage={8}
            items={productItems}
            setCurrentItems={setCurrentProducts}
          />
        </section>
      </section>
    </>
  );
};

export default ProductList;

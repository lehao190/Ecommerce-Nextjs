'use client';

import { getProductsByPage } from '@/lib/redux/features/shop/shopSlice';
import Pagination from '../Pagination';
import ProductItem from '../product/ProductItem';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const productItems = useSelector(
    (state: RootState) => state.shop.productItems
  );

  const currentProductItems = useSelector(
    (state: RootState) => state.shop.currentProductItems
  );

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProductItems.map((product, index) => (
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
            itemsPerPage={4}
            items={productItems}
            getItemsByPage={getProductsByPage}
          />
        </section>
      </section>
    </>
  );
};

export default ProductList;

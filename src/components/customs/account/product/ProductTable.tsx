'use client';

import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../tables/DataTable';
import { productColumns } from './Columns';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { getProductsByPage } from '@/lib/redux/features/product-admin/productSlice';
import { useEffect } from 'react';

const ProductTable = () => {
  const productItems = useSelector((state: RootState) => state.product.productItems);
  const meta = useSelector((state: RootState) => state.product.meta);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(!productItems.length)
      dispatch(getProductsByPage(1));
  }, [])

  return (
    <DataTable meta={meta} columns={productColumns} data={productItems} getItemsByPage={getProductsByPage} />
  );
};

export default ProductTable;

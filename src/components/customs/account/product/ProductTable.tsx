'use client';

import { useSelector } from 'react-redux';
import DataTable from '../../tables/DataTable';
import { productColumns } from './Columns';
import { RootState } from '@/lib/redux/store';
import { getProductsByPage } from '@/lib/redux/features/product-admin/productSlice';

const ProductTable = () => {
  const productItems = useSelector((state: RootState) => state.product.productItems);

  return (
    <DataTable columns={productColumns} data={productItems} getItemsByPage={getProductsByPage} />
  );
};

export default ProductTable;

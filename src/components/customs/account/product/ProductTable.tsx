import DataTable from '../../tables/DataTable';
import { Product, productColumns } from './Columns';

const data: Product[] = [
  {
    id: '1',
    name: 'Random Product',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '2',
    name: 'Random Product',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '3',
    name: 'Random Product',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
  {
    id: '4',
    name: 'Random Product',
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png',
    price: 316.4,
    quantity: 8,
    createdAt: '19/11/1999',
  },
];

const ProductTable = () => {
  return (
    <DataTable columns={productColumns} data={data} />
  );
};

export default ProductTable;

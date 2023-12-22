import { Order, orderColumns } from './Columns';
import DataTable from '../../tables/DataTable';

const data: Order[] = [
  {
    id: 'heyman',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
    orderDate: '19/11/1999',
  },
  {
    id: 'wja',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
    orderDate: '19/11/1999',
  },
  {
    id: 'dad',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
    orderDate: '19/11/1999',
  },
  {
    id: 'Order 4',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
    orderDate: '19/11/1999',
  },
  {
    id: 'ORder 5',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
    orderDate: '19/11/1999',
  },
];

const OrderTable = () => {
  return (
    <DataTable columns={orderColumns} data={data} />
  );
};

export default OrderTable;

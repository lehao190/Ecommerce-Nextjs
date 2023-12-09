import FilterCheckbox from '@/components/customs/inputs/FilterCheckbox';
import ProductItem from '@/components/customs/product/ProductItem';
import { Separator } from '@/components/ui/separator';

type Props = {};

const products = [
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
  }
];

const checkboxes = [
  {
    text: 'Laptop',
    value: 'laptop',
    checked: true
  },
  {
    text: 'TV',
    value: 'tv',
    checked: false
  },
  {
    text: 'Clothes',
    value: 'clothes',
    checked: false
  },
  {
    text: 'Shoes',
    value: 'shoes',
    checked: true
  }
] as const;

const Shop = (props: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Our Products</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-64 lg:pr-12 pr-0 w-full">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Categories</h2>

            {checkboxes.map((checkbox, index) => (
              <FilterCheckbox
                key={index}
                checked={checkbox.checked}
                text={checkbox.text}
                value={checkbox.value}
              />
            ))}
          </div>

          <Separator className="my-4" />

          <div className="checkboxes space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Categories</h2>

            {checkboxes.map((checkbox, index) => (
              <FilterCheckbox
                key={index}
                checked={checkbox.checked}
                text={checkbox.text}
                value={checkbox.value}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductItem
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              starRating={product.starRating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

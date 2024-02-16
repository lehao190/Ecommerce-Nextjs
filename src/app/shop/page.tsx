import CustomCheckbox from '@/components/customs/inputs/CustomCheckbox';
import CustomRadioGroup from '@/components/customs/inputs/CustomRadioGroup';
import ProductList from '@/components/customs/shop/ProductList';
import { Separator } from '@/components/ui/separator';

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

const radioGroupItems = [
  {
    text: 'All',
    value: 'all'
  },
  {
    text: '< $200',
    value: 'SECOND_OPTION'
  },
  {
    text: '$200 ~ $1000',
    value: 'THIRD_OPTION'
  },
  {
    text: '> $1000',
    value: 'FOURTH_OPTION'
  }
];

const Shop = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10 text-primary">Our Products</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Filters section */}
        <section className="lg:w-64 lg:pr-12 pr-0 w-full mb-12">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Categories</h2>

            {checkboxes.map((checkbox, index) => (
              <CustomCheckbox
                key={index}
                checked={checkbox.checked}
                text={checkbox.text}
                value={checkbox.value}
              />
            ))}
          </div>

          <Separator className="my-4" />

          <div className="checkboxes space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Prices</h2>
            {
              <CustomRadioGroup
                defaultValue={radioGroupItems[0].value}
                radioGroupItems={radioGroupItems}
              />
            }
          </div>
        </section>

        {/* Product items section */}
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;

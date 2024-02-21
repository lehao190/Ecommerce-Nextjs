import CustomCheckbox from '@/components/customs/inputs/CustomCheckbox';
import CustomRadioGroup from '@/components/customs/inputs/CustomRadioGroup';
import ProductList from '@/components/customs/shop/ProductList';
import { Separator } from '@/components/ui/separator';
import { TProductCategory, TProductPriceFilter } from '../../types/product.types';
import { TCheckbox } from '@/types/inputs/checkbox.types';
import { TRadioItem } from '@/types/inputs/radio.types';

const checkboxes: TCheckbox[] = [
  {
    text: 'Electrics',
    value: 'ELECTRONICS',
    checked: false
  },
  {
    text: 'Accessories',
    value: 'ACCESSORIES',
    checked: false
  },
  {
    text: 'Clothes',
    value: 'CLOTHES',
    checked: false
  },
  {
    text: 'Shoes',
    value: 'SHOES',
    checked: false
  }
];

const radioGroupItems: TRadioItem[] = [
  {
    text: 'All',
    value: 'ALL'
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

let DEFAULT_RADIO_ITEM_FILTER: TProductPriceFilter = 'ALL';

type TUrlQuery = 'price_filter' | TProductCategory;

const Shop = ({
  searchParams
}: {
  searchParams: { [key in TUrlQuery]: 'true' | TProductPriceFilter | undefined };
}) => {
  // Mutate checkboxes values based on url queries
  checkboxes.map((checkbox) => {
    if(searchParams[checkbox.value]) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });

  // Mutate radio group value based on URL query
  if(searchParams && searchParams.price_filter != 'true' && searchParams.price_filter !== undefined) {
    DEFAULT_RADIO_ITEM_FILTER = searchParams.price_filter;
  } else {
    DEFAULT_RADIO_ITEM_FILTER = 'ALL';
  }

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
                defaultValue={DEFAULT_RADIO_ITEM_FILTER}
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

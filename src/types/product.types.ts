export type TProduct = {
  id: number;
  name: string;
  price: number;
  starRating?: number;
  image: string;
  category: TProductCategory;
};

export type TProductCategory = 'ELECTRONICS' | 'ACCESSORIES' | 'CLOTHES' | 'SHOES';

export type TProductPriceFilter = 'ALL' | 'SECOND_OPTION' | 'THIRD_OPTION' | 'FOURTH_OPTION';

import StarRating from '@/components/customs/product/StarRating';
import Image from 'next/image';
import QuantityControl from '@/components/customs/product/QuantityControl';
import CommentPagination from '@/components/customs/product/comment/CommentPagination';
import CommentForm from '@/components/customs/product/comment/CommentForm';
import { handleRequest } from '@/utils/handle-requests';
import { parse } from 'graphql';
import { gql } from 'graphql-request';

type Props = {
  params: {
    id: number;
  };
};

type TProductDetailsResponse = {
  getProductDetails: {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    ratings: number;
    image: string;
    comments: {
      id: string;
      text: string;
      rating: number;
    }[];
  };
};

const getProductDetails = async (id: number) => {
  const productDetailsQuery = parse(gql`
    query GetProductDetails($id: Int!) {
      getProductDetails(id: $id) {
        id
        name
        description
        price
        quantity
        category
        ratings
        image
        comments {
          id
          text
          rating
        }
      }
    }
  `);

  const [data, _] = await handleRequest<TProductDetailsResponse>(
    productDetailsQuery, 
    {
      id
    }
  );

  return data?.getProductDetails;
};

const Product = async ({ params }: Props) => {
  const data = await getProductDetails(+params.id);

  return (
    <div className="container mx-auto py-8">
      {/* Product details */}
      <section className="md:flex gap-8">
        <div className="grow max-w-[400px] h-[350px] relative mx-auto">
          <Image
            src={
              'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
            }
            alt="Product image"
            fill
            sizes="(max-width: 768px) 30vw, 33vw"
            priority
          />
        </div>

        <div className="sm:max-w-[480px] lg:max-w-[750px] mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold tracking-tight">
            { data?.name }
          </h2>
          <h3 className="text-2xl text-primary font-semibold tracking-tight my-1">
            ${ data?.price }
          </h3>

          <div className="flex items-center">
            <StarRating starRating={4} />
            <span className="ml-3 pt-1 text-sm text-gray-400">
              {10} Reviews
            </span>
          </div>

          <div className="my-3">
            { data?.description }
          </div>

          {/* Control the quantity of the product */}
          <QuantityControl />
        </div>
      </section>

      <div className="font-bold text-xl mt-8 mb-4">SUBMIT YOUR REVIEW</div>

      {/* Reviews Form */}
      <section className="max-w-[400px]">
        <CommentForm />
      </section>

      <div className="font-bold text-xl mt-8 mb-4">REVIEWS</div>

      {/* User Reviews */}
      <CommentPagination />
    </div>
  );
};

export default Product;

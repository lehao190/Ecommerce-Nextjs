import StarRating from '@/components/customs/product/StarRating';
import Image from 'next/image';
import QuantityControl from '@/components/customs/product/QuantityControl';
import CommentPagination from '@/components/customs/product/comment/CommentPagination';
import CommentForm from '@/components/customs/product/comment/CommentForm';

type Props = {
  params: {
    id: string;
  };
};

const Product = ({ params }: Props) => {
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
            Zip Tote Basket
          </h2>
          <h3 className="text-2xl text-primary font-semibold tracking-tight my-1">
            $314
          </h3>

          <div className="flex items-center">
            <StarRating starRating={4} />
            <span className="ml-3 pt-1 text-sm text-gray-400">
              {10} Reviews
            </span>
          </div>

          <div className="my-3">
            The Zip Tote Basket is the perfect midpoint between shopping tote
            and comfy backpack. With convertible straps, you can hand carry,
            should sling, or backpack this convenient and spacious bag. The zip
            top and durable canvas construction keeps your goods protected for
            all-day use.
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

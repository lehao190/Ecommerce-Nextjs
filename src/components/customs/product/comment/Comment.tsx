
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from '../StarRating';

type Props = {};

const Comment = (props: Props) => {
  return (
    <div className="flex">
      <Avatar className="h-[40px] w-[40px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-inherit">NO</AvatarFallback>
      </Avatar>

      <div className="ml-2">
        <h6 className="text-md font-semibold">Your Name</h6>
        <p className="text-sm text-gray-400">19/12/2023</p>
        <div className="mt-1">
          <StarRating starRating={5} />
        </div>
        <div className="text-sm">
          Blown away by how polished this icon pack is. Everything looks so
          consistent and each SVG is optimized out of the box so I can use it
          directly with confidence. It would take me several hours to create a
          single icon this good, so it's a steal at this price.
        </div>
      </div>
    </div>
  );
};

export default Comment;

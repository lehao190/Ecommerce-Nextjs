import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from '../StarRating';
import { TComment } from '@/types/comment.types';

type Props = {
  comment: TComment;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className="flex">
      <Avatar className="h-[40px] w-[40px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-inherit">NO</AvatarFallback>
      </Avatar>

      <div className="ml-2">
        <h6 className="text-md font-semibold">{ comment.username }</h6>
        <p className="text-sm text-gray-400">{ comment.created_At }</p>
        <div className="mt-1">
          <StarRating starRating={comment.starRatings} />
        </div>
        <div className="text-sm">
          { comment.body }
        </div>
      </div>
    </div>
  );
};

export default Comment;

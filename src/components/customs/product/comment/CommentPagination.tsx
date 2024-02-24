'use client';

import Comment from './Comment';
import Pagination from '../../Pagination';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import { getCommentsByPage } from '@/lib/redux/features/comment/commentSlice';


const CommentPagination = () => {
  const comments = useSelector(
    (state: RootState) => state.comment.comments,
  );

  const currentComments = useSelector(
    (state: RootState) => state.comment.currentComments,
  );

  return (
    <>
      <section className="max-w-[1000px] flex flex-col gap-10">
        {currentComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </section>

      <section>
        <Pagination
          itemsPerPage={2}
          items={comments}
          getItemsByPage={getCommentsByPage}
        />
      </section>
    </>
  )
}

export default CommentPagination
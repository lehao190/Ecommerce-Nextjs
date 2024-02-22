'use client';

import React, { useState } from 'react'
import Comment from './Comment';
import Pagination from '../../Pagination';
import { TComment } from '@/types/comment.types';

const comments: TComment[] = [
  {
    id: 1,
    username: 'John Doe',
    created_At: '19/12/2023',
    starRatings: 4,
    body: 'Blown away by how polished this icon pack is.'
  },
  {
    id: 2,
    username: 'Josh Fluke',
    created_At: '12/1/2024',
    starRatings: 4,
    body: 'Blown away by how polished this icon pack is.'
  },
  {
    id: 3,
    username: 'Ricky',
    created_At: '5/11/2023',
    starRatings: 4,
    body: 'Blown away by how polished this icon pack is.'
  },
  {
    id: 4,
    username: 'Alam adam',
    created_At: '19/12/2023',
    starRatings: 4,
    body: 'Blown away by how polished this icon pack is.'
  }
];

const CommentPagination = () => {
  const [currentComments, setCurrentComments] = useState<TComment[]>(
    comments.slice(0, 2)
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
          setCurrentItems={setCurrentComments}
        />
      </section>
    </>
  )
}

export default CommentPagination
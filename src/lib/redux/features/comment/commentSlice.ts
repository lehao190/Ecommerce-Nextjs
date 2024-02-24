import { TComment } from '@/types/comment.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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

type TCommentState = {
  comments: TComment[];
  currentComments: TComment[];
};

const initialState: TCommentState = {
  comments,
  currentComments: comments.slice(0, 2)
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getCommentsByPage: (state, action: PayloadAction<{ startOffSet: number, endOffset: number }>) => {
      state.currentComments = comments.slice(action.payload.startOffSet, action.payload.endOffset);
    },

    // Add product item to cart
    createComment: (state, action: PayloadAction<string>) => {
      
    },
  }
});

// Action creators are generated for each case reducer function
export const { createComment, getCommentsByPage } = commentSlice.actions;

export default commentSlice.reducer;

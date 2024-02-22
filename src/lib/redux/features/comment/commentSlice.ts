import { TComment } from '@/types/comment.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TCommentState = {
  comments: TComment[];
};

const initialState: TCommentState = {
  comments: []
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    // Add product item to cart
    createComment: (state, action: PayloadAction<string>) => {
      
    },
  }
});

// Action creators are generated for each case reducer function
export const { createComment } = commentSlice.actions;

export default commentSlice.reducer;

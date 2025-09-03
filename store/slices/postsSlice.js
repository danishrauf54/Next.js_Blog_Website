import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  total: 0,
  selected: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.posts;
      state.total = action.payload.total;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPostRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
      state.selected = null;
    },
    fetchPostSuccess: (state, action) => {
      state.loading = false;
      state.selected = action.payload;
    },
    fetchPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
  fetchPostRequest, fetchPostSuccess, fetchPostFailure
} = postsSlice.actions;

export default postsSlice.reducer;

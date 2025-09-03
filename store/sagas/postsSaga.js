import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPostsService, fetchPostByIdService } from '@/services/postService';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
         fetchPostRequest, fetchPostSuccess, fetchPostFailure } from '../slices/postsSlice';

function* handleFetchPosts({ payload }) {
  try {
    const data = yield call(fetchPostsService, payload);
    yield put(fetchPostsSuccess(data));
  } catch (err) {
    yield put(fetchPostsFailure(err.message));
  }
}

function* handleFetchPost({ payload }) {
  try {
    const data = yield call(fetchPostByIdService, payload);
    yield put(fetchPostSuccess(data));
  } catch (err) {
    yield put(fetchPostFailure(err.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
  yield takeLatest(fetchPostRequest.type, handleFetchPost);
}

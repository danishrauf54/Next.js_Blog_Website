import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });

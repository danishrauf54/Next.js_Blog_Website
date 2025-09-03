import api from '@/utils/api';

export const fetchPostsService = async (params = { limit: 10, skip: 0 }) => {
  const res = await api.get('/posts', { params });
  return res.data;
};

export const fetchPostByIdService = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

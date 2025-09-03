import api from '@/utils/api';

export const loginService = async (payload) => {
  const res = await api.post('/auth/login', payload);
  return res.data;
};

export const logoutService = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

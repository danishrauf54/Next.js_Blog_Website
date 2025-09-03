import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '@/store/slices/postsSlice';
import Loader from '@/components/Loader';
import { SeoHead } from '@/utils/helpers';

const ItemList = dynamic(() => import('@/components/ItemList'));

export default function BlogList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest({ limit: 10, skip: 0 }));
  }, [dispatch]);

  return (
    <>
      <SeoHead title="Blog" description="All posts" />
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      {loading && <Loader label="Fetching posts..." />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <ItemList items={list} />}
    </>
  );
}

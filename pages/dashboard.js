// pages/dashboard.js
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Loader from '@/components/Loader';
import { SeoHead } from '@/utils/helpers';
import { fetchPostsRequest } from '@/store/slices/postsSlice';

export default function Dashboard({ user, stats }) {
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((s) => s.posts);

  // Fetch recent posts via Redux-Saga
  useEffect(() => {
    dispatch(fetchPostsRequest({ limit: 5, skip: 0 }));
  }, [dispatch]);

  return (
    <>
      <SeoHead title="Dashboard" description="Your private dashboard." />

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="sticky card h-max top-24">
          <nav className="grid gap-2 text-sm">
            <a className="hover:underline" href="#overview">Overview</a>
            <a className="hover:underline" href="#stats">Stats</a>
            <a className="hover:underline" href="#recent">Recent Posts</a>
          </nav>
        </aside>

        {/* Main */}
        <section className="grid gap-6">
          {/* Overview */}
          <Card id="overview">
            <h1 className="mb-2 text-2xl font-bold">
              Welcome{user ? `, ${user.username}` : ''}!
            </h1>
            <p className="text-gray-700">This is your private dashboard.</p>
          </Card>

          {/* Stats */}
          <Card id="stats">
            <h2 className="mb-3 text-xl font-semibold">Content stats</h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <li className="flex flex-col items-start gap-1 card">
                <span className="text-sm text-gray-500">Total posts</span>
                <span className="text-2xl font-bold">{stats?.total ?? 0}</span>
              </li>
              <li className="flex flex-col items-start gap-1 card">
                <span className="text-sm text-gray-500">Sample author</span>
                <span className="text-lg font-semibold">
                  {stats?.sampleAuthor || '—'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Recent posts */}
          <Card id="recent">
            <h2 className="mb-3 text-xl font-semibold">Recent posts</h2>

            {loading && <Loader label="Loading recent posts..." />}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
              <ul className="divide-y divide-gray-100">
                {posts?.slice(0, 5)?.map((p) => (
                  <li key={p.id} className="py-3">
                    {/* Pass ?from=dashboard so BlogDetail knows context */}
                    <Link className="link" href={`/blog/${p.id}?from=dashboard`}>
                      {p.title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {p.body}
                    </p>
                  </li>
                ))}
                {!posts?.length && (
                  <li className="py-3 text-gray-500">No posts found.</li>
                )}
              </ul>
            )}
          </Card>
        </section>
      </div>
    </>
  );
}

/**
 * Protected with SSR:
 * - Checks for `token` cookie; redirects to /login if missing.
 * - Fetches initial stats server-side from DummyJSON.
 */
export async function getServerSideProps({ req }) {
  const cookieHeader = req.headers.cookie || '';
  const tokenPair = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('token='));

  if (!tokenPair) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  // In your API, token stores username directly.
  const username =
    decodeURIComponent(tokenPair.split('=').slice(1).join('=')) || 'user';

  // Server-side stats from DummyJSON
  const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
  const r = await fetch(`${base}/posts?limit=10`);
  const data = await r.json();

  const stats = {
    total: data?.total || data?.posts?.length || 0,
    sampleAuthor:
      data?.posts?.[0]?.userId ? `User #${data.posts[0].userId}` : null,
  };

  return {
    props: {
      user: { username },
      stats,
    },
  };
}

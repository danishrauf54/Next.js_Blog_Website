import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SeoHead } from '@/utils/helpers';

const ItemList = dynamic(() => import('@/components/ItemList'), {
  loading: () => <p>Loading posts…</p>,
});

export default function Home({ posts }) {
  return (
    <>
      <SeoHead title="Home" description="Welcome to a modern Next.js blog with Redux-Saga." />
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Build. Write. Share.</h1>
          <p className="text-gray-600 mb-6">
            A clean, fast, and modern blog powered by Next.js, Redux Toolkit, and Redux-Saga.
          </p>
          <div className="flex items-center gap-3">
            <Link className="btn-primary" href="/blog">Explore Blog</Link>
            <Link className="btn-outline" href="/about">Learn More</Link>
          </div>
        </div>
        <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-sm">
          <Image src="/images/cover.svg" alt="Cover" fill className="object-cover"/>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Latest posts</h2>
        <ItemList items={posts?.posts || []} />
      </section>
    </>
  );
}

export async function getServerSideProps() {
  // SSR: fetch from DummyJSON directly to seed the page
  const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
  const res = await fetch(`${base}/posts?limit=6`);
  const posts = await res.json();
  return { props: { posts } };
}

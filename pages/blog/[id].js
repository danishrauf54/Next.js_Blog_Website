// pages/blog/[id].js
import { SeoHead } from '@/utils/helpers';
import Card from '@/components/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogDetail({ post }) {
  const router = useRouter();
  const from = router.query.from || 'blog'; // default: blog

  if (!post) {
    return <p className="mt-10 text-center text-gray-600">Post not found</p>;
  }

  return (
    <>
      <SeoHead title={post.title} description={post.body?.slice(0, 140)} />
      <Card>
        <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>
        <p className="leading-relaxed text-gray-700">{post.body}</p>

        {/* Back link changes based on where user came from */}
        <div className="mt-6">
          <Link
            className="text-blue-600 hover:underline"
            href={from === 'dashboard' ? '/dashboard' : '/blog'}
          >
            ← Back to {from === 'dashboard' ? 'Dashboard' : 'Blog'}
          </Link>
        </div>
      </Card>
    </>
  );
}

export async function getStaticPaths() {
  const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
  const res = await fetch(`${base}/posts?limit=10`);
  const data = await res.json();
  const paths = (data.posts || []).map((p) => ({ params: { id: String(p.id) } }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
  const res = await fetch(`${base}/posts/${params.id}`);
  if (!res.ok) return { notFound: true, revalidate: 60 };

  const post = await res.json();
  return { props: { post }, revalidate: 60 };
}

import Link from 'next/link';
import Card from '@/components/Card';
import { truncate } from '@/utils/helpers';

export default function ItemList({ items = [] }) {
  if (!items?.length) return <p className="text-gray-500">No posts found.</p>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((p) => (
        <Card key={p.id}>
          <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
          <p className="text-gray-700 mb-4">{truncate(p.body, 160)}</p>
          <Link className="link" href={`/blog/${p.id}`}>Read more</Link>
        </Card>
      ))}
    </div>
  );
}

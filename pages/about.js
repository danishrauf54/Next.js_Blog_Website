import { SeoHead } from '@/utils/helpers';
import Card from '@/components/Card';

export default function About() {
  return (
    <>
      <SeoHead title="About" description="About this example blog." />
      <Card>
        <h1 className="text-2xl font-bold mb-3">About</h1>
        <p className="text-gray-700">
          This blog demonstrates a clean Next.js architecture with Redux Toolkit and Redux-Saga,
          featuring SSR, SSG, API Routes, protected routes, and modular components styled with Tailwind CSS.
        </p>
      </Card>
    </>
  );
}

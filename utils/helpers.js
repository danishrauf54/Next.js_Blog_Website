import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';

/** Simple text utility */
export const truncate = (str = '', n = 140) => {
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + '…';
};

/** SEO Helper */
export const SeoHead = ({ title, description }) => (
  <Head>
    <title>{title ? title + ' | ' : ''}{process.env.NEXT_PUBLIC_SITE_NAME}</title>
    <meta name="description" content={description || 'A modern Next.js blog'} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content={title || 'Blog'} />
    <meta property="og:description" content={description || 'A modern Next.js blog'} />
    <meta property="og:type" content="website" />
  </Head>
);

/** Client-side route protection using auth state */
export const useAuthGuard = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  useEffect(() => {
    // On client, if not authed, push to login
    if (isAuthenticated === false) router.replace('/login');
  }, [isAuthenticated, router]);
  return isAuthenticated;
};

/** HOC for client-side guard */
export const withAuth = (Component) => {
  return function Guarded(props) {
    useAuthGuard();
    return <Component {...props} />;
  };
};

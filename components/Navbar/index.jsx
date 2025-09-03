import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@/components/Button';
import { logoutRequest } from '@/store/slices/authSlice';

export default function Navbar() {
  const { isAuthenticated, user, loading } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <nav className="container flex items-center justify-between max-w-6xl py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">MyBlog</Link>
          <div className="items-center hidden gap-4 text-sm md:flex">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hi, {user?.username}</span>
              <Button
                variant="outline"
                onClick={() => dispatch(logoutRequest())}
                disabled={loading}
              >
                {loading ? '...' : 'Logout'}
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

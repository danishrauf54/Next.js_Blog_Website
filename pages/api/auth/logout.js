import cookie from 'cookie';

export default function handler(_req, res) {
  // Clear the cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  }));
  return res.status(200).json({ message: 'Logged out' });
}

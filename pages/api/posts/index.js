export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { limit = 10, skip = 0 } = req.query;
    const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
    const r = await fetch(`${base}/posts?limit=${limit}&skip=${skip}`);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

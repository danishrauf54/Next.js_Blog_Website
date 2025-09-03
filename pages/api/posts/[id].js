export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const base = process.env.DUMMYJSON_BASE || 'https://dummyjson.com';
    const r = await fetch(`${base}/posts/${id}`);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ message: data?.message || 'Not found' });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

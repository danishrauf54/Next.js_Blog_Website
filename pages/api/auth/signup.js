import { serialize } from "cookie";

let users = global.users || [];
global.users = users;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existing = users.find((u) => u.username === username);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.setHeader(
      "Set-Cookie",
      serialize("token", username, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
      })
    );

    return res.status(200).json({ message: "Signup successful" });
  }
  res.status(405).end();
}

import { serialize } from "cookie";

let users = global.users || [];
global.users = users;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.setHeader(
      "Set-Cookie",
      serialize("token", username, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
      })
    );

    return res.status(200).json({ message: "Login successful" });
  }
  res.status(405).end();
}

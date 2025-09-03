import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-lg shadow-lg w-96"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg"
        >
          Sign In
        </button>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="p-8 bg-white rounded-lg shadow-lg w-96"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>
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
          className="w-full py-2 text-white bg-green-500 rounded-lg"
        >
          Sign Up
        </button>

        {/* 👇 Added this section */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

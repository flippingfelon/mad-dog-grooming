"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard/calendar";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Wrong password — try again");
      setLoading(false);
      return;
    }

    router.push(from);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/logo.jpeg"
            alt="Mad Dog Grooming"
            width={80}
            height={80}
            className="mx-auto rounded-full shadow-lg"
          />
          <h1 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-brown">
            Mad Dog Grooming
          </h1>
          <p className="mt-1 text-sm text-brown/50">Sign in to your schedule</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-gold-light/30 bg-warm-white p-6 shadow-sm">
          {error && (
            <p className="mb-4 rounded-lg bg-red/10 px-3 py-2 text-center text-sm font-medium text-red">
              {error}
            </p>
          )}

          <label className="mb-1.5 block text-xs font-semibold text-brown/60 uppercase tracking-wide">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            placeholder="Enter your password"
            className="mb-5 w-full rounded-lg border border-gold-light/40 bg-cream/30 px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-xl bg-gold py-3 text-sm font-bold text-white shadow-md hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center">
          <a href="/" className="text-sm text-brown/40 hover:text-gold-dark transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}

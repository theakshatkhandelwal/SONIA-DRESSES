"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setBusy(false);

    if (result?.ok) {
      window.location.assign("/admin");
      return;
    }
    setError(
      result?.error === "CredentialsSignin" || !result?.error
        ? "Wrong email or password."
        : String(result.error)
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-zinc-600 hover:text-zinc-900">
        <Image src="/sd.jpeg" alt="" width={36} height={36} className="rounded-full" />
        <span className="text-sm font-semibold">← Back to store</span>
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-xl font-bold text-zinc-900">Admin</h1>
        <p className="mt-1 text-center text-sm text-zinc-500">Sign in to manage products</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-email" className="sr-only">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none ring-zinc-400 focus:ring-2"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="sr-only">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none ring-zinc-400 focus:ring-2"
              required
            />
          </div>
          {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

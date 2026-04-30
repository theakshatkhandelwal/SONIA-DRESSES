"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      // Full navigation so the JWT cookie is sent and useSession() sees you on /admin (App Router + client session).
      window.location.assign("/admin");
      return;
    }
    setError(
      result?.error === "CredentialsSignin" || !result?.error
        ? "Invalid login — use the same email/password as ADMIN_EMAIL / ADMIN_PASSWORD in Vercel."
        : String(result.error)
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-sm space-y-3 rounded-xl border bg-white p-6">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input
        type="email"
        placeholder="Admin email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="w-full rounded-lg bg-black py-2 text-white">Login</button>
    </form>
  );
}

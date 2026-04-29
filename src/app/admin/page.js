"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CATEGORIES, SUBCATEGORIES, SIZES } from "@/lib/constants";

const initial = {
  name: "",
  category: "Men",
  subcategory: "Upper wear",
  description: "",
  price: 0,
  compareAtPrice: "",
  stock: 10,
  sizes: ["M"],
  images: [],
  featured: false,
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initial);
  const [imageFile, setImageFile] = useState(null);

  async function loadData() {
    const [pRes, oRes] = await Promise.all([fetch("/api/products"), fetch("/api/orders")]);
    if (pRes.ok) setProducts(await pRes.json());
    if (oRes.ok) setOrders(await oRes.json());
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      const [pRes, oRes] = await Promise.all([fetch("/api/products"), fetch("/api/orders")]);
      if (pRes.ok) setProducts(await pRes.json());
      if (oRes.ok) setOrders(await oRes.json());
    })();
  }, [status]);

  async function uploadImage() {
    if (!imageFile) return null;
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(imageFile);
    });
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 }),
    });
    const data = await res.json();
    return data.url;
  }

  async function addProduct(e) {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const rawCompare = form.compareAtPrice;
    const compareNum =
      rawCompare === "" || rawCompare == null ? undefined : Number(rawCompare);
    const { compareAtPrice: _drop, ...rest } = form;
    const payload = {
      ...rest,
      images: imageUrl ? [imageUrl] : [],
      ...(compareNum !== undefined && !Number.isNaN(compareNum) ? { compareAtPrice: compareNum } : {}),
    };
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm(initial);
      setImageFile(null);
      loadData();
    }
  }

  async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) loadData();
  }

  async function updateOrderStatus(id, status) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) loadData();
  }

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please login at /admin/login</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={() => signOut()} className="rounded-lg bg-zinc-800 px-3 py-2 text-white">
          Logout
        </button>
      </div>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Add Product</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={addProduct}>
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Product name" required />
          <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} placeholder="Price" required />
          <input
            type="number"
            min={0}
            value={form.compareAtPrice}
            onChange={(e) => setForm((p) => ({ ...p, compareAtPrice: e.target.value }))}
            placeholder="Compare at (optional, for sale badge)"
          />
          <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={form.subcategory} onChange={(e) => setForm((p) => ({ ...p, subcategory: e.target.value }))}>
            {SUBCATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={form.sizes[0]} onChange={(e) => setForm((p) => ({ ...p, sizes: [e.target.value] }))}>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input type="number" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))} placeholder="Stock" />
          <textarea className="md:col-span-2" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" required />
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
            Featured product
          </label>
          <button className="rounded-lg bg-black px-4 py-2 text-white md:col-span-2">Save Product</button>
        </form>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Products</h2>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-zinc-500">
                  {p.category} | Rs {p.price}
                </p>
              </div>
              <button onClick={() => deleteProduct(p._id)} className="text-sm text-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Orders</h2>
        <div className="space-y-2">
          {orders.map((o) => (
            <div key={o._id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {o.customerName} - Rs {o.totalAmount}
                </p>
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                  className="max-w-44"
                >
                  {["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-zinc-500">{o.phone}</p>
              <p className="text-xs text-zinc-500">{o.address}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

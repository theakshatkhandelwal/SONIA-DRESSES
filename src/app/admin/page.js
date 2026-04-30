"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

async function uploadFileToCloudinary(file) {
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: base64 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url;
}

function sortSizesSelected(arr) {
  return [...arr].sort((a, b) => SIZES.indexOf(a) - SIZES.indexOf(b));
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initial);
  const [imageFiles, setImageFiles] = useState([]);

  async function loadData() {
    const [pRes, oRes] = await Promise.all([fetch("/api/products"), fetch("/api/orders")]);
    if (pRes.ok) setProducts(await pRes.json());
    if (oRes.ok) setOrders(await oRes.json());
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    loadData();
  }, [status]);

  function toggleSize(s) {
    setForm((p) => {
      const has = p.sizes.includes(s);
      const next = has ? p.sizes.filter((x) => x !== s) : [...p.sizes, s];
      return { ...p, sizes: sortSizesSelected(next) };
    });
  }

  async function addProduct(e) {
    e.preventDefault();
    if (form.sizes.length === 0) {
      toast.error("Select at least one size.");
      return;
    }
    if (imageFiles.length === 0) {
      toast.error("Add at least one product image (you can select multiple).");
      return;
    }

    const urls = [];
    try {
      for (const file of imageFiles) {
        const url = await uploadFileToCloudinary(file);
        if (url) urls.push(url);
      }
    } catch (err) {
      toast.error(err?.message || "Image upload failed.");
      return;
    }

    if (urls.length === 0) {
      toast.error("No images uploaded successfully.");
      return;
    }

    const rawCompare = form.compareAtPrice;
    const compareNum =
      rawCompare === "" || rawCompare == null ? undefined : Number(rawCompare);
    const { compareAtPrice: _drop, images: _img, ...rest } = form;
    const payload = {
      ...rest,
      images: urls,
      ...(compareNum !== undefined && !Number.isNaN(compareNum) ? { compareAtPrice: compareNum } : {}),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Product saved.");
      setForm(initial);
      setImageFiles([]);
      loadData();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Could not save product.");
    }
  }

  async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.message("Product removed.");
      loadData();
    }
  }

  async function toggleFeatured(product) {
    const res = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !product.featured }),
    });
    if (res.ok) {
      toast.success(product.featured ? "Removed from featured." : "Marked featured.");
      loadData();
    }
  }

  async function updateOrderStatus(id, orderStatus) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: orderStatus }),
    });
    if (res.ok) loadData();
  }

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    return (
      <div className="mx-auto max-w-md space-y-3 rounded-xl border bg-white p-6 text-center">
        <p className="text-zinc-800">Sign in to manage products and orders.</p>
        <Link
          href="/admin/login"
          className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Go to admin login
        </Link>
        <p className="text-xs text-zinc-500">
          Use the same email and password as <code className="rounded bg-zinc-100 px-1">ADMIN_EMAIL</code> and{" "}
          <code className="rounded bg-zinc-100 px-1">ADMIN_PASSWORD</code> in Vercel, then redeploy if you changed them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button type="button" onClick={() => signOut()} className="rounded-lg bg-zinc-800 px-3 py-2 text-white">
          Logout
        </button>
      </div>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Add product</h2>
        <p className="mb-4 text-sm text-zinc-600">
          Upload <strong>multiple photos</strong> (gallery on the product page). Tick <strong>Featured</strong> to show on the home “Featured” section. Pick one or more <strong>sizes</strong>.
        </p>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={addProduct}>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Product name"
            required
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
            placeholder="Price"
            required
          />
          <input
            type="number"
            min={0}
            value={form.compareAtPrice}
            onChange={(e) => setForm((p) => ({ ...p, compareAtPrice: e.target.value }))}
            placeholder="Compare at (optional, for sale badge)"
          />
          <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select value={form.subcategory} onChange={(e) => setForm((p) => ({ ...p, subcategory: e.target.value }))}>
            {SUBCATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))}
            placeholder="Stock"
          />
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Sizes (multi-select)</p>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.sizes.includes(s)} onChange={() => toggleSize(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <textarea
            className="md:col-span-2"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            required
          />
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-1"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
            <p className="mt-1 text-xs text-zinc-500">
              {imageFiles.length ? `${imageFiles.length} file(s) selected — first image is the default card thumbnail.` : "Select one or more images."}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
            Featured on homepage
          </label>
          <button type="submit" className="rounded-lg bg-black px-4 py-2 text-white md:col-span-2">
            Save product
          </button>
        </form>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Products ({products.length})</h2>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
              <div>
                <p className="font-medium">
                  {p.name}{" "}
                  {p.featured && (
                    <span className="ml-2 rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-pink-800">
                      Featured
                    </span>
                  )}
                </p>
                <p className="text-xs text-zinc-500">
                  {p.category} | Rs {p.price} | {(p.images || []).length} image(s)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeatured(p)}
                  className="rounded-lg border border-zinc-300 px-3 py-1 text-xs font-semibold hover:bg-zinc-50"
                >
                  {p.featured ? "Unfeature" : "Feature"}
                </button>
                <button type="button" onClick={() => deleteProduct(p._id)} className="text-sm text-red-600 hover:underline">
                  Delete
                </button>
              </div>
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
                  {o.customerName} — Rs {o.totalAmount}
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

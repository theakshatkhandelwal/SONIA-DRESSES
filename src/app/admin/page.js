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
  const raw = await res.text();
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error(raw.slice(0, 120) || "Upload failed (invalid response)");
  }
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
  const [editForm, setEditForm] = useState(null);
  const [editNewFiles, setEditNewFiles] = useState([]);
  const [editSaving, setEditSaving] = useState(false);

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

  function openEdit(p) {
    setEditForm({
      _id: p._id,
      name: p.name,
      description: p.description || "",
      price: p.price,
      stock: p.stock,
      compareAtPrice: p.compareAtPrice != null && p.compareAtPrice !== "" ? String(p.compareAtPrice) : "",
      featured: Boolean(p.featured),
      images: [...(p.images || [])],
      category: p.category,
      subcategory: p.subcategory,
      sizes: [...(p.sizes || ["M"])],
    });
    setEditNewFiles([]);
  }

  function closeEdit() {
    setEditForm(null);
    setEditNewFiles([]);
    setEditSaving(false);
  }

  function toggleEditSize(s) {
    setEditForm((prev) => {
      if (!prev) return prev;
      const has = prev.sizes.includes(s);
      const next = has ? prev.sizes.filter((x) => x !== s) : [...prev.sizes, s];
      return { ...prev, sizes: sortSizesSelected(next) };
    });
  }

  function removeEditImage(index) {
    setEditForm((prev) => {
      if (!prev) return prev;
      const images = prev.images.filter((_, i) => i !== index);
      return { ...prev, images };
    });
  }

  async function saveEdit(e) {
    e.preventDefault();
    if (!editForm) return;
    if (editForm.sizes.length === 0) {
      toast.error("Select at least one size.");
      return;
    }
    if (editForm.images.length === 0 && editNewFiles.length === 0) {
      toast.error("Keep at least one image, or add new photos.");
      return;
    }

    setEditSaving(true);
    const newUrls = [];
    try {
      for (const file of editNewFiles) {
        const url = await uploadFileToCloudinary(file);
        if (url) newUrls.push(url);
      }
    } catch (err) {
      setEditSaving(false);
      toast.error(err?.message || "Image upload failed.");
      return;
    }

    const images = [...editForm.images, ...newUrls];
    if (images.length === 0) {
      setEditSaving(false);
      toast.error("At least one image is required.");
      return;
    }

    const payload = {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      featured: editForm.featured,
      images,
      category: editForm.category,
      subcategory: editForm.subcategory,
      sizes: editForm.sizes,
    };
    if (editForm.compareAtPrice === "" || editForm.compareAtPrice == null) {
      payload.compareAtPrice = "";
    } else {
      const n = Number(editForm.compareAtPrice);
      payload.compareAtPrice = Number.isNaN(n) ? "" : n;
    }

    const res = await fetch(`/api/products/${editForm._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditSaving(false);

    if (res.ok) {
      toast.success("Product updated.");
      closeEdit();
      loadData();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Could not update product.");
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

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-zinc-600">
        <p>Loading…</p>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mx-auto max-w-md space-y-3 rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
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
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
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
                  onClick={() => openEdit(p)}
                  className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white hover:bg-zinc-800"
                >
                  Edit
                </button>
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

      {editForm ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-product-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <h2 id="edit-product-title" className="text-lg font-semibold">
                Edit product
              </h2>
              <button type="button" onClick={closeEdit} className="rounded-lg px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100">
                Close
              </button>
            </div>
            <form className="mt-4 grid gap-3" onSubmit={saveEdit}>
              <input
                value={editForm.name}
                onChange={(e) => setEditForm((f) => (f ? { ...f, name: e.target.value } : f))}
                placeholder="Product name"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
              <textarea
                rows={3}
                value={editForm.description}
                onChange={(e) => setEditForm((f) => (f ? { ...f, description: e.target.value } : f))}
                placeholder="Description"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-500">Price (Rs)</label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.price}
                    onChange={(e) => setEditForm((f) => (f ? { ...f, price: Number(e.target.value) } : f))}
                    className="mt-0.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.stock}
                    onChange={(e) => setEditForm((f) => (f ? { ...f, stock: Number(e.target.value) } : f))}
                    className="mt-0.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-500">Compare at (optional)</label>
                <input
                  type="number"
                  min={0}
                  value={editForm.compareAtPrice}
                  onChange={(e) => setEditForm((f) => (f ? { ...f, compareAtPrice: e.target.value } : f))}
                  placeholder="Leave empty to clear"
                  className="mt-0.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-500">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm((f) => (f ? { ...f, category: e.target.value } : f))}
                    className="mt-0.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Subcategory</label>
                  <select
                    value={editForm.subcategory}
                    onChange={(e) => setEditForm((f) => (f ? { ...f, subcategory: e.target.value } : f))}
                    className="mt-0.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                  >
                    {SUBCATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input type="checkbox" checked={editForm.sizes.includes(s)} onChange={() => toggleEditSize(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(e) => setEditForm((f) => (f ? { ...f, featured: e.target.checked } : f))}
                />
                Featured on homepage
              </label>
              <div>
                <p className="mb-2 text-xs font-semibold text-zinc-500">Images</p>
                <div className="flex flex-wrap gap-2">
                  {editForm.images.map((url, i) => (
                    <div key={`${url}-${i}`} className="relative h-16 w-16 overflow-hidden rounded-lg border bg-zinc-100">
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeEditImage(i)}
                        className="absolute right-0 top-0 rounded-bl bg-red-600 px-1 text-[10px] font-bold text-white"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="mt-2 text-sm"
                  onChange={(e) => setEditNewFiles(Array.from(e.target.files || []))}
                />
                <p className="mt-1 text-xs text-zinc-500">
                  {editNewFiles.length
                    ? `${editNewFiles.length} new file(s) will upload on save.`
                    : "Add more images (optional). Requires Cloudinary on the server."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  disabled={editSaving}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {editSaving ? "Saving…" : "Save changes"}
                </button>
                <button type="button" onClick={closeEdit} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

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

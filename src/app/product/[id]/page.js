"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [size, setSize] = useState("M");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          setLoadError(data.error);
          return;
        }
        setProduct(data);
        if (data?.sizes?.[0]) setSize(data.sizes[0]);
      })
      .catch(() => setLoadError("Unable to load product"));
  }, [params.id]);

  if (loadError) return <p className="text-sm text-rose-600">{loadError}</p>;
  if (!product) return <p>Loading...</p>;

  const compareAt = product.compareAtPrice;
  const salePct =
    compareAt != null && compareAt > product.price
      ? Math.round(((compareAt - product.price) / compareAt) * 100)
      : null;

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md">
        <Image
          src={product.images?.[0] || "https://placehold.co/600x800?text=No+Image"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{product.category}</p>
        <h1 className="text-3xl font-black leading-tight text-zinc-900">{product.name}</h1>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl font-bold text-pink-600">Rs {product.price}</span>
          {compareAt != null && compareAt > product.price && (
            <>
              <span className="text-lg text-zinc-400 line-through">Rs {compareAt}</span>
              {salePct != null && (
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  {salePct}% off
                </span>
              )}
            </>
          )}
        </div>
        <p className="text-sm text-zinc-600">{product.description}</p>
        <div>
          <p className="mb-2 text-sm font-medium">Select Size</p>
          <div className="flex gap-2">
            {product.sizes?.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-md border px-3 py-1 text-sm ${size === s ? "bg-black text-white" : "bg-white"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          onClick={() =>
            addToCart({
              productId: product._id,
              name: product.name,
              image: product.images?.[0],
              size,
              price: product.price,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const NEW_MS = 14 * 24 * 60 * 60 * 1000;

function salePercent(price, compareAt) {
  if (compareAt == null || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

function isNewArrival(createdAt) {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < NEW_MS;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const size = product.sizes?.[0] || "M";
  const inStock = (product.stock ?? 0) > 0;
  const compareAt = product.compareAtPrice;
  const off = salePercent(product.price, compareAt);
  const showNew = isNewArrival(product.createdAt);

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images?.[0],
      size,
      price: product.price,
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
        <Link href={`/product/${product._id}`} className="absolute inset-0 block" aria-label={`View ${product.name}`}>
          <Image
            src={product.images?.[0] || "https://placehold.co/600x800?text=No+Image"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-105"
            unoptimized
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-1rem)] flex-wrap gap-1">
          {product.featured && (
            <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>
          )}
          {showNew && (
            <span className="rounded-full bg-pink-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          )}
          {off != null && (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {off}% off
            </span>
          )}
          {!inStock && (
            <span className="rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Sold out
            </span>
          )}
        </div>

        <div className="absolute inset-x-2 bottom-2 z-10 flex translate-y-2 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            disabled={!inStock}
            onClick={handleQuickAdd}
            className="flex-1 rounded-full bg-white px-3 py-2 text-center text-xs font-semibold text-black shadow-md transition enabled:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Quick add
          </button>
          <Link
            href={`/product/${product._id}`}
            className="rounded-full border border-white/90 bg-white/95 px-3 py-2 text-xs font-semibold text-black shadow-md backdrop-blur hover:bg-white"
          >
            View
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 pt-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{product.category}</p>
        <Link href={`/product/${product._id}`} className="mt-0.5 block">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-zinc-900 transition group-hover:text-pink-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-pink-600">Rs {product.price}</span>
          {compareAt != null && compareAt > product.price && (
            <span className="text-sm text-zinc-400 line-through">Rs {compareAt}</span>
          )}
        </div>
      </div>
    </div>
  );
}

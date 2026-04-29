"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 pb-8 md:grid-cols-2 md:gap-12">
      <div className="aspect-[3/4] animate-pulse rounded-2xl bg-zinc-200" />
      <div className="space-y-5">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
        <div className="h-10 max-w-md animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-8 w-40 animate-pulse rounded bg-zinc-100" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-12 animate-pulse rounded-md bg-zinc-200" />
          <div className="h-10 w-12 animate-pulse rounded-md bg-zinc-200" />
        </div>
        <div className="h-12 max-w-xs animate-pulse rounded-xl bg-zinc-300" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const routeParams = useParams();
  const id = Array.isArray(routeParams?.id) ? routeParams.id[0] : routeParams?.id;
  const [product, setProduct] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [size, setSize] = useState("M");
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoadError("");
    setProduct(null);
    fetch(`/api/products/${id}`)
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
  }, [id]);

  if (!id) {
    return (
      <p className="text-sm text-zinc-600">
        Invalid product link.{" "}
        <Link href="/" className="font-semibold text-pink-700 underline-offset-2 hover:underline">
          Back to home
        </Link>
      </p>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
        <p className="font-semibold text-rose-900">{loadError}</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!product) return <ProductDetailSkeleton />;

  const compareAt = product.compareAtPrice;
  const salePct =
    compareAt != null && compareAt > product.price
      ? Math.round(((compareAt - product.price) / compareAt) * 100)
      : null;
  const inStock = (product.stock ?? 0) > 0;
  const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waDigits = waRaw.replace(/\D/g, "");

  return (
    <div className="grid gap-10 pb-24 md:grid-cols-2 md:gap-12 md:pb-10">
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
      <div className="flex flex-col space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{product.category}</p>
        <h1 className="text-3xl font-black leading-tight text-zinc-900 md:text-4xl">{product.name}</h1>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl font-bold text-pink-600">Rs {product.price}</span>
          {compareAt != null && compareAt > product.price && (
            <>
              <span className="text-lg text-zinc-400 line-through">Rs {compareAt}</span>
              {salePct != null && (
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white">{salePct}% off</span>
              )}
            </>
          )}
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{product.description}</p>

        <ul className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="text-pink-600">✓</span>
            <span>Pan-India delivery · Cash on delivery available</span>
          </li>
          <li className="mt-2 flex gap-2">
            <span className="text-pink-600">✓</span>
            <span>Easy returns &amp; exchanges — see footer for details</span>
          </li>
          {waDigits && (
            <li className="mt-2 flex gap-2">
              <span className="text-pink-600">✓</span>
              <span>
                Need sizing help?{" "}
                <a
                  href={`https://wa.me/${waDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-pink-700 underline-offset-2 hover:underline"
                >
                  Message us on WhatsApp
                </a>
              </span>
            </li>
          )}
        </ul>

        <div>
          <p className="mb-2 text-sm font-medium">Select size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-h-11 min-w-11 rounded-lg border px-4 text-sm font-semibold transition ${
                  size === s ? "border-black bg-black text-white" : "border-zinc-300 bg-white hover:border-zinc-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled={!inStock}
            className="min-h-12 flex-1 rounded-xl bg-black px-6 text-sm font-semibold text-white transition enabled:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (!inStock) {
                toast.error("This item is out of stock.");
                return;
              }
              addToCart({
                productId: product._id,
                name: product.name,
                image: product.images?.[0],
                size,
                price: product.price,
              });
              toast.success("Added to bag", { description: `${product.name} · Size ${size}` });
            }}
          >
            {inStock ? "Add to cart" : "Sold out"}
          </button>
          <Link
            href="/cart"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            View bag
          </Link>
        </div>
      </div>
    </div>
  );
}

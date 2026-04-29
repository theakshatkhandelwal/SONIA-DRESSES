"use client";

import Link from "next/link";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Your bag</h1>
        <EmptyState
          title="Your bag is empty"
          description="Browse categories and tap “Quick add” or open a product to choose size and add to cart."
          actionLabel="Start shopping"
          actionHref="/category/Women"
          secondaryLabel="View home"
          secondaryHref="/"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Your bag</h1>
        <p className="text-sm text-zinc-500">{items.length} {items.length === 1 ? "item" : "items"}</p>
      </div>

      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={`${item.productId}-${item.size}-${idx}`}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-zinc-900">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-500">Size {item.size}</p>
                <p className="mt-1 text-sm font-medium text-zinc-800">Rs {item.price} each</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-medium text-zinc-800 transition hover:bg-white"
                    onClick={() => updateQuantity(idx, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-medium text-zinc-800 transition hover:bg-white"
                    onClick={() => updateQuantity(idx, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="min-h-11 rounded-full px-4 text-sm font-semibold text-rose-600 underline-offset-2 hover:underline"
                  onClick={() => {
                    removeItem(idx);
                    toast.message("Removed from bag", { description: item.name });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="mt-3 text-right text-sm font-semibold text-zinc-700">
              Line total: Rs {item.price * item.quantity}
            </p>
          </li>
        ))}
      </ul>

      <div className="sticky bottom-4 z-10 space-y-4 rounded-2xl border border-zinc-200 bg-zinc-900 p-5 text-white shadow-xl md:static md:border-0 md:shadow-none">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-zinc-300">Estimated total</span>
          <span className="text-2xl font-bold tabular-nums">Rs {total}</span>
        </div>
        <p className="text-xs text-zinc-400">Shipping calculated at checkout · COD &amp; WhatsApp orders welcome.</p>
        <Link
          href="/checkout"
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-pink-600 text-center text-sm font-semibold text-white transition hover:bg-pink-500"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}

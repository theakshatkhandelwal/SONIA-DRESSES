"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-sm text-zinc-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.map((item, idx) => (
        <div key={`${item.productId}-${item.size}-${idx}`} className="rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-zinc-500">Size: {item.size}</p>
              <p className="text-sm text-zinc-500">Rs {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(idx, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(idx, item.quantity + 1)}>+</button>
              <button className="ml-2 text-red-500" onClick={() => removeItem(idx)}>
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-xl bg-zinc-900 p-4 text-white">Total: Rs {total}</div>
      <Link href="/checkout" className="inline-block rounded-lg bg-pink-600 px-4 py-2 text-white">
        Proceed to Checkout
      </Link>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  });

  const whatsappLink = useMemo(() => {
    const lines = [
      "New Order Request",
      `Name: ${form.customerName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      "",
      ...items.map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} - Rs ${
            item.price * item.quantity
          }`
      ),
      "",
      `Total: Rs ${total}`,
      "Payment: WhatsApp/COD",
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    return `https://wa.me/${number}?text=${message}`;
  }, [form, items, total]);

  async function placeOrder() {
    const payload = { ...form, items, totalAmount: total };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      clearCart();
      router.push("/");
    }
  }

  if (!items.length) return <p>Your cart is empty.</p>;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <input
        placeholder="Full Name"
        value={form.customerName}
        onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
      />
      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
      />
      <textarea
        rows={4}
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
      />
      <select
        value={form.paymentMethod}
        onChange={(e) => setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="WHATSAPP">WhatsApp Order</option>
      </select>
      <div className="rounded-xl bg-zinc-900 p-4 text-white">Order Total: Rs {total}</div>
      <div className="flex flex-wrap gap-3">
        <button onClick={placeOrder} className="rounded-lg bg-black px-4 py-2 text-white">
          Place COD Order
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Place Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

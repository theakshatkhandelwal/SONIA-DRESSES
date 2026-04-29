"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
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
          `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} - Rs ${item.price * item.quantity}`
      ),
      "",
      `Total: Rs ${total}`,
      "Payment: WhatsApp/COD",
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    return number ? `https://wa.me/${number.replace(/\D/g, "")}?text=${message}` : "";
  }, [form, items, total]);

  async function placeOrder() {
    const name = form.customerName.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();
    if (!name || !phone || !address) {
      toast.error("Please enter your full name, phone number, and delivery address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form, customerName: name, phone, address, items, totalAmount: total };
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        toast.error(err.error || "Could not place order. Please try again.");
        return;
      }

      const order = await response.json();
      toast.success("Order placed!", {
        description: "We’ll reach out to confirm delivery details.",
      });
      clearCart();
      const oid = order?._id ?? order?.id;
      router.push(oid ? `/order-confirmation?orderId=${oid}` : "/order-confirmation");
    } catch {
      toast.error("Something went wrong. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!items.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
        <EmptyState
          title="Your bag is empty"
          description="Add something you love, then come back to confirm delivery and payment."
          actionLabel="Browse Women"
          actionHref="/category/Women"
          secondaryLabel="View bag"
          secondaryHref="/cart"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Pay cash on delivery, or send your order on WhatsApp for quick confirmation. No card payment on this site yet — we’ll guide you on UPI if needed over chat.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Full name</span>
          <input
            name="customerName"
            autoComplete="name"
            placeholder="As on ID / for delivery"
            value={form.customerName}
            onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Mobile number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="10-digit WhatsApp / SMS number"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Delivery address</span>
          <textarea
            name="address"
            rows={4}
            placeholder="House / flat, street, landmark, city, PIN code"
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">How you’d like to order</span>
          <select
            value={form.paymentMethod}
            onChange={(e) => setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))}
          >
            <option value="COD">Cash on delivery (recommended)</option>
            <option value="WHATSAPP">WhatsApp order only</option>
          </select>
        </label>
      </div>

      <div className="rounded-2xl bg-zinc-900 px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-zinc-300">Order total</span>
          <span className="text-2xl font-bold tabular-nums">Rs {total}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={submitting}
          onClick={placeOrder}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Placing order…" : "Place COD order"}
        </button>
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white transition hover:bg-green-500"
          >
            Send order on WhatsApp
          </a>
        ) : (
          <p className="w-full text-center text-xs text-amber-700">
            Set <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_WHATSAPP_NUMBER</code> in your env for WhatsApp checkout.
          </p>
        )}
      </div>

      <p className="text-center text-xs text-zinc-500">
        <Link href="/cart" className="font-medium text-pink-700 hover:underline">
          ← Back to bag
        </Link>
      </p>
    </div>
  );
}

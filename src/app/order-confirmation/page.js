import Link from "next/link";

export default async function OrderConfirmationPage({ searchParams }) {
  const sp = await searchParams;
  const orderId = typeof sp.orderId === "string" ? sp.orderId : "";

  return (
    <div className="mx-auto max-w-lg space-y-6 pb-10 text-center">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">Order received</p>
        <h1 className="mt-3 text-2xl font-black text-zinc-900">Thank you for shopping with Sonia Dresses</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">
          We&apos;ve saved your order{orderId ? ` (#${orderId.slice(-8)})` : ""}. You&apos;ll get updates on WhatsApp or phone for COD confirmation and dispatch.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 text-left text-sm text-zinc-700">
        <p className="font-semibold text-zinc-900">What happens next?</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Our team may message you to confirm address and size.</li>
          <li>If you used WhatsApp checkout, reply there for fastest replies.</li>
          <li>Track status anytime via the contact options in the footer.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Continue shopping
        </Link>
        <Link href="/category/Women" className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
          Browse Women
        </Link>
      </div>
    </div>
  );
}

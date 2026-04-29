import Link from "next/link";

export const metadata = {
  title: "Contact us",
  description: "Contact Sonia Dresses for orders, sizing, and support.",
};

export default function ContactPage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waDigits = wa.replace(/\D/g, "");
  const waHref = waDigits ? `https://wa.me/${waDigits}` : null;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  return (
    <article className="mx-auto max-w-xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Contact us</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Questions about an order, sizing, or stock? Reach out — we&apos;re happy to help.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {waHref && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">WhatsApp</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex text-lg font-semibold text-emerald-700 hover:underline">
              Chat on WhatsApp
            </a>
            <p className="mt-1 text-xs text-zinc-500">Fastest for photos, sizes, and order changes.</p>
          </div>
        )}
        {email ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</p>
            <a href={`mailto:${email}`} className="mt-1 block font-semibold text-pink-700 hover:underline">
              {email}
            </a>
          </div>
        ) : (
          <p className="text-sm text-zinc-600">
            Set <code className="rounded bg-zinc-100 px-1 text-xs">NEXT_PUBLIC_CONTACT_EMAIL</code> in your environment to show a public email here.
          </p>
        )}
      </div>

      <p className="text-center text-sm text-zinc-600">
        <Link href="/size-guide" className="font-semibold text-pink-700 hover:underline">
          Size guide
        </Link>
        {" · "}
        <Link href="/policies/returns" className="font-semibold text-pink-700 hover:underline">
          Returns
        </Link>
      </p>
    </article>
  );
}

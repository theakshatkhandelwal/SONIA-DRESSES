"use client";

import Link from "next/link";

export default function TrustStrip() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const digits = raw.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : null;

  return (
    <div className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-600 sm:text-xs sm:tracking-[0.14em]">
        <span className="whitespace-nowrap">Pan-India delivery</span>
        <span className="hidden text-zinc-300 sm:inline" aria-hidden>
          ·
        </span>
        <span className="whitespace-nowrap">Easy returns · exchange-friendly</span>
        <span className="hidden text-zinc-300 sm:inline" aria-hidden>
          ·
        </span>
        <span className="whitespace-nowrap">COD &amp; WhatsApp orders</span>
        {waHref && (
          <>
            <span className="hidden text-zinc-300 sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-semibold text-pink-700 underline-offset-2 hover:text-pink-800 hover:underline"
            >
              Chat on WhatsApp
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

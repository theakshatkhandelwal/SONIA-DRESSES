"use client";

import Link from "next/link";

function AccentDot() {
  return (
    <span
      className="inline-flex size-1.5 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 shadow-sm ring-2 ring-pink-100"
      aria-hidden
    />
  );
}

export default function TrustStrip() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const digits = raw.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : null;

  const pills = [
    { key: "delivery", label: "Pan-India delivery" },
    { key: "returns", label: "Easy returns" },
    { key: "exchange", label: "Exchange friendly" },
    { key: "cod", label: "COD & WhatsApp orders" },
  ];

  return (
    <div className="relative border-b border-pink-100/60 bg-gradient-to-b from-white via-zinc-50/95 to-pink-50/40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_-40%,rgba(236,72,153,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="relative mx-auto flex max-w-6xl items-center justify-center gap-2 overflow-x-auto px-3 py-3 sm:flex-wrap sm:justify-center sm:gap-2.5 sm:px-4 sm:py-3.5 md:gap-3 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-label="Store benefits"
      >
        {pills.map((p) => (
          <div key={p.key} className="flex shrink-0 snap-start">
            <span className="inline-flex max-w-[min(100%,14rem)] items-center gap-2 rounded-full border border-zinc-200/90 bg-white/90 px-3.5 py-2 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-white/80 backdrop-blur-[2px] sm:max-w-none sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
              <AccentDot />
              {p.label}
            </span>
          </div>
        ))}

        {waHref && (
          <div className="shrink-0 snap-start">
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-gradient-to-b from-emerald-50 to-white px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-900 shadow-[0_1px_2px_rgba(16,185,129,0.12)] ring-1 ring-emerald-100/80 transition hover:border-emerald-300 hover:shadow-md sm:px-4 sm:text-[11px] sm:tracking-[0.14em]"
            >
              <svg className="size-3.5 text-emerald-600 sm:size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

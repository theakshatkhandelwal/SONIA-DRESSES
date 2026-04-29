"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ name, images }) {
  const safe = Array.isArray(images) && images.length ? images : ["https://placehold.co/600x800?text=No+Image"];
  const [active, setActive] = useState(0);
  const main = safe[Math.min(active, safe.length - 1)];

  if (safe.length <= 1) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md">
        <Image src={main} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority unoptimized />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md">
        <Image
          src={main}
          alt={`${name} — photo ${active + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        {safe.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition md:h-20 md:w-16 ${
              active === i ? "border-pink-600 ring-2 ring-pink-100" : "border-zinc-200 hover:border-zinc-400"
            }`}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" unoptimized />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "sonia_gender_choice";

function WomenIcon() {
  return (
    <svg viewBox="0 0 64 64" className="block h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="32" cy="19" r="10" />
      <path d="M18 38c0-9 6.5-15 14-15s14 6 14 15v9H18z" />
      <path d="M24 15l-7 6M40 15l7 6" />
      <circle cx="27.5" cy="19" r="1.2" fill="currentColor" />
      <circle cx="36.5" cy="19" r="1.2" fill="currentColor" />
      <path d="M27.5 24c1.5 1.8 7.5 1.8 9 0" />
    </svg>
  );
}

function MenIcon() {
  return (
    <svg viewBox="0 0 64 64" className="block h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="32" cy="19" r="10" />
      <path d="M18 38c0-9 6.5-15 14-15s14 6 14 15v9H18z" />
      <path d="M22 15h20M24 12l4 3M40 12l-4 3" />
      <circle cx="27.5" cy="19" r="1.2" fill="currentColor" />
      <circle cx="36.5" cy="19" r="1.2" fill="currentColor" />
      <path d="M27.5 24c1.5 1.8 7.5 1.8 9 0" />
    </svg>
  );
}

export default function GenderChoiceModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    queueMicrotask(() => {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (!existing) setOpen(true);
    });
  }, []);

  function choose(category) {
    window.localStorage.setItem(STORAGE_KEY, category);
    setOpen(false);
    router.push(`/category/${category}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        {/* Women: left half · Men: right half — single diagonal */}
        <div className="absolute inset-0 bg-[#dcbfc0]" />
        <div className="absolute inset-0 bg-[#9cbfe2]" style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)" }} />

        <div className="relative px-4 pb-6 pt-4">
          <div className="mx-auto w-fit rounded-md bg-white px-3 py-1 text-sm font-semibold tracking-[0.2em] text-zinc-900">
            SHOPPING FOR?
          </div>

          <div className="mt-6 grid grid-cols-2 gap-0">
            <button
              type="button"
              onClick={() => choose("Women")}
              className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 px-2 text-zinc-900 transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                <WomenIcon />
              </div>
              <span className="flex h-9 w-full items-center justify-center text-center font-serif text-[28px] leading-none sm:text-[32px]" aria-hidden>
                ♀
              </span>
              <span className="w-full text-center text-2xl font-medium tracking-tight sm:text-3xl">Women</span>
            </button>

            <button
              type="button"
              onClick={() => choose("Men")}
              className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 px-2 text-zinc-900 transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                <MenIcon />
              </div>
              <span className="flex h-9 w-full items-center justify-center text-center font-serif text-[28px] leading-none sm:text-[32px]" aria-hidden>
                ♂
              </span>
              <span className="w-full text-center text-2xl font-medium tracking-tight sm:text-3xl">Men</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

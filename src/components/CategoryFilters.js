"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Minimal sort options — matches `buildProductListingFilter` in `categoryQuery.js`. */
const SORT_OPTIONS = [
  { value: "new", label: "Newest first" },
  { value: "low_price", label: "Price: Low to high" },
  { value: "high_price", label: "Price: High to low" },
];

export default function CategoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(true);

  const sort = searchParams.get("sort") || "new";

  const activeLabel = useMemo(
    () => SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Newest first",
    [sort]
  );

  function buildNextParams(updates) {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "" || val === null || val === undefined) p.delete(key);
      else p.set(key, String(val));
    });
    const qs = p.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="sticky top-28 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          className="flex w-full items-center justify-between border-b border-zinc-200 pb-3 text-left"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">Sort</h2>
          <span className="text-lg leading-none text-zinc-400">{open ? "−" : "+"}</span>
        </button>

        {!open && (
          <p className="pt-3 text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">{activeLabel}</span>
            <span className="ml-1">· tap to change</span>
          </p>
        )}

        {open && (
          <div className="pt-3">
            <ul className="flex flex-col gap-2.5">
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value} className="list-none">
                  <label className="flex w-full cursor-pointer items-start gap-3 text-sm text-zinc-800">
                    <input
                      type="radio"
                      name="listing-sort"
                      checked={sort === opt.value}
                      onChange={() => buildNextParams({ sort: opt.value })}
                      className="mt-0.5 size-[18px] shrink-0 cursor-pointer border-zinc-400 accent-zinc-900 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-0"
                    />
                    <span className="min-w-0 flex-1 text-left leading-snug">{opt.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

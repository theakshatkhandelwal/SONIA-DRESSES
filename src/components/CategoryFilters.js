"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFilterSectionsForCategory } from "@/lib/filterDefinitions";

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "new", label: "New" },
  { value: "discounts", label: "Discounts" },
  { value: "high_price", label: "High Price" },
  { value: "low_price", label: "Low Price" },
];

export default function CategoryFilters({ categoryLabel }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sections = useMemo(() => getFilterSectionsForCategory(categoryLabel), [categoryLabel]);

  const [openSection, setOpenSection] = useState("sort");
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const sort = searchParams.get("sort") || "new";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const discountsOnly = searchParams.get("discounts") === "1";

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
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="border-b border-zinc-200 pb-3 text-sm font-bold uppercase tracking-wide text-zinc-900">
          Filter &amp; sort
        </h2>

        <div className="border-b border-zinc-100 py-3">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-900"
            onClick={() => setOpenSection(openSection === "sort" ? null : "sort")}
          >
            Sort by
            <span className="text-lg leading-none text-zinc-400">{openSection === "sort" ? "−" : "+"}</span>
          </button>
          {openSection === "sort" && (
            <div className="mt-3 rounded-lg border border-zinc-200/80 bg-gradient-to-b from-zinc-100 to-zinc-100/70 px-3 py-3 shadow-inner">
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

        <div className="border-b border-zinc-100 py-3">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-900"
            onClick={() => setOpenSection(openSection === "price" ? null : "price")}
          >
            Price
            <span className="text-lg leading-none text-zinc-400">{openSection === "price" ? "−" : "+"}</span>
          </button>
          {openSection === "price" && (
            <div key={`${minPrice}-${maxPrice}`} className="mt-3 grid gap-2">
              <input
                ref={minRef}
                type="number"
                min={0}
                placeholder="Min (Rs)"
                className="text-sm"
                defaultValue={minPrice}
              />
              <input
                ref={maxRef}
                type="number"
                min={0}
                placeholder="Max (Rs)"
                className="text-sm"
                defaultValue={maxPrice}
              />
              <button
                type="button"
                className="rounded-lg bg-zinc-900 py-2 text-xs font-semibold text-white"
                onClick={() =>
                  buildNextParams({
                    minPrice: minRef.current?.value ?? "",
                    maxPrice: maxRef.current?.value ?? "",
                  })
                }
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="border-b border-zinc-100 py-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-zinc-900">
            <input
              type="checkbox"
              checked={discountsOnly}
              onChange={(e) => buildNextParams({ discounts: e.target.checked ? "1" : "" })}
              className="accent-zinc-900"
            />
            On sale only
          </label>
          <p className="mt-1 text-xs text-zinc-500">Products with a compare-at price higher than sale price.</p>
        </div>

        {sections.map((title) => (
          <div key={title} className="border-b border-zinc-100 py-2">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-sm text-zinc-800"
              onClick={() => setOpenSection(openSection === title ? null : title)}
            >
              <span className="capitalize">{title}</span>
              <span className="text-lg leading-none text-zinc-400">{openSection === title ? "−" : "+"}</span>
            </button>
            {openSection === title && (
              <p className="mt-2 text-xs text-zinc-500">
                Connect these facets when you add product attributes in admin — section is ready for your catalogue.
              </p>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

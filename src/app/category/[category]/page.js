import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { normalizeCategory } from "@/lib/constants";
import { parseListingQuery, buildProductListingFilter } from "@/lib/categoryQuery";

export const dynamic = "force-dynamic";

function FiltersSkeleton() {
  return (
    <div className="hidden w-72 shrink-0 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 p-4 lg:block">
      <div className="h-6 w-32 rounded bg-zinc-200" />
      <div className="mt-4 h-40 rounded bg-zinc-200" />
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }) {
  const routeParams = await params;
  const queryParams = await searchParams;
  const rawCategory = decodeURIComponent(routeParams.category);
  const categoryLabel = normalizeCategory(rawCategory);
  const listing = parseListingQuery(queryParams);

  if (!categoryLabel) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-xl font-bold">Category not found</h1>
        <p className="mt-2 text-sm text-zinc-600">Pick a category from the shop menu.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">
          Back to home
        </Link>
      </section>
    );
  }

  const { filter, sort } = buildProductListingFilter({ category: categoryLabel }, listing);

  let products = [];
  let dbError = false;
  try {
    await connectToDB();
    products = await Product.find(filter).sort(sort).lean();
  } catch {
    dbError = true;
  }

  const q = listing.q;

  return (
    <div className="space-y-6 pb-10">
      {dbError && (
        <section className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Database is unreachable right now. Products cannot be loaded.
        </section>
      )}
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="font-medium text-zinc-700 hover:text-pink-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900">{categoryLabel}</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-pink-800 px-6 py-8 text-white md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Sonia Dresses</p>
        <h1 className="mt-2 text-2xl font-black md:text-3xl">
          {categoryLabel}{" "}
          <span className="text-base font-semibold text-zinc-200">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-200">Browse the grid and sort by newest or price.</p>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Suspense fallback={<FiltersSkeleton />}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CategoryFilters />
          </div>
        </Suspense>

        <div className="min-w-0 flex-1 space-y-6">
          <form className="flex w-full flex-wrap gap-2" action={`/category/${encodeURIComponent(rawCategory)}`} method="get">
            <input type="hidden" name="sort" value={listing.sort} />
            {listing.minPrice != null && <input type="hidden" name="minPrice" value={String(listing.minPrice)} />}
            {listing.maxPrice != null && <input type="hidden" name="maxPrice" value={String(listing.maxPrice)} />}
            {listing.discountsOnly && <input type="hidden" name="discounts" value="1" />}
            <input
              name="q"
              defaultValue={q}
              placeholder="Search in this category"
              className="min-w-[200px] flex-1"
            />
            <button type="submit" className="shrink-0 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-zinc-800">No products match</p>
              <p className="mt-2 text-sm text-zinc-600">
                {q || listing.sort !== "new" || listing.minPrice != null || listing.maxPrice != null || listing.discountsOnly
                  ? "Try another search term or change how results are sorted."
                  : "Check back soon for new arrivals in this category."}
              </p>
              <Link href="/" className="mt-6 inline-block text-sm font-semibold text-pink-600 hover:underline">
                Browse all categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

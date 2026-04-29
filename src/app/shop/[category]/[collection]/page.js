import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { normalizeCategory } from "@/lib/constants";
import { findCollectionLabel } from "@/lib/megaMenu";
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

export default async function CollectionPage({ params, searchParams }) {
  const routeParams = await params;
  const queryParams = await searchParams;
  const rawCat = decodeURIComponent(routeParams.category);
  const categoryLabel = normalizeCategory(rawCat);
  const collectionSlug = decodeURIComponent(routeParams.collection);
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

  const collectionLabel = findCollectionLabel(categoryLabel, collectionSlug);
  if (!collectionLabel) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-xl font-bold">Collection not found</h1>
        <p className="mt-2 text-sm text-zinc-600">Try another collection from the menu.</p>
        <Link
          href={`/category/${encodeURIComponent(categoryLabel)}`}
          className="mt-6 inline-block rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
        >
          Back to {categoryLabel}
        </Link>
      </section>
    );
  }

  const baseFilter = {
    category: categoryLabel,
    name: { $regex: collectionLabel, $options: "i" },
  };

  const { filter, sort } = buildProductListingFilter(baseFilter, listing);

  let products = [];
  let dbError = false;
  try {
    await connectToDB();
    products = await Product.find(filter).sort(sort).lean();
  } catch {
    dbError = true;
  }

  const shopPath = `/shop/${encodeURIComponent(rawCat)}/${encodeURIComponent(routeParams.collection)}`;
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
        <Link href={`/category/${encodeURIComponent(categoryLabel)}`} className="font-medium text-zinc-700 hover:text-pink-600">
          {categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900">{collectionLabel}</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-pink-800 px-6 py-8 text-white md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Sonia Dresses Collection</p>
        <h1 className="mt-2 text-2xl font-black md:text-3xl">
          {collectionLabel}{" "}
          <span className="text-base font-semibold text-zinc-200">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-200">
          {categoryLabel} · filter &amp; sort below.
        </p>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Suspense fallback={<FiltersSkeleton />}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CategoryFilters categoryLabel={categoryLabel} />
          </div>
        </Suspense>

        <div className="min-w-0 flex-1 space-y-6">
          <form className="flex flex-wrap gap-2" action={shopPath} method="get">
            <input type="hidden" name="sort" value={listing.sort} />
            {listing.minPrice != null && <input type="hidden" name="minPrice" value={String(listing.minPrice)} />}
            {listing.maxPrice != null && <input type="hidden" name="maxPrice" value={String(listing.maxPrice)} />}
            {listing.discountsOnly && <input type="hidden" name="discounts" value="1" />}
            <input name="q" defaultValue={q} placeholder="Search in this collection" className="min-w-[200px] flex-1" />
            <button type="submit" className="shrink-0 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-zinc-800">No matching products</p>
              <p className="mt-2 text-sm text-zinc-600">Try different filters or search keywords.</p>
              <Link href={`/category/${encodeURIComponent(categoryLabel)}`} className="mt-6 inline-block text-sm font-semibold text-pink-600 hover:underline">
                Browse all {categoryLabel}
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

import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function ListingPageSkeleton() {
  return (
    <div className="space-y-6 pb-10 animate-pulse">
      <div className="h-4 w-40 rounded bg-zinc-200" />
      <section className="rounded-3xl bg-zinc-200 px-6 py-10 md:px-10">
        <div className="h-3 w-24 rounded bg-zinc-300" />
        <div className="mt-3 h-9 max-w-md rounded bg-zinc-300" />
        <div className="mt-2 h-4 max-w-lg rounded bg-zinc-300/80" />
      </section>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-72 shrink-0 rounded-xl border border-zinc-200 bg-zinc-100 p-4 lg:block">
          <div className="h-6 w-32 rounded bg-zinc-200" />
          <div className="mt-4 h-40 rounded bg-zinc-200" />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-xl bg-zinc-200" />
            <div className="h-10 w-24 rounded-xl bg-zinc-300" />
          </div>
          <ProductGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}

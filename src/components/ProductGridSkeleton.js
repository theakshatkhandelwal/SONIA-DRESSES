export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="aspect-[3/4] animate-pulse bg-zinc-200" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

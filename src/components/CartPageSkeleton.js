export default function CartPageSkeleton() {
  return (
    <div className="space-y-4 pb-8">
      <div className="h-8 w-40 animate-pulse rounded bg-zinc-200" />
      {[1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-48 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-100" />
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-100" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-9 animate-pulse rounded bg-zinc-200" />
              <div className="h-9 w-8 animate-pulse rounded bg-zinc-100" />
              <div className="h-9 w-9 animate-pulse rounded bg-zinc-200" />
            </div>
          </div>
        </div>
      ))}
      <div className="h-14 animate-pulse rounded-xl bg-zinc-300" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="grid gap-10 pb-8 md:grid-cols-2 md:gap-12">
      <div className="aspect-[3/4] animate-pulse rounded-2xl bg-zinc-200" />
      <div className="space-y-5">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
        <div className="h-10 max-w-md animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-8 w-40 animate-pulse rounded bg-zinc-100" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-12 animate-pulse rounded-md bg-zinc-200" />
          <div className="h-10 w-12 animate-pulse rounded-md bg-zinc-200" />
          <div className="h-10 w-12 animate-pulse rounded-md bg-zinc-200" />
        </div>
        <div className="h-12 max-w-xs animate-pulse rounded-xl bg-zinc-300" />
      </div>
    </div>
  );
}

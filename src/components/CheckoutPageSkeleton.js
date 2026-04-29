export default function CheckoutPageSkeleton() {
  return (
    <div className="mx-auto max-w-xl space-y-4 pb-8">
      <div className="h-8 w-36 animate-pulse rounded bg-zinc-200" />
      <div className="h-12 animate-pulse rounded-xl bg-zinc-100" />
      <div className="h-12 animate-pulse rounded-xl bg-zinc-100" />
      <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
      <div className="h-12 animate-pulse rounded-xl bg-zinc-100" />
      <div className="h-14 animate-pulse rounded-xl bg-zinc-300" />
      <div className="flex gap-3">
        <div className="h-11 flex-1 animate-pulse rounded-lg bg-zinc-300" />
        <div className="h-11 flex-1 animate-pulse rounded-lg bg-zinc-200" />
      </div>
    </div>
  );
}

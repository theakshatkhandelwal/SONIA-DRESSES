import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center shadow-sm">
      <p className="text-lg font-semibold text-zinc-900">{title}</p>
      {description && <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-zinc-600">{description}</p>}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            {actionLabel}
          </Link>
        )}
        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-pink-700 underline-offset-2 hover:underline"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

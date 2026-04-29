export default function PolicyLayout({ title, children }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-12">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">{title}</h1>
      <div className="space-y-4 text-sm leading-relaxed text-zinc-700 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-zinc-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}

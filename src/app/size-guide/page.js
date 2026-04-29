import Link from "next/link";

export const metadata = {
  title: "Size guide",
  description: "How to measure and pick your size at Sonia Dresses.",
};

export default function SizeGuidePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Size guide</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Use these charts as a starting point. Fit varies by style — when in doubt, message us on WhatsApp with your measurements.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <h2 className="border-b border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-900">Women — body (inches)</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm text-zinc-800">
            <thead>
              <tr className="border-b border-zinc-100 bg-white">
                <th className="px-4 py-2 font-semibold">Size</th>
                <th className="px-4 py-2 font-semibold">Bust</th>
                <th className="px-4 py-2 font-semibold">Waist</th>
                <th className="px-4 py-2 font-semibold">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                ["XS", "32–33", "26–27", "34–35"],
                ["S", "34–35", "28–29", "36–37"],
                ["M", "36–37", "30–31", "38–39"],
                ["L", "38–40", "32–34", "40–42"],
                ["XL", "41–43", "35–37", "43–45"],
                ["XXL", "44–46", "38–40", "46–48"],
              ].map(([size, b, w, h]) => (
                <tr key={size} className="bg-white">
                  <td className="px-4 py-2.5 font-medium">{size}</td>
                  <td className="px-4 py-2.5">{b}</td>
                  <td className="px-4 py-2.5">{w}</td>
                  <td className="px-4 py-2.5">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <h2 className="border-b border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-900">Men — upper / lower (inches)</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm text-zinc-800">
            <thead>
              <tr className="border-b border-zinc-100 bg-white">
                <th className="px-4 py-2 font-semibold">Size</th>
                <th className="px-4 py-2 font-semibold">Chest</th>
                <th className="px-4 py-2 font-semibold">Waist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                ["S", "36–38", "30–32"],
                ["M", "39–41", "33–34"],
                ["L", "42–44", "35–36"],
                ["XL", "45–47", "37–39"],
                ["XXL", "48–50", "40–42"],
              ].map(([size, c, w]) => (
                <tr key={size} className="bg-white">
                  <td className="px-4 py-2.5 font-medium">{size}</td>
                  <td className="px-4 py-2.5">{c}</td>
                  <td className="px-4 py-2.5">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-pink-100 bg-pink-50/50 px-5 py-4 text-sm text-zinc-800">
        <p className="font-semibold text-zinc-900">How to measure</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Bust/chest: fullest part, tape level.</li>
          <li>Waist: narrowest part of torso.</li>
          <li>Hip: fullest part around hips.</li>
        </ul>
      </section>

      <p className="text-center text-sm text-zinc-600">
        Shopping something fitted?{" "}
        <Link href="/contact" className="font-semibold text-pink-700 underline-offset-2 hover:underline">
          Contact us
        </Link>{" "}
        before you order.
      </p>
    </article>
  );
}

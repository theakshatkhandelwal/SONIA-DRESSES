import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-14 border-t border-zinc-200 bg-zinc-100">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h2 className="text-3xl font-black">Let&apos;s get to know each other</h2>
            <p className="mt-2 text-sm text-zinc-700">Sign up to receive offers, new arrivals, and festive drops from Sonia Dresses.</p>
          </div>
          <form className="grid gap-2 md:grid-cols-[1fr_auto]">
            <input type="email" placeholder="Enter your email address" className="bg-white" />
            <button type="button" className="rounded-xl bg-zinc-900 px-5 py-2 text-sm font-semibold text-white">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-zinc-700 md:grid-cols-5">
          <div>
            <h3 className="mb-3 font-bold text-zinc-900">Shopping with Sonia Dresses</h3>
            <ul className="space-y-1">
              <li>Size Guide</li>
              <li>Student Offers</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-zinc-900">Customer Care</h3>
            <ul className="space-y-1">
              <li>Returns</li>
              <li>Delivery Information</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-zinc-900">Privacy & Legal</h3>
            <ul className="space-y-1">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookies</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-zinc-900">More from Sonia Dresses</h3>
            <ul className="space-y-1">
              <li>Careers</li>
              <li>New Collections</li>
              <li>Store Locations</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-zinc-900">Follow Us</h3>
            <p>Instagram · Facebook · Pinterest</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 shrink-0">
              <Image
                src="/sd.jpeg"
                alt=""
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <span className="text-lg font-black uppercase tracking-[0.18em] text-zinc-900 sm:text-xl">
              Sonia Dresses
            </span>
          </div>
          <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
            Copyright © {year} Sonia Dresses
          </p>
        </div>
      </section>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MEGA_MENU, slugifyCollection } from "@/lib/megaMenu";

const STRIP_ITEMS = {
  Women: [
    { label: "Sarees", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F97B.png" },
    { label: "Ethnic Sets", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F458.png" },
    { label: "Dresses", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F457.png" },
    { label: "Kurtas", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F9E5.png" },
    { label: "Tops", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F455.png" },
    { label: "Bottoms", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F456.png" },
    { label: "Lingerie", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F459.png" },
  ],
  Men: [
    { label: "Jeans", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F456.png" },
    { label: "T-Shirts", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F455.png" },
    { label: "Shirts", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F454.png" },
    { label: "Ethnic Sets", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F473-200D-2642-FE0F.png" },
    { label: "Trousers", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F456.png" },
    { label: "Sports Wear", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F3C3.png" },
  ],
  Kids: [
    { label: "Twin Sets", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F46D.png" },
    { label: "Frocks", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F457.png" },
    { label: "Tops", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F455.png" },
    { label: "Ethnic Wear", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F97B.png" },
    { label: "Bottom Wear", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F456.png" },
    { label: "Loungewear", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F6CC.png" },
    { label: "Infants", image: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/618x618/1F476.png" },
  ],
};

export default function Header() {
  const { items } = useCart();
  const [activeMenu, setActiveMenu] = useState("");
  const [activeStrip, setActiveStrip] = useState("Women");

  useEffect(() => {
    const preferred = window.localStorage.getItem("sonia_gender_choice");
    if (preferred && ["Women", "Men", "Kids"].includes(preferred)) {
      setActiveStrip(preferred);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur" onMouseLeave={() => setActiveMenu("")}>
      <div className="bg-black px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        New arrivals every week | Stylish looks at affordable prices
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex min-w-0 max-w-[min(78vw,20rem)] shrink-0 items-center gap-2.5 sm:gap-3 md:max-w-none"
          title="Sonia Dresses — Home"
          aria-label="Sonia Dresses — Home"
        >
          <span className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10">
            <Image
              src="/sd.jpeg"
              alt=""
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="truncate text-base font-black uppercase tracking-[0.18em] text-zinc-900 sm:text-lg md:text-xl">
            Sonia Dresses
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {["Women", "Men", "Kids"].map((category) => (
            <button
              key={category}
              type="button"
              onMouseEnter={() => setActiveMenu(category)}
              className={`border-b-2 pb-1 uppercase tracking-wider transition-colors ${
                activeMenu === category ? "border-pink-600 text-pink-600" : "border-transparent hover:text-pink-600"
              }`}
            >
              {category}
            </button>
          ))}
          <Link href="/" className="uppercase tracking-wider transition-colors hover:text-pink-600">
            Home
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Link href="/checkout" className="hidden rounded-full border border-zinc-300 px-3 py-1.5 md:inline-block">
            Checkout
          </Link>
          <Link href="/cart" className="rounded-full bg-black px-3 py-1.5 font-semibold text-white">
            Cart ({items.length})
          </Link>
        </div>
      </div>

      <div className="border-t border-zinc-200 bg-zinc-100/90">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="mb-3 flex items-center gap-7 text-xs font-semibold uppercase tracking-[0.2em]">
            {["Women", "Men", "Kids"].map((segment) => (
              <button
                key={segment}
                type="button"
                onClick={() => setActiveStrip(segment)}
                className={`border-b-2 pb-1 transition-colors ${
                  activeStrip === segment ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-800"
                }`}
              >
                {segment}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 sm:gap-4">
            <div className="flex w-[4.75rem] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-300/70 bg-zinc-200/95 px-2 py-2 shadow-sm ring-1 ring-white/40">
              <div className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-white text-[1.05rem] font-black leading-none tracking-tight text-zinc-900 shadow-inner ring-1 ring-zinc-200">
                MY
              </div>
              <span className="block w-full text-center text-[10px] font-semibold uppercase leading-snug tracking-wide text-zinc-800 sm:text-[11px]">
                My Feed
              </span>
            </div>

            {STRIP_ITEMS[activeStrip].map((item) => (
              <Link
                key={`${activeStrip}-${item.label}`}
                href={`/shop/${activeStrip}/${slugifyCollection(item.label)}`}
                className="group flex w-[4.75rem] shrink-0 flex-col items-center justify-center gap-2"
              >
                <div className="relative h-[3.25rem] w-[3.25rem] shrink-0 overflow-hidden rounded-full border-2 border-zinc-300 bg-white transition group-hover:border-lime-500">
                  <Image src={item.image} alt={item.label} fill className="object-cover" sizes="52px" unoptimized />
                </div>
                <span className="block w-full text-center text-[10px] font-semibold uppercase leading-snug tracking-wide text-zinc-800 sm:text-[11px]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {activeMenu && (
        <div className="hidden border-t border-zinc-200 bg-zinc-100 md:block">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-4 py-6">
            {MEGA_MENU[activeMenu].map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 inline-block rounded-md bg-zinc-200 px-2 py-1 text-lg font-bold text-zinc-900">
                  {group.title}
                </h3>
                <ul className="space-y-2 text-base text-zinc-700">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/shop/${activeMenu}/${slugifyCollection(item)}`}
                        className="transition-colors hover:text-pink-600"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

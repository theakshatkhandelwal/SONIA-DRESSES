import Link from "next/link";
import Image from "next/image";
import HomeHeroMotion from "@/components/react-bits/HomeHeroMotion";
import EmptyState from "@/components/EmptyState";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  let dbError = false;
  let featuredProducts = [];
  let newArrivals = [];
  try {
    await connectToDB();
    featuredProducts = await Product.find({ featured: true }).limit(8).lean();
    newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(4).lean();
  } catch {
    dbError = true;
  }
  const trendCards = [
    { title: "Festive Edit", subtitle: "Sequins, shimmer and statement fits", link: "/category/Women" },
    { title: "Everyday Denim", subtitle: "Comfy styles for daily wear", link: "/category/Men" },
    { title: "Mini Fashion", subtitle: "Playful looks for little stars", link: "/category/Kids" },
  ];
  const categoryCards = [
    { name: "Women", image: "/women.jpeg" },
    { name: "Men", image: "/men.jpeg" },
    { name: "Kids", image: "/kids.jpeg" },
  ];

  return (
    <div className="space-y-12 pb-10">
      {dbError && (
        <section className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          <strong className="font-semibold">Catalog is offline.</strong> We can’t load live products right now. Check back soon,
          or confirm your database connection in hosting settings.
        </section>
      )}
      <HomeHeroMotion />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/category/Women" className="text-sm font-semibold text-pink-600">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {categoryCards.map((category, index) => (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
              <div className="p-4 text-center text-base font-semibold">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Trending Now</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {trendCards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Shop</p>
              <h3 className="mt-2 text-xl font-bold">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{card.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
        {dbError ? (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-center text-sm text-zinc-600">
            Featured picks will appear here once the catalog is online.
          </p>
        ) : featuredProducts.length === 0 ? (
          <EmptyState
            title="No featured picks yet"
            description="Mark products as featured in your admin dashboard — they’ll appear here automatically."
            actionLabel="Shop Women"
            actionHref="/category/Women"
            secondaryLabel="Go to admin"
            secondaryHref="/admin"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">New In</h2>
        {dbError ? (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-center text-sm text-zinc-600">
            New arrivals will load here when the database is connected.
          </p>
        ) : newArrivals.length === 0 ? (
          <EmptyState
            title="New arrivals coming soon"
            description="When your catalog has products, the latest drops show up here first."
            actionLabel="Browse Men"
            actionHref="/category/Men"
            secondaryLabel="Browse Kids"
            secondaryHref="/category/Kids"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

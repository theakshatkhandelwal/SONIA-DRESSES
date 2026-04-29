/**
 * Seeds 10 demo products into MongoDB (db: sonia_dresses).
 * Run: npm run seed:demo
 * Requires MONGODB_URI (loads .env.local via npm script when present).
 */
import mongoose from "mongoose";

const CATEGORIES = ["Men", "Women", "Kids", "Babies", "Elderly"];
const SUBCATEGORIES = [
  "Upper wear",
  "Bottom wear",
  "Innerwear",
  "Party wear",
  "Casual wear",
  "Occasion-specific",
];

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, enum: CATEGORIES, required: true },
    subcategory: { type: String, enum: SUBCATEGORIES, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    stock: { type: Number, default: 10, min: 0 },
    sizes: [{ type: String }],
    images: [{ type: String, required: true }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const DEMO_SLUGS = [
  "demo-floral-cotton-saree",
  "demo-embroidered-kurta-set",
  "demo-slim-stretch-jeans",
  "demo-classic-polo-t-shirt",
  "demo-kids-printed-frock",
  "demo-sequin-evening-dress",
  "demo-formal-oxford-shirt",
  "demo-kids-twin-tracksuit",
  "demo-denim-jacket-cropped",
  "demo-kids-ethnic-kurta-set",
];

const demoProducts = [
  {
    name: "Floral Cotton Saree — Sapphire Garden",
    slug: DEMO_SLUGS[0],
    category: "Women",
    subcategory: "Party wear",
    description:
      "Lightweight cotton saree with garden florals. Gentle drape for festive gatherings and daytime celebrations. Includes unstitched blouse fabric.",
    price: 2499,
    compareAtPrice: 3299,
    stock: 28,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://placehold.co/600x800/f472b6/ffffff?text=Saree+A",
      "https://placehold.co/600x800/ec4899/ffffff?text=Saree+B",
    ],
    featured: true,
  },
  {
    name: "Embroidered Kurta Set — Ivory Mist",
    slug: DEMO_SLUGS[1],
    category: "Women",
    subcategory: "Occasion-specific",
    description:
      "Three-piece ethnic set with tonal embroidery, straight pants, and dupatta. Breathable blend for weddings and family functions.",
    price: 3899,
    compareAtPrice: 4599,
    stock: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://placehold.co/600x800/a855f7/ffffff?text=Kurta+Set",
      "https://placehold.co/600x800/9333ea/ffffff?text=Detail",
    ],
    featured: true,
  },
  {
    name: "Slim Stretch Jeans — Midnight Blue",
    slug: DEMO_SLUGS[2],
    category: "Men",
    subcategory: "Bottom wear",
    description:
      "Mid-rise slim fit with stretch for everyday comfort. Dark rinse works from office casual to weekend outings.",
    price: 1899,
    compareAtPrice: 2399,
    stock: 42,
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "https://placehold.co/600x800/1e3a8a/ffffff?text=Jeans",
      "https://placehold.co/600x800/1e40af/ffffff?text=Fit",
    ],
    featured: false,
  },
  {
    name: "Classic Polo T-Shirt — Twin Pack",
    slug: DEMO_SLUGS[3],
    category: "Men",
    subcategory: "Casual wear",
    description:
      "Soft pique cotton polos in navy and white. Breathable collar and reinforced placket for daily wear.",
    price: 1299,
    stock: 55,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://placehold.co/600x800/0f766e/ffffff?text=Polo",
      "https://placehold.co/600x800/115e59/ffffff?text=Pack",
    ],
    featured: false,
  },
  {
    name: "Kids Printed Frock — Candy Flutter",
    slug: DEMO_SLUGS[4],
    category: "Kids",
    subcategory: "Party wear",
    description:
      "Twirl-ready frock with soft lining and playful print. Easy zip back for quick changes.",
    price: 899,
    compareAtPrice: 1199,
    stock: 36,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    images: [
      "https://placehold.co/600x800/f9a8d4/1f2937?text=Frock",
      "https://placehold.co/600x800/f472b6/ffffff?text=Back",
    ],
    featured: false,
  },
  {
    name: "Sequin Evening Dress — Rose Quartz",
    slug: DEMO_SLUGS[5],
    category: "Women",
    subcategory: "Party wear",
    description:
      "Midi-length cocktail dress with matte sequins and subtle stretch lining. Statement piece for evenings out.",
    price: 5299,
    compareAtPrice: 6999,
    stock: 12,
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://placehold.co/600x800/be185d/ffffff?text=Evening",
      "https://placehold.co/600x800/9d174d/ffffff?text=Detail",
    ],
    featured: true,
  },
  {
    name: "Formal Oxford Shirt — Steel Blue",
    slug: DEMO_SLUGS[6],
    category: "Men",
    subcategory: "Upper wear",
    description:
      "Crisp cotton-blend oxford with structured collar. Ideal with tailored trousers or dark denim.",
    price: 1599,
    stock: 48,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://placehold.co/600x800/64748b/ffffff?text=Shirt",
      "https://placehold.co/600x800/475569/ffffff?text=Cuff",
    ],
    featured: false,
  },
  {
    name: "Kids Twin Tracksuit — Neon Sprint",
    slug: DEMO_SLUGS[7],
    category: "Kids",
    subcategory: "Casual wear",
    description:
      "Matching hoodie and jogger set in breathable fleece-back jersey. Stretch cuffs for active kids.",
    price: 1499,
    stock: 40,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: [
      "https://placehold.co/600x800/fbbf24/1f2937?text=Tracksuit",
      "https://placehold.co/600x800/f59e0b/1f2937?text=Set",
    ],
    featured: false,
  },
  {
    name: "Denim Jacket — Cropped Ice Blue",
    slug: DEMO_SLUGS[8],
    category: "Women",
    subcategory: "Casual wear",
    description:
      "Cropped silhouette with vintage wash and brass buttons. Layer over dresses or tees year-round.",
    price: 2799,
    compareAtPrice: 3499,
    stock: 22,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://placehold.co/600x800/7dd3fc/1e293b?text=Jacket",
      "https://placehold.co/600x800/38bdf8/1e293b?text=Fit",
    ],
    featured: false,
  },
  {
    name: "Kids Ethnic Kurta Pyjama — Festive Gold",
    slug: DEMO_SLUGS[9],
    category: "Kids",
    subcategory: "Occasion-specific",
    description:
      "Soft cotton kurta with contrast collar and elasticated pyjama. Perfect for festivals and family photos.",
    price: 1199,
    stock: 33,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    images: [
      "https://placehold.co/600x800/d97706/ffffff?text=Kurta",
      "https://placehold.co/600x800/b45309/ffffff?text=Pyjama",
    ],
    featured: false,
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI. Use: npm run seed:demo (with .env.local) or export MONGODB_URI.");
    process.exit(1);
  }

  await mongoose.connect(uri, {
    dbName: "sonia_dresses",
    bufferCommands: false,
    serverSelectionTimeoutMS: 15000,
  });

  const removed = await Product.deleteMany({ slug: { $in: DEMO_SLUGS } });
  console.log(`Removed ${removed.deletedCount} previous demo product(s) with the same slugs.`);

  const inserted = await Product.insertMany(demoProducts);
  console.log(`Inserted ${inserted.length} demo products:`);
  inserted.forEach((p) => console.log(`  - ${p.name} (${p.slug})`));

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Seeds demo products: 8 per category (Men, Women, Kids, Babies, Elderly) = 40 items.
 * Product images use royalty-free stock URLs (Pexels + Unsplash), not AI-generated art.
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

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

/** Previous one-shot demo slugs (removed on re-seed so DB stays clean). */
const LEGACY_DEMO_SLUGS = [
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

/**
 * Demo product photos — royalty-free stock (no AI-generated assets).
 * Pexels: https://www.pexels.com/license/ · Unsplash: https://unsplash.com/license
 */
const Q = "?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop";
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${Q}`;
const us = (slug) => `https://images.unsplash.com/photo-${slug}?w=800&h=1000&fit=crop&q=80`;
/** Two gallery images per product */
const pair = (a, b) => [a, b];

const demoProducts = [
  // —— Women (8) ——
  {
    name: "Floral Cotton Saree — Sapphire Garden",
    slug: "demo-women-saree-sapphire",
    category: "Women",
    subcategory: "Party wear",
    description:
      "Lightweight cotton saree with garden florals. Gentle drape for festive gatherings. Includes unstitched blouse fabric.",
    price: 2499,
    compareAtPrice: 3299,
    stock: 28,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(1346187), px(1536619)),
    featured: true,
  },
  {
    name: "Embroidered Kurta Set — Ivory Mist",
    slug: "demo-women-kurta-ivory",
    category: "Women",
    subcategory: "Occasion-specific",
    description:
      "Three-piece ethnic set with tonal embroidery, straight pants, and dupatta. Breathable blend for weddings and family functions.",
    price: 3899,
    compareAtPrice: 4599,
    stock: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: pair(px(1926769), px(996329)),
    featured: true,
  },
  {
    name: "Sequin Evening Dress — Rose Quartz",
    slug: "demo-women-evening-rose",
    category: "Women",
    subcategory: "Party wear",
    description:
      "Midi-length cocktail dress with matte sequins and subtle stretch lining. Statement piece for evenings out.",
    price: 5299,
    compareAtPrice: 6999,
    stock: 12,
    sizes: ["XS", "S", "M", "L"],
    images: pair(px(985584), us("1469334031218-e382a71b716b")),
    featured: true,
  },
  {
    name: "Denim Jacket — Cropped Ice Blue",
    slug: "demo-women-denim-jacket",
    category: "Women",
    subcategory: "Casual wear",
    description:
      "Cropped silhouette with vintage wash and brass buttons. Layer over dresses or tees year-round.",
    price: 2799,
    compareAtPrice: 3499,
    stock: 22,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: pair(px(1043474), px(1926769)),
    featured: false,
  },
  {
    name: "Linen Blend Palazzo Set — Sage",
    slug: "demo-women-palazzo-sage",
    category: "Women",
    subcategory: "Casual wear",
    description: "Relaxed kurta with wide palazzos in breathable linen blend. Ideal for workdays and brunches.",
    price: 2199,
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(3758806), px(2983464)),
    featured: false,
  },
  {
    name: "Printed Maxi Dress — Sunset Stripe",
    slug: "demo-women-maxi-sunset",
    category: "Women",
    subcategory: "Party wear",
    description: "Flowing maxi with adjustable straps and side pockets. Stripe print for holidays and getaways.",
    price: 1999,
    compareAtPrice: 2599,
    stock: 25,
    sizes: ["XS", "S", "M", "L"],
    images: pair(px(1449843), px(6567607)),
    featured: false,
  },
  {
    name: "Cotton Camisole Pack — Essentials",
    slug: "demo-women-camisole-pack",
    category: "Women",
    subcategory: "Innerwear",
    description: "Soft cotton camisoles in neutral tones. Adjustable straps; pack of three.",
    price: 799,
    stock: 60,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(6311668), px(9776192)),
    featured: false,
  },
  {
    name: "Wool Blend Shawl — Winter Plum",
    slug: "demo-women-shawl-plum",
    category: "Women",
    subcategory: "Occasion-specific",
    description: "Lightweight wool-blend shawl with subtle weave. Drapes beautifully over ethnic or western wear.",
    price: 1499,
    stock: 20,
    sizes: ["One size"],
    images: pair(px(1927259), us("1490481651871-ab68de25d43d")),
    featured: false,
  },

  // —— Men (8) ——
  {
    name: "Slim Stretch Jeans — Midnight Blue",
    slug: "demo-men-jeans-midnight",
    category: "Men",
    subcategory: "Bottom wear",
    description:
      "Mid-rise slim fit with stretch for everyday comfort. Dark rinse works from office casual to weekend outings.",
    price: 1899,
    compareAtPrice: 2399,
    stock: 42,
    sizes: ["28", "30", "32", "34", "36"],
    images: pair(px(1040945), px(1183266)),
    featured: true,
  },
  {
    name: "Classic Polo T-Shirt — Twin Pack",
    slug: "demo-men-polo-twin",
    category: "Men",
    subcategory: "Casual wear",
    description:
      "Soft pique cotton polos in navy and white. Breathable collar and reinforced placket for daily wear.",
    price: 1299,
    stock: 55,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: pair(px(837140), px(2897529)),
    featured: false,
  },
  {
    name: "Formal Oxford Shirt — Steel Blue",
    slug: "demo-men-oxford-steel",
    category: "Men",
    subcategory: "Upper wear",
    description:
      "Crisp cotton-blend oxford with structured collar. Ideal with tailored trousers or dark denim.",
    price: 1599,
    stock: 48,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: pair(px(6311392), px(6567607)),
    featured: false,
  },
  {
    name: "Tapered Chinos — Khaki Sand",
    slug: "demo-men-chinos-khaki",
    category: "Men",
    subcategory: "Bottom wear",
    description: "Stretch cotton chinos with tapered leg. Office-ready with sneakers or loafers.",
    price: 1699,
    compareAtPrice: 1999,
    stock: 38,
    sizes: ["30", "32", "34", "36", "38"],
    images: pair(px(10477341), px(6311426)),
    featured: false,
  },
  {
    name: "Athletic Zip Hoodie — Graphite",
    slug: "demo-men-hoodie-graphite",
    category: "Men",
    subcategory: "Casual wear",
    description: "Mid-weight fleece hoodie with zip pockets. Great for travel and gym layers.",
    price: 2199,
    stock: 33,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: pair(px(6311668), px(3760293)),
    featured: false,
  },
  {
    name: "Cotton Boxers — 3 Pack",
    slug: "demo-men-boxers-pack",
    category: "Men",
    subcategory: "Innerwear",
    description: "Breathable cotton boxers with soft waistband. Assorted colours in one pack.",
    price: 699,
    stock: 70,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(459957), px(698074)),
    featured: false,
  },
  {
    name: "Indo-Western Bandhgala — Black",
    slug: "demo-men-bandhgala-black",
    category: "Men",
    subcategory: "Occasion-specific",
    description: "Tailored bandhgala jacket in matte finish. Pair with trousers for receptions and dinners.",
    price: 4599,
    compareAtPrice: 5499,
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(2682289), px(3771087)),
    featured: true,
  },
  {
    name: "Running Shorts — Volt",
    slug: "demo-men-shorts-volt",
    category: "Men",
    subcategory: "Casual wear",
    description: "Lightweight shorts with inner brief and zip pocket. Built for training and weekend runs.",
    price: 999,
    stock: 45,
    sizes: ["S", "M", "L", "XL"],
    images: pair(px(3760273), px(1047542)),
    featured: false,
  },

  // —— Kids (8) ——
  {
    name: "Kids Printed Frock — Candy Flutter",
    slug: "demo-kids-frock-candy",
    category: "Kids",
    subcategory: "Party wear",
    description: "Twirl-ready frock with soft lining and playful print. Easy zip back for quick changes.",
    price: 899,
    compareAtPrice: 1199,
    stock: 36,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    images: pair(px(1648377), px(1043474)),
    featured: false,
  },
  {
    name: "Kids Twin Tracksuit — Neon Sprint",
    slug: "demo-kids-tracksuit-neon",
    category: "Kids",
    subcategory: "Casual wear",
    description:
      "Matching hoodie and jogger set in breathable fleece-back jersey. Stretch cuffs for active kids.",
    price: 1499,
    stock: 40,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: pair(px(6311668), px(6311392)),
    featured: false,
  },
  {
    name: "Kids Ethnic Kurta Pyjama — Festive Gold",
    slug: "demo-kids-kurta-festive",
    category: "Kids",
    subcategory: "Occasion-specific",
    description:
      "Soft cotton kurta with contrast collar and elasticated pyjama. Perfect for festivals and family photos.",
    price: 1199,
    stock: 33,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    images: pair(px(1926769), us("1515886657613-9f3515b0c78e")),
    featured: true,
  },
  {
    name: "School Shirt — White Pack",
    slug: "demo-kids-school-shirt",
    category: "Kids",
    subcategory: "Upper wear",
    description: "Crisp cotton school shirts with reinforced collar. Pack of two for weekday rotation.",
    price: 799,
    stock: 50,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: pair(px(837140), px(6311426)),
    featured: false,
  },
  {
    name: "Denim Dungarees — Indigo",
    slug: "demo-kids-dungarees-indigo",
    category: "Kids",
    subcategory: "Casual wear",
    description: "Adjustable strap dungarees with snap closures. Layer over tees year-round.",
    price: 1299,
    stock: 28,
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    images: pair(px(1043474), px(6567607)),
    featured: false,
  },
  {
    name: "Party Blazer Set — Mini Gala",
    slug: "demo-kids-blazer-gala",
    category: "Kids",
    subcategory: "Party wear",
    description: "Single-breasted blazer with dress shirt and bow tie. For birthdays and celebrations.",
    price: 2499,
    compareAtPrice: 2999,
    stock: 18,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: pair(px(2682289), px(6311668)),
    featured: false,
  },
  {
    name: "Cotton Vest Set — Inner Soft",
    slug: "demo-kids-vest-inner",
    category: "Kids",
    subcategory: "Innerwear",
    description: "Soft cotton vests and briefs for everyday comfort. Hypoallergenic dyes.",
    price: 499,
    stock: 65,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    images: pair(px(459957), px(698074)),
    featured: false,
  },
  {
    name: "Rain Jacket — Citrus",
    slug: "demo-kids-rain-citrus",
    category: "Kids",
    subcategory: "Occasion-specific",
    description: "Water-resistant shell with hood and reflective trim. Packs into its own pocket.",
    price: 1399,
    stock: 24,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: pair(px(1047542), us("1552374196-c03e06273968")),
    featured: false,
  },

  // —— Babies (8) ——
  {
    name: "Organic Cotton Onesie — Cloud",
    slug: "demo-babies-onesie-cloud",
    category: "Babies",
    subcategory: "Innerwear",
    description: "GOTS-inspired soft onesie with snap closure. Gentle on newborn skin.",
    price: 599,
    stock: 80,
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M"],
    images: pair(px(1648377), px(1043474)),
    featured: true,
  },
  {
    name: "Knit Romper Set — Buttercup",
    slug: "demo-babies-romper-butter",
    category: "Babies",
    subcategory: "Casual wear",
    description: "Cable-knit romper with matching cap. Stretch opening for easy diaper changes.",
    price: 899,
    stock: 45,
    sizes: ["0-3M", "3-6M", "6-9M"],
    images: pair(px(6311392), px(6311668)),
    featured: false,
  },
  {
    name: "Festive Baby Lehenga — Petal Pink",
    slug: "demo-babies-lehenga-petal",
    category: "Babies",
    subcategory: "Party wear",
    description: "Lightweight lehenga-choli set with elastic waist. For first festivals and photos.",
    price: 1299,
    compareAtPrice: 1599,
    stock: 22,
    sizes: ["6-9M", "9-12M", "12-18M"],
    images: pair(px(1346187), px(1926769)),
    featured: false,
  },
  {
    name: "Zip Sleepsuit 2-Pack — Night Sky",
    slug: "demo-babies-sleepsuit-night",
    category: "Babies",
    subcategory: "Innerwear",
    description: "Two-way zip sleepsuits in breathable jersey. Footed design for cosy nights.",
    price: 999,
    stock: 55,
    sizes: ["0-3M", "3-6M", "6-9M"],
    images: pair(px(9776192), px(996329)),
    featured: false,
  },
  {
    name: "Sun Hat & Bib Set — Lemon",
    slug: "demo-babies-hat-bib",
    category: "Babies",
    subcategory: "Casual wear",
    description: "Wide-brim sun hat with adjustable chin strap and matching dribble bib.",
    price: 449,
    stock: 70,
    sizes: ["0-6M", "6-12M"],
    images: pair(px(1043474), px(1648377)),
    featured: false,
  },
  {
    name: "Velour Pram Suit — Berry",
    slug: "demo-babies-pram-berry",
    category: "Babies",
    subcategory: "Occasion-specific",
    description: "Cosy velour all-in-one with fold-over mittens. Ideal for winter outings.",
    price: 1199,
    stock: 30,
    sizes: ["0-3M", "3-6M", "6-9M"],
    images: pair(px(6567607), px(6311426)),
    featured: false,
  },
  {
    name: "Muslin Swaddle 4-Pack",
    slug: "demo-babies-swaddle-pack",
    category: "Babies",
    subcategory: "Innerwear",
    description: "Large muslin swaddles in pastel prints. Gets softer with every wash.",
    price: 799,
    stock: 90,
    sizes: ["One size"],
    images: pair(px(459957), px(698074)),
    featured: false,
  },
  {
    name: "Baby Denim Overalls — Tiny",
    slug: "demo-babies-overalls-denim",
    category: "Babies",
    subcategory: "Casual wear",
    description: "Soft-stretch denim dungarees with shoulder snaps. Roomy for cloth diapers.",
    price: 949,
    stock: 38,
    sizes: ["6-9M", "9-12M", "12-18M"],
    images: pair(px(1047542), px(2897529)),
    featured: false,
  },

  // —— Elderly (8) ——
  {
    name: "Easy-Fit Cotton Kurta — Pearl",
    slug: "demo-elderly-kurta-pearl",
    category: "Elderly",
    subcategory: "Casual wear",
    description: "Front-button kurta with relaxed silhouette. Breathable cotton for daily comfort.",
    price: 1299,
    stock: 35,
    sizes: ["M", "L", "XL", "XXL"],
    images: pair(px(1926769), px(1346187)),
    featured: true,
  },
  {
    name: "Elastic Waist Trousers — Slate",
    slug: "demo-elderly-trousers-slate",
    category: "Elderly",
    subcategory: "Bottom wear",
    description: "Full elastic waist with drawstring. Deep pockets and wrinkle-resistant fabric.",
    price: 1099,
    stock: 40,
    sizes: ["M", "L", "XL", "XXL"],
    images: pair(px(1183266), px(1040945)),
    featured: false,
  },
  {
    name: "Wool Blend Cardigan — Heather",
    slug: "demo-elderly-cardigan-heather",
    category: "Elderly",
    subcategory: "Upper wear",
    description: "Button-front cardigan with patch pockets. Gentle stretch for easy layering.",
    price: 1899,
    compareAtPrice: 2299,
    stock: 26,
    sizes: ["M", "L", "XL", "XXL"],
    images: pair(px(6311392), us("1521572163474-6864f9cf17ab")),
    featured: false,
  },
  {
    name: "Festive Silk Blend Shawl — Ruby",
    slug: "demo-elderly-shawl-ruby",
    category: "Elderly",
    subcategory: "Occasion-specific",
    description: "Lightweight shawl with subtle sheen. Drapes elegantly over sarees or suits.",
    price: 1699,
    stock: 20,
    sizes: ["One size"],
    images: pair(px(1927259), px(1536619)),
    featured: false,
  },
  {
    name: "Anti-Slip House Slippers — Cocoa",
    slug: "demo-elderly-slippers-cocoa",
    category: "Elderly",
    subcategory: "Innerwear",
    description: "Memory foam insole with rubber grip sole. Wide fit for swollen feet.",
    price: 799,
    stock: 50,
    sizes: ["6", "7", "8", "9", "10"],
    images: pair(px(6311668), px(6567607)),
    featured: false,
  },
  {
    name: "Pleated Midi Skirt — Soft Grey",
    slug: "demo-elderly-skirt-grey",
    category: "Elderly",
    subcategory: "Party wear",
    description: "Comfort waist midi with knife pleats. Pairs with kurtas or blouses.",
    price: 1399,
    stock: 24,
    sizes: ["M", "L", "XL"],
    images: pair(px(985584), px(996329)),
    featured: false,
  },
  {
    name: "Thermal Vest — Winter White",
    slug: "demo-elderly-thermal-vest",
    category: "Elderly",
    subcategory: "Innerwear",
    description: "Quilted thermal vest for core warmth. Zip front and high neck.",
    price: 999,
    stock: 42,
    sizes: ["M", "L", "XL", "XXL"],
    images: pair(px(3760273), px(3771098)),
    featured: false,
  },
  {
    name: "Walking Shoes — Support Sole",
    slug: "demo-elderly-walking-shoes",
    category: "Elderly",
    subcategory: "Casual wear",
    description: "Cushioned walking shoes with wide toe box and velcro closure. Everyday support.",
    price: 2199,
    compareAtPrice: 2699,
    stock: 30,
    sizes: ["6", "7", "8", "9", "10", "11"],
    images: pair(px(10477341), px(5705490)),
    featured: false,
  },
];

const SEED_SLUGS = demoProducts.map((p) => p.slug);

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

  const toRemove = [...new Set([...LEGACY_DEMO_SLUGS, ...SEED_SLUGS])];
  const removed = await Product.deleteMany({ slug: { $in: toRemove } });
  console.log(`Removed ${removed.deletedCount} existing demo product(s) (legacy + current slugs).`);

  const inserted = await Product.insertMany(demoProducts);
  console.log(`Inserted ${inserted.length} demo products (8 per category × 5 categories):`);
  for (const cat of CATEGORIES) {
    const rows = inserted.filter((p) => p.category === cat);
    console.log(`  ${cat}: ${rows.length}`);
    rows.forEach((p) => console.log(`    - ${p.name}`));
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

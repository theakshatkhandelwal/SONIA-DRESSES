export const MEGA_MENU = {
  Women: [
    { title: "Ethnic Wear", items: ["Kurta Kurtis", "Sarees", "Ethnic Sets", "Lehengas", "Skirts", "Shawls"] },
    { title: "Western Wear", items: ["Dresses", "Tops", "Tunics", "Jeans", "T-Shirts", "Co Ord Sets"] },
    { title: "Sports & Activewear", items: ["Swim Wear", "Tights", "Track Pants", "Sports Bra"] },
    { title: "Lingerie & Sleepwear", items: ["Bra", "Panties", "Lingerie Sets", "Sleepwear"] },
  ],
  Men: [
    { title: "Top Wear", items: ["Casual Shirts", "Formal Shirts", "Polo T Shirts", "T-Shirts", "Suits & Blazers"] },
    { title: "Bottom Wear", items: ["Cargos", "Casual Trousers", "Jeans", "Joggers", "Shorts"] },
    { title: "Ethnic Wear", items: ["Ethnic Sets", "Kurtas", "Nehru Jackets", "Waist Coats"] },
    { title: "Sports Wear", items: ["Shorts", "T-Shirts", "Track Pants", "Track Suits"] },
  ],
  Kids: [
    { title: "Boys", items: ["T-Shirts", "Shirts", "Bottom Wear", "Ethnic Wear", "Coats & Jackets", "Nightwear"] },
    { title: "Girls", items: ["Dresses & Frocks", "Tees & Tops", "Bottom Wear", "Ethnic Wear", "Party Gowns", "Nightwear"] },
    { title: "Shop by Age", items: ["0-2 Years", "2-6 Years", "6-12 Years", "12-16 Years"] },
  ],
};

export function slugifyCollection(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function findCollectionLabel(category, slug) {
  const groups = MEGA_MENU[category] || [];
  const flatItems = groups.flatMap((group) => group.items);
  return flatItems.find((item) => slugifyCollection(item) === slug) || null;
}

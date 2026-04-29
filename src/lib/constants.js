export const CATEGORIES = ["Men", "Women", "Kids", "Babies", "Elderly"];

export function normalizeCategory(value) {
  if (!value) return null;
  const cleaned = String(value).trim().toLowerCase();
  return CATEGORIES.find((item) => item.toLowerCase() === cleaned) || null;
}

export const SUBCATEGORIES = [
  "Upper wear",
  "Bottom wear",
  "Innerwear",
  "Party wear",
  "Casual wear",
  "Occasion-specific",
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const PAYMENT_METHODS = ["COD", "WHATSAPP"];

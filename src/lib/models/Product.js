import mongoose, { Schema } from "mongoose";
import { CATEGORIES, SUBCATEGORIES } from "@/lib/constants";

const ProductSchema = new Schema(
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

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

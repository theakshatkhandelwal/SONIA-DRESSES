import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CATEGORIES, SUBCATEGORIES } from "@/lib/constants";

export async function GET(_, context) {
  try {
    const params = await context.params;
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(request, context) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  await connectToDB();
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (typeof payload.name === "string" && payload.name.trim()) {
    product.name = payload.name.trim();
  }
  if (typeof payload.description === "string") {
    product.description = payload.description.trim();
  }
  if (typeof payload.price === "number" && !Number.isNaN(payload.price) && payload.price >= 0) {
    product.price = payload.price;
  }
  if (typeof payload.stock === "number" && !Number.isNaN(payload.stock) && payload.stock >= 0) {
    product.stock = payload.stock;
  }
  if (typeof payload.featured === "boolean") {
    product.featured = payload.featured;
  }
  if (CATEGORIES.includes(payload.category)) {
    product.category = payload.category;
  }
  if (SUBCATEGORIES.includes(payload.subcategory)) {
    product.subcategory = payload.subcategory;
  }
  if (Array.isArray(payload.sizes) && payload.sizes.length > 0) {
    product.sizes = payload.sizes;
  }
  if ("compareAtPrice" in payload) {
    if (payload.compareAtPrice === "" || payload.compareAtPrice === null || payload.compareAtPrice === undefined) {
      product.compareAtPrice = undefined;
    } else {
      const n = Number(payload.compareAtPrice);
      if (!Number.isNaN(n) && n >= 0) product.compareAtPrice = n;
    }
  }
  if (Array.isArray(payload.images)) {
    const urls = payload.images.filter((u) => typeof u === "string" && u.trim().length > 0);
    if (urls.length === 0) {
      return NextResponse.json({ error: "At least one image URL is required" }, { status: 400 });
    }
    product.images = urls;
  }

  try {
    await product.save();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json(product);
}

export async function DELETE(_, context) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  await connectToDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}

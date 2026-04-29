import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const q = searchParams.get("q");
    const featured = searchParams.get("featured");

    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };
    if (featured === "true") filter.featured = true;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const body = await request.json();
  let baseSlug = slugify(body.name || "product");
  let slug = baseSlug;
  let n = 0;
  while (await Product.exists({ slug })) {
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
  const payload = { ...body, slug };
  const created = await Product.create(payload);
  return NextResponse.json(created, { status: 201 });
}

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(_, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const payload = await request.json();
  const updated = await Product.findByIdAndUpdate(params.id, payload, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}

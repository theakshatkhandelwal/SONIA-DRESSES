import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { imageBase64 } = body;

  if (!imageBase64) {
    return NextResponse.json({ error: "Image missing" }, { status: 400 });
  }

  const uploaded = await cloudinary.uploader.upload(imageBase64, {
    folder: "sonia-dresses",
  });

  return NextResponse.json({ url: uploaded.secure_url });
}

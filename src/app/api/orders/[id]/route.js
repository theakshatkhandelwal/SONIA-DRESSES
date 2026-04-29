import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const { status } = await request.json();
  const order = await Order.findByIdAndUpdate(params.id, { status }, { new: true });
  return NextResponse.json(order);
}

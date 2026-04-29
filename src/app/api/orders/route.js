import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendNewOrderNotification } from "@/lib/email";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const orders = await Order.find({}).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(request) {
  await connectToDB();
  const body = await request.json();
  const order = await Order.create(body);
  await sendNewOrderNotification(order);
  return NextResponse.json(order, { status: 201 });
}

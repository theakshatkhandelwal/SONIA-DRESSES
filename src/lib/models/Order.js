import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "WHATSAPP"], required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

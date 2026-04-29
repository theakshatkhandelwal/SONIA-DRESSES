export function createWhatsAppLink({ phone, customerName, address, items, total }) {
  const lines = [
    "New order from Sonia Dresses",
    `Customer: ${customerName}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    "",
    "Items:",
    ...items.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} - Rs ${item.price * item.quantity}`
    ),
    "",
    `Total: Rs ${total}`,
    "Payment: Cash on Delivery / WhatsApp",
  ];

  const message = encodeURIComponent(lines.join("\n"));
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  return `https://wa.me/${whatsappPhone}?text=${message}`;
}

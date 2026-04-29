import { Resend } from "resend";

function formatOrderPlainText(order) {
  const id = order._id?.toString?.() ?? order._id ?? "";
  const lines = [
    `New order — Sonia Dresses`,
    `Order ID: ${id}`,
    `Customer: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    `Payment: ${order.paymentMethod}`,
    `Total: Rs ${order.totalAmount}`,
    "",
    "Items:",
    ...(order.items || []).map(
      (it, i) =>
        `${i + 1}. ${it.name} — size ${it.size} × ${it.quantity} @ Rs ${it.price} = Rs ${it.price * it.quantity}`
    ),
  ];
  return lines.join("\n");
}

/** Sends store notification when RESEND_API_KEY + ORDER_NOTIFY_EMAIL are set. Never throws to callers. */
export async function sendNewOrderNotification(orderDoc) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  try {
    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM_EMAIL || "Sonia Dresses <onboarding@resend.dev>";
    const order = orderDoc?.toObject?.() ?? orderDoc;
    const id = order._id?.toString?.() ?? "";

    await resend.emails.send({
      from,
      to: [to],
      subject: `New Sonia Dresses order — Rs ${order.totalAmount} (#${id.slice(-6)})`,
      text: formatOrderPlainText(order),
    });
    return { ok: true };
  } catch (e) {
    console.error("[email] Order notification failed:", e);
    return { ok: false, error: e };
  }
}

import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Delivery information",
  description: "Shipping and delivery information for Sonia Dresses.",
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyLayout title="Delivery information">
      <p>
        We ship across India where courier coverage allows. Exact timelines depend on your pin code and product availability.
      </p>
      <h2>Processing</h2>
      <p>Orders are typically packed within 1–3 business days after confirmation (longer during sales or festivals).</p>
      <h2>Shipping</h2>
      <ul>
        <li>Standard delivery estimates are shared when you place your order or via WhatsApp.</li>
        <li>Remote areas may take additional days.</li>
        <li>Cash on delivery (COD) may be offered subject to courier support and internal checks.</li>
      </ul>
      <h2>Tracking</h2>
      <p>
        When your parcel ships, we aim to share tracking or updates on WhatsApp/SMS. Contact us if you don&apos;t hear within the promised window.
      </p>
      <h2>Incorrect address</h2>
      <p>
        Please double-check your address at checkout. Extra charges or delays from incorrect details may need to be borne by the customer.
      </p>
      <p className="text-xs text-zinc-500">
        Last updated: April 2026. Adjust fees, zones, and carriers to match your operations.
      </p>
    </PolicyLayout>
  );
}

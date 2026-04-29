import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Returns & exchanges",
  description: "Returns and exchange policy for Sonia Dresses.",
};

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout title="Returns & exchanges">
      <p>
        We want you to love your purchase. This policy explains how returns and exchanges work for orders placed through Sonia Dresses.
      </p>
      <h2>Eligibility</h2>
      <ul>
        <li>Items must be unused, with original tags attached, and in sellable condition.</li>
        <li>Intimate wear, altered pieces, or final-sale items may not be eligible — we&apos;ll confirm case by case.</li>
      </ul>
      <h2>Time window</h2>
      <p>
        Initiate a return or exchange within <strong>7 days</strong> of delivery (or handover for COD), unless a longer window was promised on the product page.
      </p>
      <h2>How to start</h2>
      <ul>
        <li>Message us on WhatsApp or email using the contact details in the footer.</li>
        <li>Share your order ID, item name, size, and reason (wrong size / defect / changed mind).</li>
        <li>We&apos;ll share pickup or courier instructions for your pin code.</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        Approved refunds for prepaid orders are processed to the original payment method where possible; COD refunds may be issued via UPI or bank transfer after we receive and inspect the item.
      </p>
      <h2>Exchanges</h2>
      <p>
        Size exchanges are subject to stock. If your size isn&apos;t available, we&apos;ll offer a refund or store credit as agreed.
      </p>
      <p className="text-xs text-zinc-500">
        Last updated: April 2026. Replace this text with advice from your legal / finance team before publishing.
      </p>
    </PolicyLayout>
  );
}

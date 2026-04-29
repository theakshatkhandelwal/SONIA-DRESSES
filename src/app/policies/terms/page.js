import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Terms & conditions",
  description: "Terms of use for Sonia Dresses online store.",
};

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms & conditions">
      <p>
        By using this website and placing an order, you agree to these terms. If you do not agree, please do not use the site.
      </p>
      <h2>Orders</h2>
      <ul>
        <li>Product descriptions and images are as accurate as reasonably possible; slight colour differences may occur.</li>
        <li>Prices and availability may change before we confirm your order.</li>
        <li>We may refuse or cancel orders in cases of pricing errors, fraud risk, or stock issues.</li>
      </ul>
      <h2>Payment</h2>
      <p>
        Supported methods (e.g. cash on delivery, WhatsApp-assisted payment) will be confirmed at checkout. You agree to pay the total shown for accepted orders.
      </p>
      <h2>Delivery</h2>
      <p>
        Estimated timelines are indicative. Risk of loss passes in line with our courier&apos;s terms once handed over for delivery.
      </p>
      <h2>Limitation</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect losses. Our total liability for any claim related to an order is limited to the amount you paid for that order.
      </p>
      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts at a jurisdiction we designate (update this with your city) shall have exclusive jurisdiction.
      </p>
      <p className="text-xs text-zinc-500">
        Last updated: April 2026. Replace placeholders with your lawyer-approved wording.
      </p>
    </PolicyLayout>
  );
}

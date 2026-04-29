import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Privacy policy",
  description: "How Sonia Dresses collects and uses your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy policy">
      <p>
        Sonia Dresses (&quot;we&quot;, &quot;us&quot;) respects your privacy. This page describes what we collect when you use our website and place orders.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Contact details you enter at checkout (name, phone, delivery address).</li>
        <li>Order contents, payment preference (e.g. COD), and communication on WhatsApp if you choose that channel.</li>
        <li>Technical data such as browser type and approximate region via standard server logs (where enabled).</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To fulfil and deliver your order, and to contact you about delivery or issues.</li>
        <li>To improve our store and customer support.</li>
        <li>To comply with law or respond to lawful requests.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell your personal data. We may share the minimum necessary with delivery partners and payment or hosting providers so we can run the business.
      </p>
      <h2>Retention</h2>
      <p>We keep order records as needed for accounting, disputes, and legal obligations.</p>
      <h2>Your choices</h2>
      <p>
        You may ask to correct your details or inquire what we hold by contacting us via the details on our Contact page.
      </p>
      <p className="text-xs text-zinc-500">
        Last updated: April 2026. Have this reviewed by a qualified professional for India-specific compliance (e.g. DPDP Act).
      </p>
    </PolicyLayout>
  );
}

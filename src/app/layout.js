import "./globals.css";
import Providers from "./providers";
import StoreShell from "@/components/StoreShell";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const description =
  "Shop women’s, men’s & kids’ fashion at Sonia Dresses — ethnic wear, dresses, denim, and everyday styles with delivery across India.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sonia Dresses | Fashion for Women, Men & Kids",
    template: "%s | Sonia Dresses",
  },
  description,
  keywords: [
    "Sonia Dresses",
    "online clothing India",
    "women ethnic wear",
    "men fashion",
    "kids clothing",
  ],
  icons: {
    icon: [{ url: "/sd.jpeg", type: "image/jpeg", sizes: "any" }],
    shortcut: "/sd.jpeg",
    apple: "/sd.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Sonia Dresses",
    title: "Sonia Dresses | Fashion for Women, Men & Kids",
    description,
    images: [{ url: "/sd.jpeg", width: 512, height: 512, alt: "Sonia Dresses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonia Dresses",
    description,
    images: ["/sd.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full bg-zinc-50 text-zinc-900" suppressHydrationWarning>
        <Providers>
          <StoreShell>{children}</StoreShell>
        </Providers>
      </body>
    </html>
  );
}

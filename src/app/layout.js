import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sonia Dresses",
  description: "Free MVP clothing e-commerce store",
  icons: {
    icon: [{ url: "/sd.jpeg", type: "image/jpeg", sizes: "any" }],
    shortcut: "/sd.jpeg",
    apple: "/sd.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full bg-zinc-50 text-zinc-900" suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 p-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

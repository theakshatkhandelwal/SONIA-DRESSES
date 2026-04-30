"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";

export default function StoreShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-zinc-100 text-zinc-900">{children}</div>;
  }

  return (
    <>
      <Header />
      <TrustStrip />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-4">{children}</main>
      <Footer />
    </>
  );
}

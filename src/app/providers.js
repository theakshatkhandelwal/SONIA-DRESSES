"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import GenderChoiceModal from "@/components/GenderChoiceModal";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <Toaster richColors closeButton position="top-center" />
        <GenderChoiceModal />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}

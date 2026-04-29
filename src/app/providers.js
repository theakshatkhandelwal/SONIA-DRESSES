"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import GenderChoiceModal from "@/components/GenderChoiceModal";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <GenderChoiceModal />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    const cached = localStorage.getItem("cart_items");
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  function addToCart(payload) {
    setItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === payload.productId && item.size === payload.size
      );

      if (idx === -1) return [...prev, { ...payload, quantity: 1 }];
      return prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function updateQuantity(index, quantity) {
    if (quantity < 1) return;
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, quantity } : item)));
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, total, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

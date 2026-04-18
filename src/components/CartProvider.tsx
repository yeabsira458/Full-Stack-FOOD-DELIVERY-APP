"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  // 1. Load cart from browser storage
  useEffect(() => {
    const savedCart = localStorage.getItem("massimo_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // 2. Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("massimo_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
  };

  // 3. Fixed removal logic: Filter by matching both ID AND Option Title
  const removeFromCart = (item: any) => {
    setCart((prev) =>
      prev.filter(
        (prevItem) =>
          prevItem.id !== item.id || prevItem.optionTitle !== item.optionTitle,
      ),
    );
  };

  const clearCart = () => setCart([]);

  // 4. Calculate stats for the UI
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const totalItem = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

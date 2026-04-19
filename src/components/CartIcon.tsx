"use client";
import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  // Pull totalItem from your CartContext
  const { totalItem } = useCart();

  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      {/* Dynamic count based on the number of items in the cart array */}
      <span>Cart ({totalItem})</span>
    </Link>
  );
};

export default CartIcon;

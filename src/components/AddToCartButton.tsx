"use client";
import { useCart } from "@/components/CartProvider";
import React from "react";

const AddToCartButton = ({ item }: { item: any }) => {
  const { addToCart } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    // This stops the click from also triggering the <Link> to the product page
    e.preventDefault();

    addToCart({
      id: item.$id,
      title: item.title,
      img: item.img,
      price: item.price,
      // Default to no options or first option since we are adding quickly
      optionTitle: "",
      quantity: 1,
    });

    alert("Item is added to cart!");
  };

  return (
    <button
      onClick={handleClick}
      className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

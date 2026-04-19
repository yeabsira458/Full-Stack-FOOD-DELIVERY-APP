"use client";
import { useCart } from "@/components/CartProvider";
import React from "react";
import toast from "react-hot-toast";

const AddToCartButton = ({ item }: { item: any }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents clicking through to the product page

    addToCart({
      id: item.$id,
      title: item.title,
      img: item.img,
      price: item.price,
      optionTitle: "",
      quantity: 1,
    });

    // Replaces the alert with a disappearing notification
    toast.success("Item added to cart!");
  };

  return (
    <button
      onClick={handleAdd}
      className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md text-sm font-bold mt-2"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

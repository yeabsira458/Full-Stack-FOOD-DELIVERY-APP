"use client";
import { featuredProducts } from "@/data";
import Image from "next/image";
import React from "react";
import { useCart } from "@/components/CartProvider"; // Import your cart hook
import toast from "react-hot-toast";

const Featured = () => {
  const { addToCart } = useCart(); // Access the addToCart function

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[70vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-[2] w-full hover:rotate-[60deg] transition-all duration-500">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8 text-sm md:text-base">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button 
                onClick={() => {
                  addToCart(item); // Add the specific item to the cart state
                  toast.success(`${item.title} added to cart!`);
                }}
                className="bg-red-500 text-white p-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
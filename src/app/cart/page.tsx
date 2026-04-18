"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import {
  databases,
  DATABASE_ID,
  ORDER_COLLECTION_ID,
} from "@/app/utills/appwrite";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";

const CartPage = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      // Create the order in Appwrite
      await databases.createDocument(
        DATABASE_ID,
        ORDER_COLLECTION_ID,
        ID.unique(),
        {
          userEmail: user.email,
          price: totalPrice,
          status: "Pending",
          // We stringify the cart array to save it in our String column
          product: JSON.stringify(cart),
        },
      );

      clearCart();
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-red-500">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cart.map((item: any, index: number) => (
          <div className="flex items-center justify-between mb-4" key={index}>
            <Image
              src={item.img || "/temporary/p1.png"}
              alt=""
              width={100}
              height={100}
            />
            <div>
              <h1 className="uppercase text-xl font-bold">{item.title}</h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">${item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(index)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({cart.length} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL (INCL. VAT)</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-34 self-end"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

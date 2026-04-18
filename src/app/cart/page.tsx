"use client";
import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      // If not logged in, send to login
      router.push("/login");
    } else {
      // If logged in, send to payment page
      router.push("/pay");
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row bg-white">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cart.length === 0 ? (
          <h1 className="text-xl font-bold">Your cart is empty!</h1>
        ) : (
          cart.map((item: any) => (
            <div
              className="flex items-center justify-between mb-4"
              key={`${item.id}-${item.optionTitle}`}
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div>
                <h1 className="uppercase text-xl font-bold">
                  {item.title} x{item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">${item.price.toFixed(2)}</h2>
              {/* REMOVE ITEM BUTTON */}
              <span
                className="cursor-pointer font-extrabold text-2xl px-2 hover:text-black"
                onClick={() => removeFromCart(item)}
              >
                X
              </span>
            </div>
          ))
        )}
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
          <span className="text-green-500 font-bold">FREE!</span>
        </div>
        <hr className="my-2 border-red-500" />
        <div className="flex justify-between font-bold">
          <span>TOTAL (INCL. VAT)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end disabled:bg-red-300 disabled:cursor-not-allowed uppercase"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

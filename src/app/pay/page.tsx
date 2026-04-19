"use client";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import {
  databases,
  DATABASE_ID,
  ORDER_COLLECTION_ID,
} from "@/app/utills/appwrite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ID } from "appwrite";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Auto-fill the email from the logged-in user
  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handlePayment = async () => {
    if (!user) return router.push("/login");
    if (cart.length === 0) return toast.error("Your cart is empty!");

    try {
      toast.loading("Redirecting to SantimPay...");

      // 1. Logic for SantimPay API would go here in the future
      // const paymentLink = await getSantimPayUrl(totalPrice);

      // 2. Create the document in Appwrite
      await databases.createDocument(
        DATABASE_ID,
        ORDER_COLLECTION_ID,
        ID.unique(),
        {
          userEmail: email, // Matches 'userEmail' required string
          price: Number(totalPrice), // Matches 'price' double
          Status: "awaiting payment", // Initial status for bank flow
          product: JSON.stringify(cart), // Matches 'product' string
        }
      );

      // 3. Clear the cart and redirect
      clearCart();
      toast.dismiss();
      toast.success("Order recorded. Please complete payment.");
      
      // For now, redirect to orders. Later, redirect to SantimPay link.
      router.push("/orders");
    } catch (err: any) {
      toast.dismiss();
      console.error("Payment Error:", err);
      // Display the specific Appwrite error message
      toast.error(err.message || "Database error. Check your console.");
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 flex flex-col gap-8 text-red-500 bg-white min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-bold uppercase">Checkout Details</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        
        {/* FORM CONTAINER */}
        <div className="flex-[2] flex flex-col gap-6">
          <section>
            <h2 className="font-semibold mb-4 text-gray-400 uppercase text-sm">
              Card Information
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
              />
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Card number"
                  className="flex-[2] p-4 ring-1 ring-gray-200 rounded-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-4 text-gray-400 uppercase text-sm">
              Delivery Address
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full name"
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none"
              />
              <input
                type="text"
                placeholder="Street address"
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none"
              />
            </div>
          </section>

          <button
            onClick={handlePayment}
            className="bg-red-500 text-white p-4 rounded-md w-full md:w-40 font-bold uppercase hover:bg-red-600 transition-colors"
          >
            Pay now
          </button>
        </div>

        {/* SUMMARY CONTAINER */}
        <div className="flex-1 bg-fuchsia-50 p-8 rounded-lg h-fit flex flex-col gap-4">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-500 font-bold">FREE!</span>
          </div>
          <hr className="border-red-200" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
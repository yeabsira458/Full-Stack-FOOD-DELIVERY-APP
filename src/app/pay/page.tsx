"use client";
import React from "react";

const PaymentPage = () => {
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
                placeholder="Email"
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
              />
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Card number"
                  className="flex-[2] p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
                />
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
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
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
              />
              <input
                type="text"
                placeholder="Street address"
                className="p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
              />
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="City"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="flex-1 p-4 ring-1 ring-gray-200 rounded-sm outline-none focus:ring-red-300"
                />
              </div>
            </div>
          </section>

          <button className="bg-red-500 text-white p-4 rounded-md w-full md:w-40 self-start font-bold uppercase">
            Pay now
          </button>
        </div>

        {/* SUMMARY CONTAINER */}
        <div className="flex-1 bg-fuchsia-50 p-8 rounded-lg h-fit flex flex-col gap-4">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$44.00</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-500 font-bold">FREE!</span>
          </div>
          <hr className="border-red-200" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>$44.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

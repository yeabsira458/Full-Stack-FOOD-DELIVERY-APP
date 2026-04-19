"use client";
import { useAuth } from "@/components/AuthProvider";
import {
  databases,
  DATABASE_ID,
  ORDER_COLLECTION_ID,
} from "@/app/utills/appwrite";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    if (!user?.email) return;
    try {
      // If admin, show all orders. If client, filter by email.
      const isAdmin = user?.labels?.includes("admin");
      const queries = isAdmin ? [] : [Query.equal("userEmail", user.email)];

      const res = await databases.listDocuments(
        DATABASE_ID,
        ORDER_COLLECTION_ID,
        queries,
      );
      setOrders(res.documents);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    try {
      await databases.updateDocument(DATABASE_ID, ORDER_COLLECTION_ID, id, {
        Status: status, // Matches your 'Status' column
      });
      toast.success("Order has been updated"); //
      fetchOrders(); // Refresh list to show green color immediately
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 bg-white min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-bold mb-4 text-red-500 uppercase">
        {user?.labels?.includes("admin") ? "All Orders (Admin)" : "My Orders"}
      </h1>
      <table className="w-full border-separate border-spacing-3 text-red-500">
        <thead>
          <tr className="text-left">
            <th className="hidden md:table-cell">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:table-cell">Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            const isDelivered = item.Status?.toLowerCase() === "delivered";
            return (
              <tr
                key={item.$id}
                className={`text-sm md:text-base transition-colors ${
                  isDelivered ? "bg-green-50 text-green-700" : "bg-fuchsia-50"
                }`}
              >
                <td className="hidden md:table-cell py-4 px-2">{item.$id}</td>
                <td className="py-4 px-2">{item.$createdAt.split("T")[0]}</td>
                <td className="py-4 px-2">${item.price.toFixed(2)}</td>
                <td className="hidden md:table-cell py-4 px-2">
                  {JSON.parse(item.product || "[]")[0]?.title || "Pizza"}...
                </td>
                <td className="py-4 px-2">
                  {user?.labels?.includes("admin") ? (
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => handleUpdate(e, item.$id)}
                    >
                      <input
                        placeholder={item.Status}
                        className="p-1 ring-1 ring-red-200 rounded-md outline-none w-24 text-black"
                      />
                      <button className="bg-red-500 text-white p-1 rounded-full">
                        ✓
                      </button>
                    </form>
                  ) : (
                    <span
                      className={`font-bold ${isDelivered ? "text-green-600" : ""}`}
                    >
                      {item.Status}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;

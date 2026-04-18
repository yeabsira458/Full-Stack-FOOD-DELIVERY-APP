"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/app/utills/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // 1. Protection: If not logged in, kick to login page
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        let queries = [Query.orderDesc("$createdAt")]; // Show newest orders first

        // 2. Logic: If the user is NOT an admin, filter by their email
        // (Assuming you've added the 'admin' label in Appwrite console)
        if (user && !user.labels?.includes("admin")) {
          queries.push(Query.equal("userEmail", user.email));
        }

        const response = await databases.listDocuments(
          "69bbecb8d0014dc4b79cd", // Your Database ID
          "order", // Your Order Collection ID
          queries,
        );
        setOrders(response.documents);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (user) fetchOrders();
  }, [user, loading, router]);

  if (loading)
    return <div className="p-10 text-center text-red-500">Loading...</div>;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.$id} className="text-sm md:text-base bg-red-50">
              <td className="hidden md:block py-6 px-1">{order.$id}</td>
              <td className="py-6 px-1">
                {new Date(order.$createdAt).toLocaleDateString()}
              </td>
              <td className="py-6 px-1 font-bold text-red-600">
                {order.status || "Pending"}
              </td>
              <td className="py-6 px-1">
                {/* Admin can see an Edit button, Users see View */}
                {user?.labels?.includes("admin") ? (
                  <button className="bg-red-500 text-white p-2 rounded">
                    Edit Status
                  </button>
                ) : (
                  <span>Details</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;

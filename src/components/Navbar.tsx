"use client"; // Must be a client component to use the Auth context
import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider"; // Import the hook
import { account } from "@/app/utills/appwrite"; // Import account for logout
import { redirect } from "next/dist/server/api-utils";

const Navbar = () => {
  // Use the real user data from your AuthProvider
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Ends the Appwrite session

      window.location.href = "/"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div className="flex-1 text-right">...</div>;

  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Massimo</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>

        {/* Dynamic Button Logic */}
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/orders">Orders</Link>
            <span className="cursor-pointer" onClick={handleLogout}>
              Logout
            </span>
          </div>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;

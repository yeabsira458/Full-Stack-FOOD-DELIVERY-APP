"use client";
import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { account } from "@/app/utills/appwrite";

const Navbar = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      window.location.href = "/";
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
          <span>945854375 </span>
        </div>

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
        {/* This is now dynamic */}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;

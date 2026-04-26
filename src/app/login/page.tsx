"use client";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { account, databases } from "@/app/utills/appwrite";
import { OAuthProvider } from "appwrite";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem("massimo_cart");
      const hasItems = savedCart ? JSON.parse(savedCart).length > 0 : false;
      router.push(hasItems ? "/pay" : "/");
    }
  }, [user, router]);

  const signInWithGoogle = () => {
    const origin = window.location.origin; 
    
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${origin}/`,      // Success: goes to Home
      `${origin}/login` // Failure: stays on Login
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="p-4 min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row h-full w-full shadow-2xl rounded-md overflow-hidden lg:w-[70%] 2xl:w-1/2 bg-white max-w-[1000px]">
        {/* IMAGE SIDE */}
        <div className="relative hidden md:block md:w-1/2 min-h-[400px]">
          <Image
            src="/loginBg.png"
            alt="Massimo"
            fill
            className="object-cover"
          />
        </div>

        {/* LOGIN SIDE */}
        <div className="p-10 flex flex-col justify-center items-center gap-8 md:w-1/2">
          <div className="text-center">
            <h1 className="font-bold text-2xl xl:text-3xl text-gray-800">
              Welcome to Massimo
            </h1>
            <p className="text-gray-500 mt-2">Sign in to manage your orders</p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-4 p-4 ring-2 ring-orange-100 rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-sm active:scale-95"
          >
            <Image src="/google.png" alt="Google" width={24} height={24} />
            <span className="text-black font-semibold text-lg">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
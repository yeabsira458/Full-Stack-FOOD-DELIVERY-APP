"use client";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { account, syncUserToDatabase } from "@/app/utills/appwrite";
import { ID } from "appwrite"; // Added this back
import { handleAuth } from "@/app/utills/auth";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // State for Email/Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem("massimo_cart");
      const hasItems = savedCart ? JSON.parse(savedCart).length > 0 : false;
      router.push(hasItems ? "/pay" : "/");
    }
  }, [user, router]);

  // FIXED: Removed "export" and "ID" errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // We pass the 'name' only if we are in register mode
    await handleAuth(email, password, isRegister ? name : undefined);
  };

  const signInWithGoogle = () => {
    const redirectUrl = window.location.origin;
    account.createOAuth2Session("google", redirectUrl, `${redirectUrl}/login`);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row h-full w-full shadow-2xl rounded-md overflow-hidden lg:w-[70%] 2xl:w-1/2 bg-white">
        {/* IMAGE CONTAINER */}
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="Login Background"
            fill
            className="object-cover"
          />
        </div>

        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col justify-center gap-6 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500 text-black"
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500 text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500 text-black"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
            >
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-2 text-sm">
            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-orange-500 underline font-semibold"
            >
              {isRegister ? "Login here" : "Register here"}
            </button>
          </div>

          <div className="relative">
            <hr className="border-gray-200" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400 text-xs">
              OR
            </span>
          </div>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-4 p-3 ring-1 ring-orange-100 rounded-md hover:bg-orange-50 transition"
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span className="text-black">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

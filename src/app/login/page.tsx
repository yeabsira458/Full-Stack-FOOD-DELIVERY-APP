"use client";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { account } from "@/app/utills/appwrite"; // Adjusted path
import { OAuthProvider } from "appwrite";
import { handleAuth } from "@/app/utills/auth"; // Import the new logic

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // State for Email/Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Needed for new users
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login/Register

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem("massimo_cart");
      const hasItems = savedCart ? JSON.parse(savedCart).length > 0 : false;
      router.push(hasItems ? "/pay" : "/");
    }
  }, [user, router]);

  // Handle Manual Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Pass name only if registering
    await handleAuth(email, password, isRegister ? name : undefined);
  };

  const signInWithGoogle = () => {
    // FIX: Use window.location.origin instead of localhost:3000
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";
    account.createOAuth2Session(
      OAuthProvider.Google,
      origin,
      `${origin}/login`,
    );
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row h-full w-full shadow-2xl rounded-md overflow-hidden lg:w-[70%] 2xl:w-1/2 bg-white">
        {/* IMAGE CONTAINER */}
        <div className="relative hidden md:block md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>

        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col justify-center gap-6 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>

          {/* EMAIL/PASS FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500"
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 ring-1 ring-gray-200 rounded-md outline-orange-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition">
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

          {/* SOCIAL BUTTONS */}
          <div className="flex flex-col gap-2">
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-4 p-3 ring-1 ring-orange-100 rounded-md hover:bg-orange-50"
            >
              <Image src="/google.png" alt="" width={20} height={20} />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";
import { useAuth } from "@/components/AuthProvider";
import { account } from "@/app/utills/appwrite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { OAuthProvider } from "appwrite";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  //kezi
  // Inside LoginPage.tsx
  useEffect(() => {
    if (user) {
      // If they have items in their cart, send them to payment immediately
      // Otherwise, send them to the homepage
      const savedCart = localStorage.getItem("massimo_cart");
      const hasItems = savedCart ? JSON.parse(savedCart).length > 0 : false;

      if (hasItems) {
        router.push("/pay");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);
  //eskezih

  const signInWithGoogle = () => {
    // Appwrite OAuth2 handles the redirect for you
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000",
      "http://localhost:3000/login",
    );
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className="flex flex-col md:flex-row h-full w-full shadow-2xl rounded-md overflow-hidden md:h-[70%] lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="Login Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col justify-center gap-8 md:w-1/2 bg-white">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p className="text-gray-600">
            Log into your account or create a new one using social buttons
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md hover:bg-orange-50 transition"
            >
              <Image
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>Sign in with Google</span>
            </button>

            <button className="flex items-center gap-4 p-4 ring-1 ring-blue-100 rounded-md hover:bg-blue-50 transition">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>Sign in with Facebook</span>
            </button>
          </div>

          <p className="text-sm">
            Have a problem?{" "}
            <Link className="underline text-blue-600" href="/">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// src/components/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { account, databases } from "@/app/utills/appwrite"; // Ensure databases is exported from your utils

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const activeUser = await account.get();
        setUser(activeUser);

        // SYNC IN BACKGROUND: If DB fails, we still keep the user logged in
        try {
          await syncUserToDatabase(activeUser);
        } catch (dbError: any) {
          console.error("Database sync background error:", dbError.message);
        }
        
      } catch (error: any) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Define the helper function inside or outside the component
  const syncUserToDatabase = async (loggedInUser: any) => {
    try {
      await databases.createDocument(
        "69bbecb70020cc3cb06d", // Your Database ID from your screenshot
        "user", // Your Collection ID (usually the name of the table)
        loggedInUser.$id, // Use the same ID from Auth as the Document ID
        {
          name: loggedInUser.name,
          email: loggedInUser.email,
          isAdmin: false,
        },
      );
      console.log("User successfully saved to Appwrite DB");
    } catch (error: any) {
      // Error 409 means "Document already exists," which is good!
      if (error.code !== 409) {
        console.error("Sync error:", error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

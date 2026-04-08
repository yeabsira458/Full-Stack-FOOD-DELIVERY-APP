import { account } from "./appwrite";
import { ID } from "appwrite";

// Login function
export const login = async (email: string, pass: string) => {
  try {
    // This creates a "Session" (logs the user in)
    await account.createEmailPasswordSession(email, pass);
    window.location.href = "/"; // Redirect to home after success
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid credentials!");
  }
};

// Register function
export const register = async (email: string, pass: string, name: string) => {
  try {
    await account.create(ID.unique(), email, pass, name);
    await login(email, pass); // Log them in immediately after registering
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

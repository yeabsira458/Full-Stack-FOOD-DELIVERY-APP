import { account, syncUserToDatabase } from "./appwrite";
import { ID } from "appwrite";

export const register = async (email: string, pass: string, name: string) => {
  try {
    // 1. Create the Auth Account
    const newUserAuth = await account.create(ID.unique(), email, pass, name);

    // 2. Immediately Log them in to get a session
    await account.createEmailPasswordSession(email, pass);

    // 3. Sync their details to your User Collection
    await syncUserToDatabase(newUserAuth);

    window.location.href = "/";
  } catch (error: any) {
    console.error("Registration failed:", error.message);
    // If you see "User already exists", the user should just Login instead
    alert("Error: " + error.message);
  }
};

export const login = async (email: string, pass: string) => {
  try {
    await account.createEmailPasswordSession(email, pass);
    window.location.href = "/";
  } catch (error: any) {
    console.error("Login failed:", error.message);
    alert("Invalid credentials!");
  }
};

export const handleAuth = async (email: string, pass: string, name?: string) => {
  if (name) {
    await register(email, pass, name);
  } else {
    await login(email, pass);
  }
};

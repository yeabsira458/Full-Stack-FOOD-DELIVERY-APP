import { account, syncUserToDatabase } from "./appwrite";
import { ID } from "appwrite";

export const handleAuth = async (
  email: string,
  pass: string,
  name?: string,
) => {
  try {
    // If the user provided a name, they WANT to register
    if (name) {
      try {
        const newUserAuth = await account.create(
          ID.unique(),
          email,
          pass,
          name,
        );
        await account.createEmailPasswordSession(email, pass);
        await syncUserToDatabase(newUserAuth);
        window.location.href = "/";
      } catch (error: any) {
        // SMART FIX: If they try to register but already have an account, just log them in!
        if (error.code === 409) {
          await account.createEmailPasswordSession(email, pass);
          window.location.href = "/";
        } else {
          alert("Registration Error: " + error.message);
        }
      }
    } else {
      // If no name, they just want to Login
      await account.createEmailPasswordSession(email, pass);
      window.location.href = "/";
    }
  } catch (error: any) {
    console.error("Auth failed:", error.message);
    alert("Login failed: Check your email/password or try Registering.");
  }
};

import { Client, Account, Databases } from "appwrite";

// 1. Initialize the Client once
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// 2. Export the services
export const account = new Account(client);
export const databases = new Databases(client);

// 3. Export your IDs from .env.local
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const ORDER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID!;
export const USER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

// 4. Export the sync function so AuthProvider can call it
export const syncUserToDatabase = async (loggedInUser: any) => {
  try {
    await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      loggedInUser.$id, // Use the Appwrite Auth ID as the Document ID
      {
        name: loggedInUser.name,
        email: loggedInUser.email,
        isAdmin: false,
        image: loggedInUser.prefs?.image || "", // Optional: Google profile pic
      },
    );
    console.log("User synced to database successfully!");
  } catch (error: any) {
    // 409 means the user is already in the database (returning customer)
    if (error.code !== 409) {
      console.error("Database sync failed:", error.message);
    }
  }
};

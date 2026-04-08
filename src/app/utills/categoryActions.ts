import { Query } from "appwrite";
import { databases } from "./appwrite";

export const getCategories = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID!,
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const getProducts = async (catSlug: string) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID!, // Using the variable
      [Query.equal("category.slug", catSlug)],
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

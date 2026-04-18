import {
  databases,
  DATABASE_ID,
  PRODUCT_COLLECTION_ID,
} from "@/app/utills/appwrite";
import Price from "@/components/Price";
import Image from "next/image";
import React from "react";

// This function fetches one specific product from Appwrite
const getSingleProduct = async (id: string) => {
  try {
    const res = await databases.getDocument(
      DATABASE_ID,
      "product", // This matches your collection name in Appwrite
      id,
    );
    return res;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await getSingleProduct(id);

  if (!product) {
    return <div className="p-4 text-center">Product not found!</div>;
  }

  // CLEANING THE DATA: We convert the Appwrite document into a plain JavaScript object.
  // This removes hidden internal functions that cause the "Serialization Error".
  const plainProduct = {
    id: product.$id,
    title: product.title,
    desc: product.desc,
    img: product.img,
    price: product.price,
    // Ensure options are an array even if stored as a string in Appwrite
    options:
      typeof product.options === "string"
        ? JSON.parse(product.options)
        : product.options,
  };

  return (
    // Use h-[calc(100vh-6rem)] to keep it within the screen and justify-center to align items
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col justify-center text-red-500 md:flex-row md:gap-8 md:items-center bg-white">
      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-1/2 md:h-[70%]">
        {plainProduct.img ? (
          <Image
            src={plainProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center border-2 border-dashed text-gray-400">
            No Image Available
          </div>
        )}
      </div>
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {plainProduct.title}
        </h1>
        <p className="text-gray-700">{plainProduct.desc}</p>
        <Price
          price={plainProduct.price}
          options={plainProduct.options}
          product={plainProduct}
        />
      </div>
    </div>
  );
};

export default SingleProductPage;

import { getProducts } from "@/app/utills/categoryActions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "@/components/AddToCartButton";

// 1. FORCE THE PAGE TO ALWAYS FETCH NEW DATA FROM APPWRITE
export const revalidate = 0;

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  // params.category will be "pizzas", "burgers", or "pastas" based on the URL
  const products = await getProducts(params.category);

  // 2. DEBUG CHECK: If this shows up, your Appwrite 'category' column
  // needs to match the URL slug (e.g., 'pizzas') instead of an ID.
  if (!products || products.length === 0) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center text-red-500 font-bold p-4 text-center">
        No products found for &quot;{params.category}&quot;. <br />
        Check that your Appwrite Product collection has &quot;Read&quot; permissions
        enabled for Role: Any.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap text-red-500 bg-white min-h-[calc(100vh-6rem)]">
      {products.map((item: any) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-fuchsia-100 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.$id}`}
          key={item.$id}
        >
          {/* IMAGE CONTAINER */}
          {/* Note: Ensure your DB path uses forward slashes like /temporary/p1.png */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>

            {/* This component handles its own state for the cart */}
            <AddToCartButton item={item} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;

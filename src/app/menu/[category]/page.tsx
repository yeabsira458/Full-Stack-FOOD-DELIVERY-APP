import { getProducts } from "@/app/utills/categoryActions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "@/components/AddToCartButton";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const products = await getProducts(params.category);

  return (
    <div className="flex flex-wrap text-red-500 bg-white min-h-[calc(100vh-6rem)]">
      {products.map((item: any) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-fuchsia-100 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.$id}`}
          key={item.$id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>

            {/* NO ALERT HERE: TOASTER LOGIC INSIDE THIS COMPONENT */}
            <AddToCartButton item={item} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;

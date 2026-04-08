import Link from "next/link";
import React from "react";
import { getCategories } from "@/app/utills/categoryActions"; // Adjust this path to your file

const MenuPage = async () => {
  // 1. Fetch the data from Appwrite
  const categories = await getCategories();

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center bg-white">
      {categories.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.$id} // Appwrite uses $id
          className="w-full h-1/3 md:h-[60vh] flex-1 bg-cover p-8 transition-all duration-300 hover:opacity-90"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          {/* Using category.color from your DB. Make sure "color" is an attribute in Appwrite */}
          <div style={{ color: category.color || "black" }} className="w-1/2">
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8 font-semibold">{category.desc}</p>
            <button
              style={{
                backgroundColor: category.color || "red",
                color: category.color === "black" ? "white" : "black",
              }}
              className="block py-2 px-4 rounded-md font-bold mt-4"
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;

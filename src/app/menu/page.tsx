import Link from "next/link";
import React from "react";

const MenuPage = async () => {
  const res = await fetch("/api/categories");
  const categories = await res.json();

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center bg-white">
      {categories.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 md:h-[60vh] flex-1 bg-cover p-8 transition-all duration-300 hover:opacity-90"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          {/* We use inline styles for the color because Tailwind can't guess dynamic variables */}
          <div style={{ color: category.color }} className="w-1/2">
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8 font-semibold">{category.desc}</p>
            <button
              style={{
                backgroundColor: category.color,
                color: category.color === "black" ? "white" : "red",
              }}
              className="hidden 2xl:block py-2 px-4 rounded-md font-bold"
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

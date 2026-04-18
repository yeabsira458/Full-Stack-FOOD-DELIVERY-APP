"use client";
import { useCart } from "@/components/CartProvider"; // Ensure this path is correct
import React, { useEffect, useState } from "react";

const Price = ({ price, options, product }: any) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCart(); //

  useEffect(() => {
    const additional =
      options && options.length > 0 && options[selected]
        ? options[selected].additionalPrice
        : 0;
    setTotal(quantity * (Number(price) + Number(additional)));
  }, [quantity, selected, options, price]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      optionTitle: options && options.length > 0 ? options[selected].title : "",
      quantity: quantity,
    });
    alert("Item is added to cart!"); // Your requested alert message
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      <div className="flex gap-4">
        {options?.length > 0 &&
          options.map((option: any, index: number) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
              style={{
                background: selected === index ? "rgb(239 68 68)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      <div className="flex justify-between items-center ring-1 ring-red-500 rounded-md">
        <div className="flex justify-between w-full p-3">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              {">"}
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;

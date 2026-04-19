"use client";
import { useCart } from "@/components/CartProvider";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // 1. Import toast

const Price = ({ price, options, product }: any) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCart();

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

    // 2. Use toast instead of alert
    toast.success("Item has been added to the cart!");
  };

  return (
    // ... your existing UI ...
    <button onClick={handleAddToCart} className="...">
      Add to Cart
    </button>
  );
};

export default Price;

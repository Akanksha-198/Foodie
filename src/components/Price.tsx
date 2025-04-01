"use client";

import { ProductType } from "@/types/type";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity *
      (product.options?.length
        ? Number(product.price) + Number(product.options[selected].additionalPrice)
        : Number(product.price))
    );
  }, [quantity, selected, product]);
  const handleCart= () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: total,
      quantity: quantity,
      img: product.img,
      ...(product.options?.length&& {optionTitle: product.options[selected].title}),
    });
    toast.success("The product added to Cart.");
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">₹{total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-green-400 rounded-md"
              style={{
                background: selected === index ? "black" : "white",
                color: selected === index ? "white" : "black",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-green-600 rounded-l-xl ">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"- <"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {"> +"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-green-500 text-white p-3 ring-1 ring-green-700 rounded-r-xl"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;



import { ProductType } from "@/types/type";
import Image from "next/image";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 mt-[5rem] sm:mt-3 lg:px-8">
      <h2 className="text-2xl text-red-500 font-semibold tracking-wide mt-2">
        SPECIAL DISHES
      </h2>
      <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-8 sm:mb-2">
        Standout Dishes From Our Menu
      </h1>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-8 pb-4">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="w-80 flex-shrink-0 flex flex-col items-center justify-between p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              {item.img && (
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-col items-center justify-center text-center gap-2 mt-4">
                <h1 className="text-xl font-bold uppercase text-green-600">{item.title}</h1>
                <p className="text-sm text-gray-700 line-clamp-2">{item.desc}</p>
                <span className="text-lg font-bold text-green-600">₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
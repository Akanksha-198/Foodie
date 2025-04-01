

import { ProductType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">{params.category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <Link href={`/product/${item.id}`} key={item.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              {/* IMAGE CONTAINER */}
              <div className="flex justify-center pt-6">
                {item.img && (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-green-500">
                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                  </div>
                )}
              </div>
              {/* TEXT CONTAINER */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
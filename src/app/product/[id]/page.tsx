

import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/type";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);
  return (
    <div className="p-3 lg:px-20 xl:px-40 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-64 h-64 mx-auto sm:w-96 sm:h-96 lg:w-[20rem] lg:h-[20rem] xl:w-[22rem] xl:h-[22rem] rounded-full overflow-hidden">
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            className="object-cover"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="flex flex-col gap-4 lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{singleProduct.title}</h1>
        <p className="text-gray-600">{singleProduct.desc}</p>
        <Price product={singleProduct} />
        <DeleteButton id={singleProduct.id} />
      </div>
    </div>
  );
};

export default SingleProductPage;

"use client";
import { useCartStore } from "@/utils/store";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  
  return (
    <Link href="/cart" className="relative flex items-center">
      <div className="p-2 bg-white rounded-full border-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 text-black font-semibold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 10-8 0v4m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"
          />
        </svg>
      </div>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-green-500 text-white text-xs font-bold rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
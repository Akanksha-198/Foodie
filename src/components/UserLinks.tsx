
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex items-center space-x-4">
          <Link href="/orders" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
            Orders
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-white text-green-500 px-4 py-2 rounded-md border border-green-500 hover:bg-green-100 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          Login
        </Link>
      )}
    </div>
  );
};

export default UserLinks;
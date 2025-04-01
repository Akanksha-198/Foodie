import Link from "next/link";
import React from "react";
import { MenuType } from "../../types/type";
import AddButton from "@/components/AddButton";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

const MenuPage = async () => {
  const menu: MenuType = await getData();
  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center gap-10 relative">
    <AddButton />

      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-[300px] md:h-[400px] bg-cover p-8 rounded-lg relative overflow-hidden group"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-50" />
          <div className={`relative z-10 h-full flex flex-col justify-between text-${category.color}`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <div>
              <p className="text-sm font-semibold mb-4">{category.desc}</p>
              <button className={`hidden 2xl:block bg-green-500 text-${category.color === "black" ? "green-500" : "white"} py-2 px-4 rounded-md`}>
                Explore
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
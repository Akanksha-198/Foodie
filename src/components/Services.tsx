"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { GiBowlOfRice, GiPocketWatch } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { FaGifts } from "react-icons/fa";

type IconProps = {
  icon?: string | IconType;
  title: string;
  description: string;
};

const IconCard = ({ icon, title, description }: IconProps) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:cursor-pointer transition-shadow duration-300 h-72 w-72">
      {typeof icon === "string" ? (
        <Image src={icon} alt={title} width={24} height={24} />
      ) : (
        icon && React.createElement(icon, { size: 100, color: "#22c55e" })
      )}
      <h2 className="text-green-500 text-xl font-bold mt-6">{title}</h2>
      <p className="mt-4 text-green-700 text-sm font-semibold text-center">{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
        <h2 className="text-2xl text-green-500 font-semibold tracking-wide mt-2">
          OUR STORY & SERVICES
        </h2>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
          Our Culinary Journey And Services
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Rooted in passion, we curate unforgettable dining experiences and
          offer exceptional services, blending culinary artistry with warm
          hospitality.
        </p>
        <div className="mt-10 space-x-4">
          <Link href="/menu" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
            Explore Menu
          </Link>
         
        </div>
      </div>
      <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 rounded-lg shadow-lg p-6">
        <IconCard
          icon={GiBowlOfRice}
          title="CATERING"
          description="Delight your guests with our flavors and presentation"
        />
        <IconCard
          icon={GiPocketWatch}
          title="FAST DELIVERY"
          description="We deliver your order promptly to your door"
        />
        <IconCard
          icon={FiShoppingCart}
          title="ONLINE ORDERING"
          description="Explore menu & order with ease using our Online Ordering"
        />
        <IconCard
          icon={FaGifts}
          title="GIFT CARDS"
          description="Give the gift of exceptional dining with Foodi Gift Cards"
        />
      </div>
    </div>
  );
};

export default Services;
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const CHEF = [
  { url: '/female.jpg', alt: 'chef1' },
  { url: '/male.jpg', alt: 'chef2' },
  { url: '/female2.jpg', alt: 'chef3' },
  { url: '/male2.jpg', alt: 'chef4' },
];

const Chef = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CHEF.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <div className="relative flex justify-center items-center w-full max-w-[500px] overflow-hidden bg-gray-300 rounded-bl-3xl rounded-tr-5xl rounded-tl-5xl rounded-br-3xl">
          <Image
            key={currentIndex}
            src={CHEF[currentIndex].url}
            alt={CHEF[currentIndex].alt}
            width={500}
            height={500}
            className="object-cover"
          />
          <div className="absolute bottom-4 right-6 bg-white px-6 py-2 shadow-lg rounded-tl-lg rounded-bl-lg rounded-br-lg">
            <span className="text-gray-800 font-medium">Our Best Chef</span>
            <span className="text-xl ml-2">😊</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:pl-12">
        <h2 className="text-2xl text-green-500 font-semibold tracking-wide mt-2">
          TESTIMONIALS
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 md:mt-10">
          What Our Customers Say About Us
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          "I had the pleasure of dining at Foodi last night, and I'm still
          raving about the experience! The attention to detail in presentation
          and service was impeccable"
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Customers Feedback</h3>
          <div className="mt-4 text-xl">
            ⭐<span className="font-bold"> 4.9</span>{" "}
            <span className="text-gray-600">(18.6k Reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chef;
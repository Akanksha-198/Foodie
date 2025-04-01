

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SLIDER_IMAGES = [
  { url: '/Heroimages/g0.jpeg', alt: 'Food Image 0' },
  { url: '/Heroimages/g1.jpeg', alt: 'Food Image 1' },
  { url: '/Heroimages/g2.jpeg', alt: 'Food Image 2' },
  { url: '/Heroimages/g3.jpeg', alt: 'Food Image 3' },
  { url: '/Heroimages/g4.jpeg', alt: 'Food Image 4' },
  { url: '/Heroimages/g5.jpeg', alt: 'Food Image 5' },
];

const SLIDER_TEXT = [
  { id: 1, title: "Always fresh, crispy, and hot" },
  { id: 2, title: "We deliver your order wherever you are" },
  { id: 3, title: "The best food to share with your family" },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDER_TEXT.length - 1 ? 0 : prev + 1));
      setCurrentImage((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto px-4 md:px-6 lg:px-5 flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] max-w-6xl mb-10 sm:mb-2">
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        <h1 className="font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl mb-6">
          Dive into Delights of Delectable{" "}
          <span className="text-green-500">Food</span>
        </h1>
        <p className="text-green-700 text-xl md:text-xl mb-8 max-w-[500px]">
          {SLIDER_TEXT[currentSlide].title}
        </p>
        <div className="flex items-center gap-6">
          <button className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition-colors">
            <Link href="/menu">Order Now
            </Link>
          </button>
          {/* <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-700 font-semibold">Watch video</span>
            <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden">
          <Image
            key={currentImage}
            src={SLIDER_IMAGES[currentImage].url}
            alt={SLIDER_IMAGES[currentImage].alt}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
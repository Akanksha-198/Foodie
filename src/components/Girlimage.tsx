"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

const GIMG = [
  {
    url: '/Heroimages/g0.jpeg',
    alt: 'Girl 0',
  },
  {
    url: '/Heroimages/g1.jpeg',
    alt: 'Girl 1',
  },{
    url: '/Heroimages/g2.jpeg',
    alt: 'Girl 2',
  }, {
    url: '/Heroimages/g3.jpeg',
    alt: 'Girl 3',
  }, {
    url: '/Heroimages/g4.jpeg',
    alt: 'Girl 4',
  },
  {
    url: '/Heroimages/g5.jpeg',
    alt: 'Girl 5',
  }
];
const Girlimage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % GIMG.length);
    }, 3000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex justify-center items-center w-[500px] h-[500px] overflow-hidden rounded-full">
      <Image
        key={currentIndex} // Use key to force rerender when index changes
        src={GIMG[currentIndex].url}
        alt={GIMG[currentIndex].alt}
        width={500}
        height={500}
        className="object-cover"
      />
    </div>
  );
};

export default Girlimage;

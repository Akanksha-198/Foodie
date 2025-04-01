
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="Foodie Logo"
                width={120}
                height={60}
                objectFit="contain"
                className="priority"
              />
            </Link>
            <p className="mt-2 text-sm">Delicious meals, delivered to you.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <Link href="/menu" className="hover:text-green-500 transition-colors">
              Menu
            </Link>
            <Link href="/about" className="hover:text-green-500 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-green-500 transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-green-500 transition-colors">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <div className="flex space-x-4 mb-4">
              {/* <SocialIcon Icon={SlSocialFacebook} bgColor="bg-green-500" hoverBgColor="hover:bg-green-600" /> */}
              <SocialIcon Icon={FaInstagram} />
              <SocialIcon Icon={CiTwitter} />
              <SocialIcon Icon={AiOutlineYoutube} />
            </div>
            <div className="text-gray-500 text-sm">
              <h2 className="tracking-widest">
                Copyright 2024 Dscode | All Rights Reserved
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Foodie. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm">
            <Link href="/privacy" className="hover:text-green-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  Icon: React.ElementType;
  bgColor?: string;
  hoverBgColor?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, bgColor = "bg-green-200", hoverBgColor = "hover:bg-green-300" }) => (
  <div className={`${bgColor} ${hoverBgColor} w-[50px] h-[50px] rounded-full flex items-center justify-center transition-colors duration-300`}>
    <Icon size={24} className={`text-green-500 ${bgColor === "bg-green-500" ? "text-white" : "group-hover:text-white"}`} />
  </div>
);

export default Footer;
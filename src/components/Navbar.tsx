

import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { LuPhoneCall } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="h-16 md:h-24 bg-gray-50 shadow-md flex items-center justify-between px-4 lg:px-20 xl:px-40 font-poppins">
      {/* LOGO */}
      <div className="flex-1">
        <Link href="/">
          <Image
            className="priority"
            src="/logo2.png"
            alt="logo"
            width={120}
            height={60}
            objectFit="contain"
          />
        </Link>
      </div>

      {/* CENTER LINKS */}
      <div className="hidden md:flex gap-8 items-center justify-center flex-1">
        <NavLink href="/" label="Home" />
        <NavLink href="/menu" label="Menu" />
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
        <UserLinks />
        <CartIcon />
        <ContactButton />
      </div>
    </div>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-gray-700 font-semibold text-lg uppercase tracking-wide hover:text-green-500 transition-colors duration-200"
  >
    {label}
  </Link>
);

const ContactButton = () => (
  <Link
    href="/contact"
    className="flex items-center gap-2 bg-green-500 text-white px-4 py-4 rounded-[5rem] hover:bg-green-600 transition-colors  "
  >
    <LuPhoneCall className="w-5 h-5" />
    <span className="text-md font-bold text-black mr-3">Contact</span>
  </Link>
);

export default Navbar;
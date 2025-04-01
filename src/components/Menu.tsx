// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import CartIcon from "./CartIcon";

// const links = [
//   { id: 1, title: "Homepage", url: "/" },
//   { id: 2, title: "Menu", url: "/menu" },
//   { id: 3, title: "Working Hours", url: "/" },
//   { id: 4, title: "Contact", url: "/" },
// ];

// const Menu = () => {
//   const [open, setOpen] = useState(false);

//   // TEMPORARY
//   const user = false;
//   return (
//     <div>
//       {/* LONG WAY */}
//       {/* {!open ? (
//         <Image
//           src="/open.png"
//           alt=""
//           width={20}
//           height={20}
//           onClick={() => setOpen(true)}
//         />
//       ) : (
//         <Image
//           src="/close.png"
//           alt=""
//           width={20}
//           height={20}
//           onClick={() => setOpen(false)}
//         />
//       )} */}
      
//       {/* SHORTCUT */}
//       <Image
//         src={open ? "/close.png" : "/open.png"}
//         alt=""
//         width={20}
//         height={20}
//         onClick={() => setOpen(!open)}
//         className="cursor-pointer"
//       />
//       {open && (
//         <div className="bg-green-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-lg z-10 ">
//           {links.map((item) => (
//             <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
//               {item.title}
//             </Link>
//           ))}

//           {/* LONG WAY */}
//           {/* {!user ? (
//             <Link href="/login" onClick={() => setOpen(false)}>
//               Login
//             </Link>
//           ) : (
//             <Link href="/orders" onClick={() => setOpen(false)}>
//               Orders
//             </Link>
//           )} */}

//           {/* SHORTCUT */}
//           <Link
//             href={user ? "/orders" : "login"}
//             onClick={() => setOpen(false)}
//           >
//             {user ? "Orders" : "Login"}
//           </Link>
//           <Link href="/cart" onClick={() => setOpen(false)}>
//             <CartIcon />
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession, signOut } from "next-auth/react";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession(); // Get user authentication status

  return (
    <div>
      {/* Toggle Button */}
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt="Menu Toggle"
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />

      {/* Menu Content */}
      {open && (
        <div className="bg-green-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-lg z-10">
          {/* Navigation Links */}
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}

          {/* User Links */}
          {status === "authenticated" ? (
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="bg-white text-green-500 px-4 py-2 rounded-md border border-green-500 hover:bg-green-100 transition-colors"
              >
                Orders
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-white text-green-500 px-4 py-2 rounded-md border border-green-500 hover:bg-green-100 transition-colors"
            >
              Login
            </Link>
          )}

          {/* Cart Link */}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
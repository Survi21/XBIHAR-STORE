

// "use client";

// import { useCart } from "@/app/context/CartContext";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import UserDropdown from "./UserDropdown";
// import { useRef } from "react"; 

// import {
//   Search,
//   Heart,
//   ShoppingBag,
//   User,
//   X,
//   Menu,
//   ShieldCheck, // 🛡️ Naya icon admin dashboard ke liye
// } from "lucide-react";

// export default function Navbar() {
//   const [showSearch, setShowSearch] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [user, setUser] = useState<any>(null);

//   const { cart } = useCart();
//   const dropdownRef = useRef(null); 

//   // ✅ GET USER FROM BACKEND (COOKIE BASED)
//   useEffect(() => {
//     fetch("http://localhost:5000/api/auth/profile", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.user) {
//           setUser(data.user);
//         }
//       });
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (
//         dropdownRef.current &&
//         !(dropdownRef.current as any).contains(event.target)
//       ) {
//         setShowDropdown(false); 
//       }
//     }
  
//     document.addEventListener("mousedown", handleClickOutside);
  
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">

//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

//           {/* Left */}
//           <button onClick={() => setShowMenu(true)}>
//             <Menu className="w-7 h-7 text-white" />
//           </button>

//           {/* Center Logo */}
//           <Link
//             href="/"
//             className="font-orbitron absolute left-1/2 -translate-x-1/2 text-2xl"
//           >
//             XBIHAR
//           </Link>

//           {/* Right Icons */}
//           <div className="flex items-center gap-5">

//             {/* 👑 DESKTOP: ADMIN DIRECT LINK (Agar user admin hai toh avatar ke pehle ek star/shield icon dikhega) */}
//             {user && user.role === "admin" && (
//               <Link 
//                 href="/admin" 
//                 className="hidden md:flex items-center gap-1 bg-red-600/20 text-red-500 border border-red-500/30 px-2.5 py-1 rounded text-xs font-semibold tracking-wider font-orbitron hover:bg-red-600 hover:text-white transition"
//               >
//                 <ShieldCheck className="w-3.5 h-3.5" />
//                 ADMIN
//               </Link>
//             )}

//             <button onClick={() => setShowSearch(!showSearch)}>
//               <Search className="w-5 h-5 text-white" />
//             </button>

//             <Link href="/wishlist">
//               <Heart className="w-5 h-5 text-white" />
//             </Link>

//             <Link href="/cart">
//               <div className="relative">
//                 <ShoppingBag className="w-5 h-5 text-white" />

//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//                     {cart.length}
//                   </span>
//                 )}
//               </div>
//             </Link>

//             {/* ✅ USER ICON + DROPDOWN */}
//             <div className="relative">

//               {user ? (
//                 <div
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="cursor-pointer"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </div>
//                 </div>
//               ) : (
//                 <Link href="/login">
//                   <User className="w-5 h-5 text-white cursor-pointer" />
//                 </Link>
//               )}

//               <div ref={dropdownRef}>
//                 {showDropdown && user && (
//                   <div className="absolute right-0 top-10 z-50">
//                     <UserDropdown />
//                   </div>
//                 )}
//               </div>

//             </div>

//           </div>

//         </div>

//       </header>

//       {/* ✅ MOBILE MENU */}
//       {showMenu && (
//         <div className="fixed inset-0 bg-black z-[999]">

//           <div className="flex justify-between items-center p-6 border-b border-zinc-800">
//             <h2 className="text-xl font-bold font-orbitron ">XBIHAR</h2>

//             <button onClick={() => setShowMenu(false)}>
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>

//           <nav className="flex flex-col gap-6 p-6 text-xl font-orbitron">

//             {/* 👑 MOBILE: ADMIN LINK (Menu drawer ke sabse upar red color mein highlight hoga agar Arman login karega) */}
//             {user && user.role === "admin" && (
//               <Link 
//                 href="/admin" 
//                 onClick={() => setShowMenu(false)}
//                 className="text-red-500 font-bold border-b border-zinc-800 pb-4 flex items-center gap-2"
//               >
//                 <ShieldCheck className="w-6 h-6" />
//                 ADMIN DASHBOARD
//               </Link>
//             )}

//             <Link href="/" onClick={() => setShowMenu(false)}>
//               HOME
//             </Link>

//             <Link href="/product" onClick={() => setShowMenu(false)}>
//               PRODUCT
//             </Link>

//             <Link href="/new-arrivals" onClick={() => setShowMenu(false)}>
//               COMING SOON
//             </Link>

//             <Link href="/about" onClick={() => setShowMenu(false)}>
//               ABOUT
//             </Link>

//             <Link href="/blog" onClick={() => setShowMenu(false)}>
//               BLOG
//             </Link>

//             <Link href="/contact" onClick={() => setShowMenu(false)}>
//               CONTACT
//             </Link>

//           </nav>

//         </div>
//       )}
//     </>
//   );
// }

















"use client";

import { useCart } from "@/app/context/CartContext";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🚀 Import router for redirection
import UserDropdown from "./UserDropdown";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  Menu,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { cart } = useCart();
  const dropdownRef = useRef(null);
  const router = useRouter(); // 🚀 Initialize router

  // ✅ GET USER FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setShowDropdown(false); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* Left Menu Button */}
          <button onClick={() => setShowMenu(true)}>
            <Menu className="w-7 h-7 text-white" />
          </button>

          {/* Center Logo */}
          <Link
            href="/"
            className="font-orbitron absolute left-1/2 -translate-x-1/2 text-2xl"
          >
            XBIHAR
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-5">

            {/* ADMIN DIRECT LINK */}
            {user && user.role === "admin" && (
              <Link 
                href="/admin" 
                className="hidden md:flex items-center gap-1 bg-red-600/20 text-red-500 border border-red-500/30 px-2.5 py-1 rounded text-xs font-semibold tracking-wider font-orbitron hover:bg-red-600 hover:text-white transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                ADMIN
              </Link>
            )}

            {/* 🚀 FIXED SEARCH ICON: Directly navigates to Search Page */}
            <button onClick={() => router.push("/search")}>
              <Search className="w-5 h-5 text-white transition hover:text-zinc-400" />
            </button>

            <Link href="/wishlist">
              <Heart className="w-5 h-5 text-white" />
            </Link>

            <Link href="/cart">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {/* USER ICON + DROPDOWN */}
            <div className="relative">
              {user ? (
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <User className="w-5 h-5 text-white cursor-pointer" />
                </Link>
              )}

              <div ref={dropdownRef}>
                {showDropdown && user && (
                  <div className="absolute right-0 top-10 z-50">
                    <UserDropdown />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {showMenu && (
        <div className="fixed inset-0 bg-black z-[999]">
          <div className="flex justify-between items-center p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold font-orbitron ">XBIHAR</h2>
            <button onClick={() => setShowMenu(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 p-6 text-xl font-orbitron">
            {user && user.role === "admin" && (
              <Link 
                href="/admin" 
                onClick={() => setShowMenu(false)}
                className="text-red-500 font-bold border-b border-zinc-800 pb-4 flex items-center gap-2"
              >
                <ShieldCheck className="w-6 h-6" />
                ADMIN DASHBOARD
              </Link>
            )}
            <Link href="/" onClick={() => setShowMenu(false)}>HOME</Link>
            <Link href="/product" onClick={() => setShowMenu(false)}>PRODUCT</Link>
            <Link href="/new-arrivals" onClick={() => setShowMenu(false)}>COMING SOON</Link>
            <Link href="/about" onClick={() => setShowMenu(false)}>ABOUT</Link>
            <Link href="/blog" onClick={() => setShowMenu(false)}>BLOG</Link>
            <Link href="/contact" onClick={() => setShowMenu(false)}>CONTACT</Link>
          </nav>
        </div>
      )}
    </>
  );
}
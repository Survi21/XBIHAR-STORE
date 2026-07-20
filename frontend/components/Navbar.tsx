


"use client";

import { useCart } from "@/app/context/CartContext";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
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
  const router = useRouter(); 

  // ✅ GET USER FROM BACKEND
  // useEffect(() => {
  //   fetch("https://xbihar.onrender.com/api/auth/profile", {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.user) {
  //         setUser(data.user);
  //       }
  //     });
  // }, []);


  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("https://xbihar.onrender.com/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        setUser(data.user);
      }
    })
    .catch(() => {
      // token invalid ho to silently ignore, user null hi rahega
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
        {/* Mobile-friendly padding adjustment (px-4 on mobile, px-6 on laptop) */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between relative w-full">

          {/* Left Menu Button */}
          <button onClick={() => setShowMenu(true)} className="p-1 hover:opacity-80 transition">
            <Menu className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </button>

          {/* Center Logo - Responsive Absolute positioning */}
          <Link
            href="/"
            className="font-orbitron absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl tracking-wider text-white"
          >
            XBIHAR
          </Link>

          {/* Right Icons - Dynamic gap spacing for mobile screen limits */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* ADMIN DIRECT LINK */}
            {user && user.role === "admin" && (
              <Link 
                href="/admin" 
                className="hidden sm:flex items-center gap-1 bg-red-600/20 text-red-500 border border-red-500/30 px-2.5 py-1 rounded text-xs font-semibold tracking-wider font-orbitron hover:bg-red-600 hover:text-white transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                ADMIN
              </Link>
            )}

            {/* SEARCH ICON */}
            <button onClick={() => router.push("/search")} className="p-1">
              <Search className="w-5 h-5 text-white transition hover:text-zinc-400" />
            </button>

            {/* WISHLIST LINK - Hidden on super small mobiles to save space, visible from mobile-medium onwards */}
            <Link href="/wishlist" className="p-1 hidden xs:block">
              <Heart className="w-5 h-5 text-white hover:text-zinc-400 transition" />
            </Link>

            {/* CART LINK */}
            <Link href="/cart" className="p-1🗂️">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white hover:text-zinc-400 transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
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
                  className="cursor-pointer select-none"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center text-xs md:text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <Link href="/login" className="p-1 block">
                  <User className="w-5 h-5 text-white cursor-pointer hover:text-zinc-400 transition" />
                </Link>
              )}

              <div ref={dropdownRef}>
                {showDropdown && user && (
                  <div className="absolute right-0 top-10 z-50 min-w-[150px]">
                    <UserDropdown />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MENU - Full Screen Overlay with scroll safety */}
      {showMenu && (
        <div className="fixed inset-0 bg-black z-[999] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold font-orbitron text-white">XBIHAR</h2>
            <button onClick={() => setShowMenu(false)} className="p-1">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 p-6 text-lg md:text-xl font-orbitron text-zinc-300">
            {user && user.role === "admin" && (
              <Link 
                href="/admin" 
                onClick={() => setShowMenu(false)}
                className="text-red-500 font-bold border-b border-zinc-800 pb-4 flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                ADMIN DASHBOARD
              </Link>
            )}
            <Link href="/" onClick={() => setShowMenu(false)} className="hover:text-white transition">HOME</Link>
            <Link href="/product" onClick={() => setShowMenu(false)} className="hover:text-white transition">PRODUCT</Link>
            {/* Added missing mobile navigation links just in case */}
            <Link href="/wishlist" onClick={() => setShowMenu(false)} className="xs:hidden text-zinc-400 hover:text-white transition">WISHLIST</Link> 
            <Link href="/new-arrivals" onClick={() => setShowMenu(false)} className="hover:text-white transition">COMING SOON</Link>
            <Link href="/about" onClick={() => setShowMenu(false)} className="hover:text-white transition">ABOUT</Link>
            <Link href="/blog" onClick={() => setShowMenu(false)} className="hover:text-white transition">BLOG</Link>
            <Link href="/contact" onClick={() => setShowMenu(false)} className="hover:text-white transition">CONTACT</Link>
          </nav>
        </div>
      )}
    </>
  );
}
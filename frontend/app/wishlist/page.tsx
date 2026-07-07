"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const fetchWishlist = async () => {
    const res = await fetch(
      "http://localhost:5000/api/wishlist"
    );

    const data = await res.json();

    setWishlist(data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (id: string) => {
    await fetch(
      `http://localhost:5000/api/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchWishlist();
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-orbitron mb-10">
          WISHLIST
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 rounded-2xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-5">
                <h2 className="font-orbitron text-lg">
                  {item.title}
                </h2>

                <p className="mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() =>
                    removeItem(item._id)
                  }
                  className="mt-4 w-full border border-red-500 text-red-500 py-3 rounded-xl"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
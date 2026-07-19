// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";

// export default function WishlistPage() {
//   const [wishlist, setWishlist] = useState<any[]>([]);

//   const fetchWishlist = async () => {
//     const res = await fetch(
//       "http://localhost:5000/api/wishlist"
//     );

//     const data = await res.json();

//     setWishlist(data);
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const removeItem = async (id: string) => {
//     await fetch(
//       `http://localhost:5000/api/wishlist/${id}`,
//       {
//         method: "DELETE",
//       }
//     );

//     fetchWishlist();
//   };

//   return (
//     <main className="bg-black text-white min-h-screen">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
//         <h1 className="text-4xl font-orbitron mb-10">
//           WISHLIST
//         </h1>

//         <div className="grid md:grid-cols-3 gap-8">
//           {wishlist.map((item) => (
//             <div
//               key={item._id}
//               className="bg-zinc-900 rounded-2xl overflow-hidden"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-[420px] object-cover"
//               />

//               <div className="p-5">
//                 <h2 className="font-orbitron text-lg">
//                   {item.title}
//                 </h2>

//                 <p className="mt-2">
//                   ₹{item.price}
//                 </p>

//                 <button
//                   onClick={() =>
//                     removeItem(item._id)
//                   }
//                   className="mt-4 w-full border border-red-500 text-red-500 py-3 rounded-xl"
//                 >
//                   REMOVE
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation"; // 🚀 Import useRouter

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const router = useRouter(); 

  const fetchWishlist = async () => {
    const res = await fetch(
      "https://xbihar.onrender.com/api/wishlist"
    );

    const data = await res.json();

    setWishlist(data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (id: string) => {
    await fetch(
      `https://xbihar.onrender.com/api/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchWishlist();
  };

  // 🚀 ABSOLUTE CLEAN URL REDIRECTION HANDLER
  // Yeh function URL bar me id ko completely hide kar dega aur sirf "/product" khulega
  const handleProductNavigation = (item: any) => {
    const prodId = item.productId?._id || item.productId || item._id;
    
    // ID ko temporary session storage me store kar rahe hain taaki destination page ise extract kar sake
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedProductId", prodId);
    }

    // Direct simple static route push bina kisi ID mapping ke
    router.push("/product");
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
              {/* 🚀 Image Click Event */}
              <div 
                onClick={() => handleProductNavigation(item)}
                className="cursor-pointer overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[420px] object-cover hover:opacity-80 transition duration-300"
                />
              </div>

              <div className="p-5">
                {/* 🚀 Title Click Event */}
                <h2 
                  onClick={() => handleProductNavigation(item)}
                  className="font-orbitron text-lg cursor-pointer hover:text-red-500 transition duration-300"
                >
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

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import { products } from "@/data/products";

// export default function SearchPage() {
//   const [query, setQuery] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(query.toLowerCase()) ||
//     product.tagline.toLowerCase().includes(query.toLowerCase()) ||
//     product.description.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <main className="bg-black text-white min-h-screen">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

//         <h1 className="text-5xl font-orbitron mb-10">
//           SEARCH
//         </h1>

//         <input
//           type="text"
//           placeholder="Search XBIHAR..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 outline-none text-white mb-12"
//         />

//         {query && filteredProducts.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-zinc-500 text-lg">
//               No products found.
//             </p>
//           </div>
//         )}

//         <div className="grid md:grid-cols-3 gap-8">

//           {filteredProducts.map((product) => (

//             <Link
//               key={product.id}
//               href="/product"
//               className="group"
//             >
//               <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition">

//                 <img
//                   src={product.images[0]}
//                   alt={product.title}
//                   className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
//                 />

//                 <div className="p-5">

//                   <h2 className="font-orbitron text-xl">
//                     {product.title}
//                   </h2>

//                   <p className="text-zinc-400 mt-2 text-sm">
//                     {product.tagline}
//                   </p>

//                   <p className="mt-4 text-white font-semibold">
//                     ₹{product.price}
//                   </p>

//                 </div>

//               </div>
//             </Link>

//           ))}

//         </div>

//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  // 🚀 SMART CASE-INSENSITIVE FILTER
  const filteredProducts = products.filter((product) => {
    if (!query) return false;
    const cleanQuery = query.toLowerCase().replace(/[\s-]/g, "");
    const cleanField = (field: string) => (field ? field.toLowerCase().replace(/[\s-]/g, "") : "");

    return (
      cleanField(product.title).includes(cleanQuery) ||
      cleanField(product.tagline).includes(cleanQuery) ||
      cleanField(product.description).includes(cleanQuery)
    );
  });

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-5xl font-orbitron mb-10 tracking-wider">
          SEARCH
        </h1>

        {/* Search Input Bar */}
        <input
          type="text"
          placeholder="Search by product name, tag (e.g., tshirt)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 outline-none text-white font-['Inter'] mb-12 focus:border-zinc-600 transition"
        />

        {/* 1. INITIAL STATE */}
        {!query && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg font-['Inter']">
              Start typing to discover products...
            </p>
          </div>
        )}

        {/* 2. NO RESULTS STATE */}
        {query && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg font-['Inter']">
              No products found for "{query}".
            </p>
          </div>
        )}

        {/* 3. DYNAMIC RESULTS STATE */}
        {query && filteredProducts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href="/product" // 🎯 STRICTLY FIXED: Sirf plain static '/product' page open hoga!
                className="group block"
              >
                <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group-hover:border-zinc-600 transition duration-300 flex flex-col h-full">
                  
                  {/* Image Section */}
                  <div className="overflow-hidden h-[420px]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 bg-zinc-950 flex flex-col flex-grow justify-between">
                    <div>
                      <h2 className="font-orbitron text-xl tracking-wide text-white">
                        {product.title}
                      </h2>
                      <p className="text-zinc-400 mt-2 text-sm font-['Inter'] line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-white font-semibold font-['Inter'] text-lg">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
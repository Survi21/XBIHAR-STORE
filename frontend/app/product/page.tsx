
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const { addToCart } = useCart() as any;

  // 🌐 1. Live API se Products data fetch karna
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch("https://xbihar.onrender.com/api/admin/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error("Error fetching live products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);

  // 🚚 Pincode automation check
  useEffect(() => {
    if (pincode.length === 6) {
      const timeout = setTimeout(() => {
        checkDelivery();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [pincode]);

  const ITEM_WEIGHT = 0.5; // kg

  const checkDelivery = async () => {
    try {
      const res = await fetch("https://xbihar.onrender.com/api/shipping/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode, weight: ITEM_WEIGHT }),
      });

      const data = await res.json();
      if (data.success) {
        setDeliveryInfo(data.courier);
        setDeliveryCharge(data.courier.charge);
        setChecked(true);
        localStorage.setItem(
          "shippingInfo",
          JSON.stringify({
            charge: data.courier.charge,
            courier: data.courier.name,
            pincode,
          })
        );
      } else {
        alert("No courier available for this location.");
        setChecked(false);
      }
    } catch (err) {
      console.log(err);
      setChecked(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-orbitron">
        LOADING LATEST DROPS...
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {products.map((product) => {
        return (
          <section
            key={product._id} // 🎯 MongoDB dynamic id handler
          //   className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 border-b border-zinc-800"
          // >


         className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-b border-zinc-800">
            {/* LEFT SIDE GALLERY */}
            <ProductGallery images={product.images || []} />

            {/* RIGHT SIDE DETAILS */}
            <div>
              {/* <h2 className="font-orbitron text-3xl uppercase">{product.title}</h2> */}
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl uppercase tracking-wide break-words">{product.title}</h2>

              {/* PRICE MATRIX */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-2xl font-['Orbitron'] text-white">₹{product.price}</span>
                <span className="text-xl text-zinc-500 line-through font-['Orbitron']">
                  ₹{product.originalPrice || product.price}
                </span>
                <span className="bg-red-600 font-['Inter'] text-white text-xs px-3 py-1 rounded-full">
                  SALE
                </span>
              </div>

              {/* DEEP METADATA */}
              <div className="mt-10">
                <h5 className="font-orbitron text-xl text-red-500">{product.tagline}</h5>
                <p className="font-['Inter'] mt-4 text-zinc-300 leading-7">{product.description}</p>

                {/* FEATURES DYNAMIC MAP */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="font-orbitron text-lg mb-5">PRODUCT HIGHLIGHTS</h3>
                    <nav className="space-y-3 text-zinc-400 text-sm font-['Inter']">
                      {product.features.map((item: string, index: number) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CULTURAL STORIES */}
                {product.inspiration && (
                  <div className="mt-8 pl-6 border-l border-zinc-700">
                    <h3 className="text-2xl font-orbitron mb-4">CONCEPT / INSPIRATION</h3>
                    <p className="text-zinc-400 leading-8 text-sm font-['Inter']">{product.inspiration}</p>
                  </div>
                )}
              </div>

              {/* 👕 DYNAMIC SIZES WITH STOCK VALIDATION */}
              {/* <div className="mt-10 font-['Inter']">
                <h3 className="mb-4 text-lg font-orbitron">SELECT SIZE</h3>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL"].map((sizeName) => {
                    const sizeObj = product.sizes?.find((s: any) => s.size === sizeName);
                    const stockAvailable = sizeObj ? sizeObj.stock : 0;
                    const isOutOfStock = stockAvailable === 0;

                    return (
                      <button
                        key={sizeName}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(sizeName)}
                        className={`w-14 h-14 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center ${
                          isOutOfStock
                            ? "border-zinc-800 text-zinc-600 bg-zinc-950 cursor-not-allowed line-through"
                            : selectedSize === sizeName
                            ? "bg-white text-black border-white"
                            : "border-zinc-700 text-white hover:border-white"
                        }`}
                      >
                        <span>{sizeName}</span>
                        {isOutOfStock && <span className="text-[9px] text-red-500 font-sans tracking-tight">OUT</span>}
                      </button>
                    );
                  })}
                </div>
              </div> */}


{/* 👕 DYNAMIC SIZES WITH STOCK VALIDATION */}
<div className="mt-10 font-['Inter']">
  <h3 className="mb-4 text-lg font-orbitron">SELECT SIZE</h3>
  <div className="flex gap-3">
    {["S", "M", "L", "XL"].map((sizeName) => {
      const sizeObj = product.sizes?.find((s: any) => s.size === sizeName);
      const stockAvailable = sizeObj ? sizeObj.stock : 0;
      const isOutOfStock = stockAvailable === 0;

      return (
        <button
          key={sizeName}
          disabled={isOutOfStock}
          onClick={() => setSelectedSize(sizeName)}
          className={`w-14 h-14 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center ${
            isOutOfStock
              ? "border-zinc-800 text-zinc-600 bg-zinc-950 cursor-not-allowed line-through"
              : selectedSize === sizeName
              ? "bg-white text-black border-white"
              : "border-zinc-700 text-white hover:border-white"
          }`}
        >
          <span>{sizeName}</span>
          {isOutOfStock && <span className="text-[9px] text-red-500 font-sans tracking-tight">OUT</span>}
        </button>
      );
    })}
  </div>

  {/* 🔥 DYNAMIC STOCK COUNTER ALERT (Line 141 ke aas-paas paste hoga) */}
  {(() => {
    const currentSizeObj = product.sizes?.find((s: any) => s.size === selectedSize);
    const stockLeft = currentSizeObj ? currentSizeObj.stock : 0;

    if (selectedSize && stockLeft > 0 && stockLeft < 10) {
      return (
        <div className="mt-4 flex items-center gap-2 text-xs text-red-500 font-orbitron font-medium tracking-wide animate-pulse bg-red-950/20 border border-red-900/30 px-4 py-2 rounded-xl w-max">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600"></span>
          Hurry! Only {stockLeft} left in size {selectedSize}
        </div>
      );
    }
    return null;
  })()}
</div>


              {/* 🚚 DELIVERY ENGINE */}
              <div className="mt-10 border-t border-zinc-800 pt-6">
                <h3 className="font-orbitron text-lg mb-4">DELIVERY OPTIONS</h3>
                {!checked ? (
                  <>
                    {/* <div className="flex gap-3 text-xl font-['Inter']"> */}

                    <div className="flex flex-col sm:flex-row gap-3 text-xl font-['Inter'] w-full">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none text-base text-white"
                      />
                      <button
                        onClick={() => (pincode.length === 6 ? checkDelivery() : alert("Please enter a valid 6-digit pincode"))}
                        className="border border-white px-5 rounded-xl text-sm font-orbitron hover:bg-white hover:text-black transition"
                      >
                        CHECK
                      </button>
                    </div>
                    <p className="text-zinc-500 mt-2 text-xs font-['Inter']">
                      Please enter PIN code to check delivery availability & activate purchase.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold font-orbitron text-sm text-green-400">📍 Pincode {pincode} Verified</span>
                      <button
                        onClick={() => {
                          setChecked(false);
                          setPincode("");
                          setDeliveryInfo(null);
                        }}
                        className="text-red-500 text-xs uppercase font-orbitron font-bold hover:underline"
                      >
                        [Change]
                      </button>
                    </div>
                    <div className="mt-4 space-y-2 text-sm font-['Inter'] bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                      {/* <p className="text-zinc-300">✓ Courier: <span className="text-white font-medium">{deliveryInfo?.name || "Standard Delivery"}</span></p> */}
                      <p className="text-zinc-300">✓ Delivery Date: <span className="text-white font-medium">{deliveryInfo?.etd || "3-5 Days"}</span></p>
                      <p className="text-zinc-300">✓ Shipping Charge: <span className="text-white font-medium">₹{Math.round(deliveryCharge)}</span></p>
                    </div>
                  </>
                )}
              </div>

              {/* 🛠️ TRANSACTION BUTTONS */}
              <div className="mt-8 flex gap-3">
                {/* CART EMITTER */}
                <button
                  disabled={!checked} // 💥 LOCK LOGIC: Pincode check nahi hoga toh button disabled rahega
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Please select a size");
                      return;
                    }
                    addToCart({
                      id: product._id,
                      title: product.title,
                      price: product.price,
                      originalPrice: product.originalPrice || product.price,
                      size: selectedSize,
                      image: product.images?.[0] || "",
                      quantity: 1,
                    });
                    alert(`${product.title} (${selectedSize}) added to cart!`);
                  }}
                  className={`flex-1 py-4 rounded-xl font-orbitron font-bold transition ${
                    checked
                      ? "bg-white text-black hover:scale-[1.02] cursor-pointer"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                  }`}
                >
                  {checked ? "Add to Cart" : "Verify Pincode First"}
                </button>

                {/* WISHLIST EMITTER */}
                <button
                  onClick={async () => {
                    try {
                      const user = JSON.parse(localStorage.getItem("user") || "{}");
                      const response = await fetch("https://xbihar.onrender.com/api/wishlist/add", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          productId: product._id,
                          title: product.title,
                          price: product.price,
                          image: product.images?.[0] || "",
                          userEmail: user.email || "guest",
                        }),
                      });

                      const data = await response.json();
                      if (data.success) {
                        alert("Added to Wishlist ❤️");
                      } else {
                        alert(data.message);
                      }
                    } catch (error) {
                      console.log("Wishlist trigger error:", error);
                    }
                  }}
                  className="flex-1 border border-zinc-700 py-4 rounded-xl font-orbitron text-white hover:bg-zinc-900 transition"
                >
                  Wishlist
                </button>
              </div>
            </div>
           

          </section>

        );
      })}
  {/* <Newsletter /> */}
<Footer />
    </main>
  );
}

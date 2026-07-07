

"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [accepted, setAccepted] = useState(false);


 const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/coupons");
        const data = await res.json();
        if (data.success) setAvailableCoupons(data.coupons);
      } catch (err) {
        console.log("Error loading coupons:", err);
      }
    };
    fetchCoupons();
  }, []);



  
  // 🚚 PRODUCT PAGE SYNC LAYER (Default fallback dynamic standard base rate)
  const [shippingCharge, setShippingCharge] = useState<number>(82); 
  const [loadingShipping, setLoadingShipping] = useState(false);

  const totalSelling = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🎯 CRITICAL FIX 1: Product array variation watcher via structural mapping
  const cartDependencyString = JSON.stringify(
    cart.map(item => ({ id: item.id, qty: item.quantity }))
  );

  useEffect(() => {
    const fetchAutomaticShipping = async () => {
      // 🎯 CRITICAL FIX 2: Correcting the localStorage parsing logic to match Product Page setup
      const shippingInfoRaw = localStorage.getItem("shippingInfo");
      let activePincode = "";

      if (shippingInfoRaw) {
        try {
          const parsed = JSON.parse(shippingInfoRaw);
          activePincode = parsed.pincode || "";
        } catch (e) {
          console.error("Error reading shippingInfo from localStorage:", e);
        }
      }

      if (activePincode && cart.length > 0) {
        setLoadingShipping(true);
        try {
          // 🎯 CRITICAL FIX 3: Perfectly multiplying matching weights (0.5kg per product unit)
          const ITEM_WEIGHT = 0.5; 
          const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
          const dynamicCalculatedWeight = totalCartQuantity * ITEM_WEIGHT;

          console.log(`📡 SYNC TRIGGERED | Pincode: ${activePincode} | Computed Weight: ${dynamicCalculatedWeight}KG`);

          // 🎯 CRITICAL FIX 4: Hitting the exact SAME API endpoint used by the Product Page
          const res = await fetch("http://localhost:5000/api/shipping/rates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pincode: activePincode,
              weight: dynamicCalculatedWeight, 
            }),
          });

          const data = await res.json();
          console.log("📥 EXACT MATCHING RESPONSE FROM API IN CART =", data);

          if (data.success && data.courier) {
            // Extracts exact live charge matrix parameter rules natively
            const baseLiveCharge = data.courier.charge || data.courier.rate || 0;
            if (baseLiveCharge > 0) {
              setShippingCharge(Math.round(baseLiveCharge));
            }
          }
        } catch (err) {
          console.error("❌ Live automated matrix pipeline crashed:", err);
        } finally {
          setLoadingShipping(false);
        }
      }
    };

    fetchAutomaticShipping();
  }, [cartDependencyString]); 

  // const applyCoupon = () => {
  //   if (coupon === "XBIHAR10") {
  //     setCouponDiscount(totalSelling * 0.1);
  //   } else if (coupon === "SAVE200" && totalSelling >= 2000) {
  //     setCouponDiscount(200);
  //   } else {
  //     alert("Invalid coupon");
  //     setCouponDiscount(0);
  //   }
  // };
// Is line ko dhoondhein aur poore function ko replace kar dein
const applyCoupon = async () => {
  if (!coupon.trim()) {
    alert("Please enter a coupon code");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/admin/coupons");
    const data = await res.json();

    if (data.success && data.coupons) {
      const foundCoupon = data.coupons.find(
        (c: any) => c.code.toUpperCase().trim() === coupon.toUpperCase().trim()
      );

      if (!foundCoupon) {
        alert("❌ Invalid or Expired coupon");
        setCouponDiscount(0);
        return;
      }

      if (totalSelling < foundCoupon.minOrderValue) {
        alert(`⚠️ This coupon requires a minimum cart value of ₹${foundCoupon.minOrderValue}`);
        setCouponDiscount(0);
        return;
      }

      // Yahan direct database se fixed amount minus ho raha hai
      setCouponDiscount(foundCoupon.discountValue);
      alert(`🎉 Coupon "${foundCoupon.code}" applied! ₹${foundCoupon.discountValue} OFF`);
    } else {
      alert("❌ Failed to validate coupon.");
    }
  } catch (err) {
    console.error("Error applying coupon:", err);
    alert("❌ Server Error");
  }
};





  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!accepted) {
      e.preventDefault();
      alert("Please accept the policy before proceeding.");
      return;
    }

    const shippingInfoRaw = localStorage.getItem("shippingInfo");
    const activePincode = shippingInfoRaw ? (JSON.parse(shippingInfoRaw).pincode || "110001") : "110001";
    
    const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const calculatedWeight = totalCartQuantity * 0.5;

    const cartSummary = {
      totalWeightInKg: calculatedWeight,
      couponDiscount,
      totalSellingPrice: totalSelling,
      shippingCharge: shippingCharge, 
      pincode: activePincode,
      products: cart.map(item => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        size: item.size
      }))
    };
    localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-28 px-6">
        <h1 className="text-4xl font-orbitron mb-10">SHOPPING CART</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-orbitron">YOUR CART IS EMPTY</h2>
          </div>
        ) : (
          <>
            {/* ITEMS LIST */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="border border-zinc-800 rounded-xl p-5 flex justify-between"
                >
                  <div>
                    <h2 className="font-orbitron text-xl">{item.title}</h2>
                    <div className="mt-2 flex gap-3 font-['Inter']">
                      <span>₹{item.price}</span>
                    </div>
                    <p className="text-zinc-400 font-['Inter'] mt-1">Size: {item.size}</p>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-zinc-900 rounded">-</button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-zinc-900 rounded">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="mt-3 text-red-500 font-['Inter']">REMOVE</button>
                  </div>
                  <img src={item.image} alt={item.title} className="w-32 h-50 object-cover rounded-lg" />
                </div>
              ))}
            </div>

            {/* COUPON INPUT */}
            <div className="mt-10 border border-zinc-800 p-5 rounded-xl font-['Inter'] flex gap-4 items-center">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
              />
              <button onClick={applyCoupon} className="font-orbitron bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200">APPLY</button>
            </div>


            {availableCoupons.length > 0 && (
              <div className="mt-4 p-4 bg-zinc-900/50 border border-dashed border-zinc-700 rounded-xl font-['Inter']">
                <p className="font-orbitron text-sm font-bold text-zinc-400 mb-3">AVAILABLE OFFERS & COUPONS:</p>
                <div className="flex flex-col gap-3">
                  {availableCoupons.map((c) => (
                    <div key={c._id} className="bg-black border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="font-mono font-bold text-red-500 bg-red-950/40 px-2 py-0.5 rounded border border-red-900 text-xs">
                          {c.code}
                        </span>
                        <p className="text-zinc-400 text-xs mt-1.5">
                          Save ₹{c.discountValue} on orders above ₹{c.minOrderValue}
                        </p>
                      </div>
                      <button
                        onClick={() => setCoupon(c.code)}
                        className="bg-white text-black text-xs font-orbitron font-bold px-3 py-1.5 rounded-lg hover:bg-zinc-200"
                      >
                        USE CODE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}




            {/* PRICE SUMMARY MODULE */}
            <div className="mt-10 bg-zinc-900 text-white p-6 rounded-xl shadow-lg font-['Inter'] border border-zinc-800">
              <h2 className="font-orbitron text-lg font-semibold mb-4">PRICE DETAILS</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalSelling}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-white">
                    {loadingShipping ? (
                      <span className="text-xs animate-pulse text-zinc-500">Recalculating Rates...</span>
                    ) : (
                      `₹${shippingCharge}`
                    )}
                  </span>
                </div>
              </div>
              <hr className="my-4 border-zinc-800" />
              <div className="font-orbitron flex justify-between text-xl font-bold">
                <span>Estimated Total</span>
                <span className="font-['Inter'] text-xl">
                  ₹{totalSelling - couponDiscount + shippingCharge}
                </span>
              </div>
            </div>

            {/* CONFIRMATION CHECKBOX */}
            <div className="mt-4 border border-zinc-800 rounded-xl p-4 text-red-500 font-['Inter']">
              <label className="flex gap-3 items-start cursor-pointer">
                <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} className="mt-1" />
                {/* <span className="text-sm leading-relaxed">
                  By placing an order with <b>XBIHAR</b>, you confirm all pricing metrics are validated.
                </span> */}
                    <span className="text-sm leading-relaxed">
                   By placing an order with <b>XBIHAR</b>, you confirm that you have reviewed the product details, sizing information, and all applicable policies.
                   <br /><br />
                   <b>ALL ORDERS ARE PREPAID.</b> Orders are typically delivered within 5–10 BUSINESS DAYS.
                   <br /><br />
                   <b>NO RETURNS OR EXCHANGES.</b> Replacements are offered only for verified damaged, defective, or incorrectly delivered items.
                   <br /><br />
                   By completing your purchase, you agree to XBIHAR’s 
                   Terms & Conditions,
                   <b> Privacy Policy</b>, 
                   <b> Shipping Policy</b>, and 
                   <b> Return, Replacement & Refund Policy</b>.
                 </span>
              </label>
            </div>

            <Link href="/checkout" onClick={handleCheckout}>
              <button
                disabled={!accepted || loadingShipping}
                className={`w-full mt-8 py-4 rounded-xl font-orbitron transition ${
                  accepted && !loadingShipping
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </> 
        )}
      </div>
    </main>
  );
}

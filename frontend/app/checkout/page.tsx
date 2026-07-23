

// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import { useCart } from "@/app/context/CartContext";
// import Script from "next/script";


// export default function CheckoutPage() {
//   const { cart } = useCart();
//   const router = useRouter();

//   const [deliveryCharge, setDeliveryCharge] = useState(0);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [cartWeight, setCartWeight] = useState(0);
//   const [loadingShipping, setLoadingShipping] = useState(false);

//   const [isPaying, setIsPaying] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // const checkAuth = async () => {
//   //   try {

//   //     const res = await fetch("https://xbihar.onrender.com/api/auth/check", { credentials: "include" });
//   //     return res.status === 200;
//   //   } catch (err) {
//   //     return false;
//   //   }
//   // };
// const checkAuth = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return false;

//   try {
//     const res = await fetch("https://xbihar.onrender.com/api/auth/check", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.status === 200;
//   } catch (err) {
//     return false;
//   }
// };
//   // 🎯 FIX 1: Initial load par Cart Page se saved Delivery Charge aur Pincode auto-load karein
//   useEffect(() => {
//     const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
//     if (summary.totalWeightInKg) {
//       setCartWeight(summary.totalWeightInKg);
//       setCouponDiscount(summary.couponDiscount || 0);
//     }
    
//     // Agar cart summary mein pehle se delivery charge aur pincode hai, toh use set kar dein
//     if (summary.shippingCharge !== undefined) {
//       setDeliveryCharge(Number(summary.shippingCharge));
//     }
//     if (summary.pincode) {
//       setFormData((prev) => ({ ...prev, pincode: summary.pincode }));
//     }
//   }, []);

//   // 💡 LIVE AUTOMATIC PINCODE CALCULATOR EFFECT
//   // Jab user input box mein pincode ko manually 6-digit ka karega tabhi naya rate fetch hoga
//   useEffect(() => {
//     // Pura summary read karke check karein ki kya yeh wahi pincode hai jo cart se aaya tha
//     const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
    
//     // Agar typed pincode wahi hai jo cart page wala hai, toh dobara API call block karein (performance fix)
//     if (formData.pincode === summary.pincode && summary.shippingCharge !== undefined) {
//       setDeliveryCharge(Number(summary.shippingCharge));
//       return;
//     }

//     if (formData.pincode.length === 6 && cartWeight > 0) {
//       const fetchLiveShipping = async () => {
//         setLoadingShipping(true);
//         try {
//           const res = await fetch("https://xbihar.onrender.com/api/shipping/rates", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               pincode: formData.pincode, 
//               weight: cartWeight,      
//             }),
//           });
//           const data = await res.json();
//           if (data.success) {
//             setDeliveryCharge(data.courier.charge);
//           } else {
//             alert("Delivery not available for this pincode!");
//             setDeliveryCharge(0);
//           }
//         } catch (err) {
//           console.log("Shipping error:", err);
//         } finally {
//           setLoadingShipping(false);
//         }
//       };

//       fetchLiveShipping();
//     } else if (formData.pincode.length < 6) {
//       setDeliveryCharge(0); // Agar user backspace kare toh rate reset ho jaye
//     }
//   }, [formData.pincode, cartWeight]);

//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   const finalTotal = totalPrice - couponDiscount + deliveryCharge;

//   const handleOrder = async () => {
//     const isAuth = await checkAuth();
//     if (!isAuth) {
//       alert("Please login first");
//       router.push("/login");
//       return;
//     }

//     if (!formData.name || !formData.phone || !formData.address || formData.pincode.length !== 6) {
//       alert("Please fill in all complete shipping details.");
//       return;
//     }

//     setIsPaying(true); // Payment process start

//     const productsData = cart.map((item, index) => ({
//       productId: `${item.id}-${item.size}-${index}`,
//       title: item.title,
//       price: item.price,
//       image: item.image,
//       quantity: item.quantity,
//       size: item.size,
//     }));




// // try {
// //       // 💳 Step A: Backend se Cashfree Session ID generate karwana
// //       const checkoutRes = await fetch("https://xbihar.onrender.com/api/payment/checkout", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ 
// //           amount: finalTotal,
// //           customerPhone: formData.phone,
// //           customerEmail: formData.email || "customer@xbihar.com",
// //         }),
// //       });

// //       const checkoutData = await checkoutRes.json();
// //       if (!checkoutData.success || !checkoutData.paymentSessionId) {
// //         alert("❌ Cashfree order generation failed!");
// //         setIsPaying(false);
// //         return;
// //       }

// //       // 💳 Step B: Cashfree runtime engine initialize karna
// //       const cashfree = new (window as any).Cashfree({
// //         mode: "production", // 🌟 Note: Live/Real payment chalu karne ke liye yahan "production" kar dena
// //       });

// //       // 💳 Step C: Cashfree modal popup settings
// //       let checkoutOptions = {
// //         paymentSessionId: checkoutData.paymentSessionId,
// //         redirectTarget: "_self", 
// //       };

// //       cashfree.checkout(checkoutOptions).then(async (result: any) => {
// //         if (result.error) {
// //           alert("❌ Payment Failed or Cancelled: " + result.error.message);
// //           setIsPaying(false);
// //           return;
// //         }
        
// //         // Jab customer payment successfully kar deta hai
// //         if (result.redirect) {
// //           try {
// //             const token = localStorage.getItem("token");
// //             const orderResponse = await fetch("https://xbihar.onrender.com/api/orders", {
// //               method: "POST",
// //               // credentials: "include",
// //               // headers: { "Content-Type": "application/json" },
// //               // body: JSON.stringify({
// //                 headers: {
// //     "Content-Type": "application/json",
// //     Authorization: `Bearer ${token}`,
// //   },
// //   body: JSON.stringify({
// //                 name: formData.name,
// //                 email: formData.email,
// //                 phone: formData.phone,
// //                 shippingCharge: deliveryCharge,
// //                 shippingAddress: {
// //                   address: formData.address,
// //                   city: formData.city,
// //                   state: formData.state,
// //                   pincode: formData.pincode,
// //                 },
// //                 totalPrice: finalTotal,
// //                 products: productsData,
// //                 cashfreeOrderId: checkoutData.orderId, 
// //               }),
// //             });

// //             const orderData = await orderResponse.json();
// //             if (orderData.success) {
// //               alert("🎉 Payment Successful & Order Placed!");
// //               localStorage.removeItem("cartSummary");
// //               router.push("/orders/success");
// //             } else {
// //               alert("❌ Order logging failed: " + orderData.error);
// //             }
// //           } catch (err) {
// //             console.error(err);
// //             alert("❌ Network issue while saving order details.");
// //           } finally {
// //             setIsPaying(false);
// //           }
// //         }
// //       });

// //     } catch (error) {
// //       console.log(error);
// //       alert("❌ Could not connect to Cashfree payment gateway.");
// //       setIsPaying(false);
// //     }
// //   };



// try {
//       // Step A: Backend se Cashfree Session ID generate karwana
//       const checkoutRes = await fetch("https://xbihar.onrender.com/api/payment/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: finalTotal,
//           customerPhone: formData.phone,
//           customerEmail: formData.email || "customer@xbihar.com",
//         }),
//       });

//       const checkoutData = await checkoutRes.json();
//       if (!checkoutData.success || !checkoutData.paymentSessionId) {
//         alert("❌ Cashfree order generation failed!");
//         setIsPaying(false);
//         return;
//       }

//       // 🆕 Step B: Page redirect hone se PEHLE, order banane ka data localStorage mein save karo
//       localStorage.setItem("pendingOrderData", JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         shippingCharge: deliveryCharge,
//         shippingAddress: {
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode,
//         },
//         totalPrice: finalTotal,
//         products: productsData,
//         cashfreeOrderId: checkoutData.orderId,
//       }));

//       // Step C: Cashfree checkout kholo — is baad koi code nahi chalega, page navigate ho jayega
//       const cashfree = new (window as any).Cashfree({
//         mode: "production",
//       });

//       cashfree.checkout({
//         paymentSessionId: checkoutData.paymentSessionId,
//         redirectTarget: "_self",
//       });

//     } catch (error) {
//       console.log(error);
//       alert("❌ Could not connect to Cashfree payment gateway.");
//       setIsPaying(false);
//     }
//   };



//   return (
//     <main className="bg-black text-white min-h-screen">
//       {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" /> */}

//       <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
//         <h1 className="text-4xl font-orbitron mb-12">CHECKOUT</h1>
//         <div className="grid md:grid-cols-2 gap-12">
//           {/* LEFT FORM */}
//           <div className="space-y-6 font-['Inter'] ">
//             <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
//             <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
//             <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
//             <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none h-28" />
//             <input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
//             <input placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
            
//             {/* THE PINCODE INPUT FIELD */}
//             <div className="relative">
//               <input 
//                 placeholder="Pincode (6-digit)" 
//                 maxLength={6}
//                 value={formData.pincode} 
//                 onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })} 
//                 className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-transparent focus:border-zinc-700 font-['Inter']" 
//               />
//               {loadingShipping && <span className="absolute right-4 top-4 text-xs text-zinc-500 animate-pulse">Calculating rate...</span>}
//             </div>
//           </div>

//           {/* RIGHT ORDER SUMMARY */}
//           <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 h-fit">
//             <h2 className="text-2xl font-orbitron mb-6">ORDER SUMMARY</h2>
//             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
//               {cart.map((item, index) => (
//                 <div key={item.id + "-" + index} className="flex justify-between text-zinc-300 font-['Inter'] ">
//                   <p>{item.title} x {item.quantity}</p>
//                   <p>₹{item.price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>


//             <div className="mt-6 border-t border-zinc-800 pt-4 space-y-3 text-zinc-400">
//               <div className="flex justify-between font-['Inter']">
//                 <p>Subtotal</p>
//                 <p>₹{totalPrice}</p>
//               </div>
//               {couponDiscount > 0 && (
//                 <div className="flex justify-between text-red-400 font-['Inter']">
//                   <p>Coupon Discount</p>
//                   <p>-₹{couponDiscount}</p>
//                 </div>
//               )}
//               <div className="flex justify-between">
//                 <p>Delivery Charges</p>
//                 {/* 🎯 FIX 2: Ab cart page ka calculated dynamic rate bina delee ke turant yahan load ho jayega */}
//                 <p className="text-green-400 font-['Inter']">{deliveryCharge > 0 ? `₹${deliveryCharge}` : "Enter pincode"}</p>
//               </div>
//               <hr className="border-zinc-800 my-2" />
//               <div className="flex justify-between font-orbitron text-white text-xl font-bold">
//                 <p>Total</p>
//                 <p>₹{finalTotal}</p>
//               </div>
//             </div>

//             {/* <button onClick={handleOrder} className="w-full mt-6 bg-white text-black py-4 rounded-xl font-orbitron font-bold hover:bg-gray-200">
//               PAY NOW
//             </button> */}

//             {/* 🌟 Button ko badal kar aisa kar dijiye */}
// <button 
//   disabled={isPaying || loadingShipping || finalTotal <= 0} 
//   onClick={handleOrder} 
//   className="w-full mt-6 bg-white text-black py-4 rounded-xl font-orbitron font-bold hover:bg-gray-200 disabled:bg-zinc-700 disabled:text-zinc-400 transition-all"
// >
//   {isPaying ? "SECURELY OPENING GATEWAY..." : "PAY NOW"}
// </button>


//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }














// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useState, useEffect } from "react";
// // import Navbar from "@/components/Navbar";
// // import { useCart } from "@/app/context/CartContext";
// // import Script from "next/script";

// // export default function CheckoutPage() {
// //   const { cart } = useCart();
// //   const router = useRouter();

// //   const [deliveryCharge, setDeliveryCharge] = useState(0);
// //   const [couponDiscount, setCouponDiscount] = useState(0);
// //   const [cartWeight, setCartWeight] = useState(0);
// //   const [loadingShipping, setLoadingShipping] = useState(false);

// //   const [isPaying, setIsPaying] = useState(false);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     phone: "",
// //     email: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //   });

// //   const checkAuth = async () => {
// //     try {
// //       const res = await fetch("https://xbihar.onrender.com/api/auth/check", { credentials: "include" });
// //       return res.status === 200;
// //     } catch (err) {
// //       return false;
// //     }
// //   };

// //   // 🎯 FIX 1: Initial load par Cart Page se saved Delivery Charge aur Pincode auto-load karein
// //   useEffect(() => {
// //     const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
// //     if (summary.totalWeightInKg) {
// //       setCartWeight(summary.totalWeightInKg);
// //       setCouponDiscount(summary.couponDiscount || 0);
// //     }
    
// //     // Agar cart summary mein pehle se delivery charge aur pincode hai, toh use set kar dein
// //     if (summary.shippingCharge !== undefined) {
// //       setDeliveryCharge(Number(summary.shippingCharge));
// //     }
// //     if (summary.pincode) {
// //       setFormData((prev) => ({ ...prev, pincode: summary.pincode }));
// //     }
// //   }, []);

// //   // 💡 LIVE AUTOMATIC PINCODE CALCULATOR EFFECT
// //   // Jab user input box mein pincode ko manually 6-digit ka karega tabhi naya rate fetch hoga
// //   useEffect(() => {
// //     // Pura summary read karke check karein ki kya yeh wahi pincode hai jo cart se aaya tha
// //     const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
    
// //     // Agar typed pincode wahi hai jo cart page wala hai, toh dobara API call block karein (performance fix)
// //     if (formData.pincode === summary.pincode && summary.shippingCharge !== undefined) {
// //       setDeliveryCharge(Number(summary.shippingCharge));
// //       return;
// //     }

// //     if (formData.pincode.length === 6 && cartWeight > 0) {
// //       const fetchLiveShipping = async () => {
// //         setLoadingShipping(true);
// //         try {
// //           const res = await fetch("https://xbihar.onrender.com/api/shipping/rates", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               pincode: formData.pincode, 
// //               weight: cartWeight,      
// //             }),
// //           });
// //           const data = await res.json();
// //           if (data.success) {
// //             setDeliveryCharge(data.courier.charge);
// //           } else {
// //             alert("Delivery not available for this pincode!");
// //             setDeliveryCharge(0);
// //           }
// //         } catch (err) {
// //           console.log("Shipping error:", err);
// //         } finally {
// //           setLoadingShipping(false);
// //         }
// //       };

// //       fetchLiveShipping();
// //     } else if (formData.pincode.length < 6) {
// //       setDeliveryCharge(0); // Agar user backspace kare toh rate reset ho jaye
// //     }
// //   }, [formData.pincode, cartWeight]);

// //   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
// //   const finalTotal = totalPrice - couponDiscount + deliveryCharge;

// //   const handleOrder = async () => {
// //     const isAuth = await checkAuth();
// //     if (!isAuth) {
// //       alert("Please login first");
// //       router.push("/login");
// //       return;
// //     }

// //     if (!formData.name || !formData.phone || !formData.address || formData.pincode.length !== 6) {
// //       alert("Please fill in all complete shipping details.");
// //       return;
// //     }

// //     setIsPaying(true); // Payment process start

// //     const productsData = cart.map((item, index) => ({
// //       productId: `${item.id}-${item.size}-${index}`,
// //       title: item.title,
// //       price: item.price,
// //       image: item.image,
// //       quantity: item.quantity,
// //       size: item.size,
// //     }));

// //     try {
// //       // 💳 Step A: Backend se Cashfree Order ID / Session generate karwana (Aapka API hit)
// //       const checkoutRes = await fetch("https://xbihar.onrender.com/api/orders", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name: formData.name,
// //           email: formData.email,
// //           phone: formData.phone,
// //           shippingCharge: deliveryCharge,
// //           shippingAddress: formData.address, // Controller nested structure local check ke sath backend handle karega
// //           city: formData.city,
// //           state: formData.state,
// //           pincode: formData.pincode,
// //           totalPrice: finalTotal,
// //           products: productsData,
// //         }),
// //       });

// //       const checkoutData = await checkoutRes.json();
// //       if (!checkoutData.success || !checkoutData.payment_session_id) {
// //         alert("❌ Cashfree order generation failed!");
// //         setIsPaying(false);
// //         return;
// //       }

// //       // 💳 Step B: Cashfree configuration SDK open popup
// //       if (typeof window !== "undefined" && (window as any).Cashfree) {
// //         const cashfree = (window as any).Cashfree({
// //           mode: "production", // Live chalane ke liye production mode
// //         });

// //         cashfree.checkout({
// //           paymentSessionId: checkoutData.payment_session_id,
// //           redirectTarget: "_self",
// //         }).then(async () => {
// //           // 🎯 Payment complete hone ke baad status verify karna
// //           try {
// //             const verifyRes = await fetch("https://xbihar.onrender.com/api/orders/verify-payment", {
// //               method: "POST",
// //               headers: { "Content-Type": "application/json" },
// //               body: JSON.stringify({ cfOrderId: checkoutData.cfOrderId }),
// //             });

// //             const verifyData = await verifyRes.json();
// //             if (verifyData.success) {
// //               alert("🎉 Payment Successful & Order Placed!");
// //               localStorage.removeItem("cartSummary");
// //               router.push("/orders/success"); 
// //             } else {
// //               alert("❌ Payment Verification Failed: " + verifyData.message);
// //             }
// //           } catch (err) {
// //             console.error(err);
// //             alert("❌ Error verifying payment status.");
// //           } finally {
// //             setIsPaying(false);
// //           }
// //         });
// //       } else {
// //         alert("Cashfree SDK not loaded properly.");
// //         setIsPaying(false);
// //       }

// //     } catch (error) {
// //       console.log(error);
// //       alert("❌ Could not connect to payment gateway.");
// //       setIsPaying(false);
// //     }
// //   };

// //   return (
// //     <main className="bg-black text-white min-h-screen">
// //       {/* ⚡ Yahan Cashfree ki live SDK laga di hai */}
// //       <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />
// //       <Navbar />
// //       <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
// //         <h1 className="text-4xl font-orbitron mb-12">CHECKOUT</h1>
// //         <div className="grid md:grid-cols-2 gap-12">
// //           {/* LEFT FORM */}
// //           <div className="space-y-6">
// //             <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
// //             <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
// //             <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
// //             <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none h-28" />
// //             <input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
// //             <input placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full bg-zinc-900 p-4 rounded-xl outline-none" />
            
// //             {/* THE PINCODE INPUT FIELD */}
// //             <div className="relative">
// //               <input 
// //                 placeholder="Pincode (6-digit)" 
// //                 maxLength={6}
// //                 value={formData.pincode} 
// //                 onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })} 
// //                 className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-transparent focus:border-zinc-700 font-['Inter']" 
// //               />
// //               {loadingShipping && <span className="absolute right-4 top-4 text-xs text-zinc-500 animate-pulse">Calculating rate...</span>}
// //             </div>
// //           </div>

// //           {/* RIGHT ORDER SUMMARY */}
// //           <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 h-fit">
// //             <h2 className="text-2xl font-orbitron mb-6">ORDER SUMMARY</h2>
// //             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
// //               {cart.map((item, index) => (
// //                 <div key={item.id + "-" + index} className="flex justify-between text-zinc-300">
// //                   <p>{item.title} x {item.quantity}</p>
// //                   <p>₹{item.price * item.quantity}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="mt-6 border-t border-zinc-800 pt-4 space-y-3 text-zinc-400">
// //               <div className="flex justify-between">
// //                 <p>Subtotal</p>
// //                 <p>₹{totalPrice}</p>
// //               </div>
// //               {couponDiscount > 0 && (
// //                 <div className="flex justify-between text-red-400">
// //                   <p>Coupon Discount</p>
// //                   <p>-₹{couponDiscount}</p>
// //                 </div>
// //               )}
// //               <div className="flex justify-between">
// //                 <p>Delivery Charges</p>
// //                 <p className="text-green-400 font-bold">{deliveryCharge > 0 ? `₹${deliveryCharge}` : "Enter pincode"}</p>
// //               </div>
// //               <hr className="border-zinc-800 my-2" />
// //               <div className="flex justify-between font-orbitron text-white text-xl font-bold">
// //                 <p>Total</p>
// //                 <p>₹{finalTotal}</p>
// //               </div>
// //             </div>

// //             <button 
// //               disabled={isPaying || loadingShipping || finalTotal <= 0} 
// //               onClick={handleOrder} 
// //               className="w-full mt-6 bg-white text-black py-4 rounded-xl font-orbitron font-bold hover:bg-gray-200 disabled:bg-zinc-700 disabled:text-zinc-400 transition-all"
// //             >
// //               {isPaying ? "SECURELY OPENING GATEWAY..." : "PAY NOW"}
// //             </button>

// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }






"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";
import Script from "next/script";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [cartWeight, setCartWeight] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  };

  // Initial load: Cart Summary & Pincode auto-load
  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
    if (summary.totalWeightInKg) {
      setCartWeight(summary.totalWeightInKg);
      setCouponDiscount(summary.couponDiscount || 0);
    }
    if (summary.shippingCharge !== undefined) {
      setDeliveryCharge(Number(summary.shippingCharge));
    }
    if (summary.pincode) {
      setFormData((prev) => ({ ...prev, pincode: summary.pincode }));
    }
  }, []);

  // Live Pincode Shipping Rates Calculator
  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("cartSummary") || "{}");
    if (formData.pincode === summary.pincode && summary.shippingCharge !== undefined) {
      setDeliveryCharge(Number(summary.shippingCharge));
      return;
    }

    if (formData.pincode.length === 6 && cartWeight > 0) {
      const fetchLiveShipping = async () => {
        setLoadingShipping(true);
        try {
          const res = await fetch("https://xbihar.onrender.com/api/shipping/rates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pincode: formData.pincode,
              weight: cartWeight,
            }),
          });
          const data = await res.json();
          if (data.success) {
            setDeliveryCharge(data.courier.charge);
          } else {
            alert("Delivery not available for this pincode!");
            setDeliveryCharge(0);
          }
        } catch (err) {
          console.log("Shipping error:", err);
        } finally {
          setLoadingShipping(false);
        }
      };

      fetchLiveShipping();
    } else if (formData.pincode.length < 6) {
      setDeliveryCharge(0);
    }
  }, [formData.pincode, cartWeight]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalTotal = totalPrice - couponDiscount + deliveryCharge;

  const handleOrder = async () => {
    const isAuth = await checkAuth();
    if (!isAuth) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || formData.pincode.length !== 6) {
      alert("Please fill in all complete shipping details.");
      return;
    }

    setIsPaying(true);

    const productsData = cart.map((item, index) => ({
      productId: `${item.id}-${item.size}-${index}`,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      size: item.size,
    }));

    try {
      const token = localStorage.getItem("token");

      // Step A: Backend se Cashfree Payment Session generate karna
      const checkoutRes = await fetch("https://xbihar.onrender.com/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: finalTotal,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email || "customer@xbihar.com",
          returnUrl: "https://xbihar.com/success?order_id={order_id}",
          // returnUrl: "https://xbihar.com/orders?order_id={order_id}", // 🚨 404 Fix
        }),
      });

      const checkoutData = await checkoutRes.json();
      if (!checkoutData.success || !checkoutData.paymentSessionId) {
        alert("❌ Cashfree order generation failed!");
        setIsPaying(false);
        return;
      }

      // Step B: Redirect hone se pehle pending order info store karna
      localStorage.setItem(
        "pendingOrderData",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          shippingCharge: deliveryCharge,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          totalPrice: finalTotal,
          products: productsData,
          cashfreeOrderId: checkoutData.orderId,
        })
      );

      // Step C: Cashfree payment popup/redirect trigger karna
      if (typeof window !== "undefined" && (window as any).Cashfree) {
        const cashfree = new (window as any).Cashfree({
          mode: "production", // Live production mode
        });

        cashfree.checkout({
          paymentSessionId: checkoutData.paymentSessionId,
          redirectTarget: "_self",
        });
      } else {
        alert("Cashfree SDK not loaded properly.");
        setIsPaying(false);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Could not connect to Cashfree payment gateway.");
      setIsPaying(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl font-orbitron mb-12">CHECKOUT</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT FORM */}
          <div className="space-y-6 font-['Inter']">
            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            />
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none h-28"
            />
            <input
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            />
            <input
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            />

            {/* PINCODE FIELD */}
            <div className="relative">
              <input
                placeholder="Pincode (6-digit)"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-transparent focus:border-zinc-700 font-['Inter']"
              />
              {loadingShipping && (
                <span className="absolute right-4 top-4 text-xs text-zinc-500 animate-pulse">
                  Calculating rate...
                </span>
              )}
            </div>
          </div>

          {/* RIGHT ORDER SUMMARY */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 h-fit">
            <h2 className="text-2xl font-orbitron mb-6">ORDER SUMMARY</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <div key={item.id + "-" + index} className="flex justify-between text-zinc-300 font-['Inter']">
                  <p>
                    {item.title} x {item.quantity}
                  </p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-zinc-800 pt-4 space-y-3 text-zinc-400">
              <div className="flex justify-between font-['Inter']">
                <p>Subtotal</p>
                <p>₹{totalPrice}</p>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-red-400 font-['Inter']">
                  <p>Coupon Discount</p>
                  <p>-₹{couponDiscount}</p>
                </div>
              )}
              <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p className="text-green-400 font-['Inter']">
                  {deliveryCharge > 0 ? `₹${deliveryCharge}` : "Enter pincode"}
                </p>
              </div>
              <hr className="border-zinc-800 my-2" />
              <div className="flex justify-between font-orbitron text-white text-xl font-bold">
                <p>Total</p>
                <p>₹{finalTotal}</p>
              </div>
            </div>

            <button
              disabled={isPaying || loadingShipping || finalTotal <= 0}
              onClick={handleOrder}
              className="w-full mt-6 bg-white text-black py-4 rounded-xl font-orbitron font-bold hover:bg-gray-200 disabled:bg-zinc-700 disabled:text-zinc-400 transition-all"
            >
              {isPaying ? "SECURELY OPENING GATEWAY..." : "PAY NOW"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// // Live tracking ke standard states
// const TRACKING_STEPS = ["Processing", "Shipped","Out for Delivery","Delivered"];

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // useEffect(() => {
//   //   // 1. USER PROFILE FETCH
//   //   fetch("https://xbihar.onrender.com/api/auth/profile", {
//   //     credentials: "include",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setUser(data.user);
//   //     })
//   //     .catch((err) => console.log("Profile load failed", err));

//   //   // 2. FIXED API FETCH (Sync with your controller response)
//   //   fetch("https://xbihar.onrender.com/api/orders/myorders", {
//   //     credentials: "include",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       // Safe check: Agar data.success true hai toh data.orders, warna direct array check
//   //       if (data && data.success) {
//   //         setOrders(data.orders || []);
//   //       } else if (Array.isArray(data)) {
//   //         setOrders(data);
//   //       }
//   //     })
//   //     .catch((err) => console.log("Orders load failed", err))
//   //     .finally(() => setLoading(false));
//   // }, []);
// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     setLoading(false);
//     return;
//   }

//   fetch("https://xbihar.onrender.com/api/auth/profile", {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setUser(data.user);
//     })
//     .catch((err) => console.log("Profile load failed", err));

//   fetch("https://xbihar.onrender.com/api/orders/myorders", {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data && data.success) {
//         setOrders(data.orders || []);
//       } else if (Array.isArray(data)) {
//         setOrders(data);
//       }
//     })
//     .catch((err) => console.log("Orders load failed", err))
//     .finally(() => setLoading(false));
// }, []);



//   // Current active index nikalne ke liye helper
//   const getStepIndex = (status: string) => {
//     const currentStatus = status || "Processing";
//     const idx = TRACKING_STEPS.indexOf(currentStatus);
//     return idx !== -1 ? idx : 0;
//   };

//   // LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black font-mono tracking-widest animate-pulse">
//         LOADING ORDERS MATRIX...
//       </div>
//     );
//   }

//   // AUTH PROTECT SAFEGUARD (Agar user login nahi hai toh login push karega)
//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black font-mono p-4 text-center">
//         <p className="text-zinc-500 mb-4">Please log in to view your orders.</p>
//         <button onClick={() => router.push("/login")} className="bg-white text-black px-6 py-2 rounded font-bold">
//           GO TO LOGIN
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen font-['Inter'] p-6 md:p-12">
//       <div className="max-w-4xl mx-auto">
        
//         {/* HEADER */}
//         <div className="border-b border-zinc-800 pb-6 mb-10">
//           <h1 className="text-3xl font-bold uppercase font-orbitron text-white">
//             MY ORDERS
//           </h1>
//           <p className="text-zinc-500 text-sm mt-1">
//             Logged in as: <span className="text-zinc-300 font-['Inter']">{user.email || "Survi"}</span>
//           </p>
//         </div>

//         {/* CASE 1: NO ORDERS */}
//         {orders.length === 0 ? (
//           <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl py-20 px-4 text-center">
//             <h2 className="text-2xl font-['Inter'] mb-2">
//               👋 Welcome, {user.name || "Survi"}
//             </h2>
//             <p className="text-zinc-500 max-w-sm mb-8 text-sm">
//               Your order timeline is empty. Looks like you haven't secured any drops yet.
//             </p>
//             <button
//               onClick={() => router.push("/")}
//               className="bg-white text-black font-mono font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition active:scale-95"
//             >
//               SHOP THE DROP
//             </button>
//           </div>
//         ) : (
//           /* CASE 2: HAS ORDERS */
//           <div className="space-y-8">
//             {orders.map((order: any, i: number) => {
//               const currentStep = getStepIndex(order.orderStatus);

//               return (
//                 <div
//                   key={order._id || i}
//                   className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition hover:border-zinc-800"
//                 >
//                   {/* TOP META DETAILS */}
//                   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6 text-sm">
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Order ID</span>
//                       <span className="font-mono text-zinc-300 font-semibold">{order._id || `ORD-00${i}`}</span>
//                     </div>
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Total Paid</span>
//                       <span className="font-mono text-green-400 font-bold text-base">₹{order.totalPrice}</span>
//                     </div>
//                   </div>

//                   {/* PRODUCTS LIST (Fully Synced with orderController layout keys) */}
//                   <div className="space-y-4 mb-8">
//                     {order.products?.map((item: any, idx: number) => (
//                       <div key={idx} className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
//                         <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-[10px] text-zinc-600 font-mono overflow-hidden border border-zinc-800">
//                           {item.image ? (
//                             <img src={item.image} alt="" className="w-full h-full object-cover" />
//                           ) : (
//                             "DROP"
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-medium text-sm text-white">{item.title || "Premium Streetwear Item"}</h4>
//                           <p className="text-xs text-zinc-500 font-mono mt-0.5">
//                             ₹{item.price} {item.size ? `| Size: ${item.size}` : ""} | Qty: {item.quantity || 1}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* LIVE TIMELINE TRACK BAR */}
//                   <div className="my-8 px-2">
//                     <div className="relative flex justify-between items-center w-full">
//                       <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
//                       <div
//                         className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-600 transition-all duration-500 z-0"
//                         style={{
//                           width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
//                         }}
//                       />

//                       {TRACKING_STEPS.map((step, stepIdx) => {
//                         const isDone = stepIdx <= currentStep;
//                         const isCurrent = stepIdx === currentStep;

//                         return (
//                           <div key={stepIdx} className="flex flex-col items-center relative z-10">
//                             <div
//                               className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
//                                 isCurrent
//                                   ? "bg-black border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110"
//                                   : isDone
//                                   ? "bg-red-600 border-red-600"
//                                   : "bg-zinc-950 border-zinc-800"
//                               }`}
//                             >
//                               {isCurrent && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
//                               {isDone && !isCurrent && <span className="text-[9px] text-white font-bold">✓</span>}
//                             </div>
//                             <span
//                               className={`text-[10px] font-mono mt-2 tracking-tight ${
//                                 isCurrent ? "text-red-500 font-bold" : isDone ? "text-zinc-200" : "text-zinc-600"
//                               }`}
//                             >
//                               {step}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* LIVE COURIER / TRACKING LINK BOX */}
//                   {(order.courier || order.trackingUrl) && (
//                     <div className="mt-6 bg-zinc-900 border border-zinc-800/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
//                       <div className="text-xs font-mono">
//                         <span className="text-zinc-500 block">SHIPPING VIA</span>
//                         <span className="text-zinc-300 uppercase font-bold">{order.courier || "Logistics Partner"}</span>
//                       </div>
                      
//                       {order.trackingUrl && (
//                         <a
//                           href={order.trackingUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-zinc-800 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition"
//                         >
//                           LIVE TRACKING ↗
//                         </a>
//                       )}
//                     </div>
//                   )}

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// // Live tracking ke standard states
// const TRACKING_STEPS = ["Processing", "Shipped","Out for Delivery","Delivered"];

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     fetch("https://xbihar.onrender.com/api/auth/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUser(data.user);
//       })
//       .catch((err) => console.log("Profile load failed", err));

//     fetch("https://xbihar.onrender.com/api/orders/myorders", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.success) {
//           setOrders(data.orders || []);
//         } else if (Array.isArray(data)) {
//           setOrders(data);
//         }
//       })
//       .catch((err) => console.log("Orders load failed", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Current active index nikalne ke liye helper
//   const getStepIndex = (status: string) => {
//     const currentStatus = status || "Processing";
//     const idx = TRACKING_STEPS.indexOf(currentStatus);
//     return idx !== -1 ? idx : 0;
//   };

//   // LOADING STATE
//   if (loading) {
//     return (
//       <div className=" font-orbitron min-h-screen flex items-center justify-center text-white bg-black font-mono tracking-widest animate-pulse">
//         LOADING ORDERS MATRIX...
//       </div>
//     );
//   }

//   // AUTH PROTECT SAFEGUARD (Agar user login nahi hai toh login push karega)
//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black font-mono p-4 text-center">
//         <p className="text-zinc-500 mb-4">Please log in to view your orders.</p>
//         <button onClick={() => router.push("/login")} className="bg-white text-black px-6 py-2 rounded font-bold">
//           GO TO LOGIN
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen font-['Inter'] p-6 md:p-12">
//       <div className="max-w-4xl mx-auto">
        
//         {/* HEADER */}
//         <div className="border-b border-zinc-800 pb-6 mb-10">
//           <h1 className="text-3xl font-bold uppercase font-orbitron text-white">
//             MY ORDERS
//           </h1>
//           <p className="font-['Inter'] text-zinc-500 text-sm mt-1">
//             Logged in as: <span className="text-zinc-300 font-['Inter']">{user.email || user.name}</span>
//           </p>
//         </div>

//         {/* CASE 1: NO ORDERS */}
//         {orders.length === 0 ? (
//           <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl py-20 px-4 text-center">
//             <h2 className="text-2xl font-['Inter'] mb-2">
//               👋 Welcome, {user.name || user.email?.split("@")[0] || "User"}
//             </h2>
//             <p className="text-zinc-500 max-w-sm mb-8 text-sm font-['Inter']">
//               Your order timeline is empty. Looks like you haven't secured any drops yet.
//             </p>
//             <button
//               onClick={() => router.push("/")}
//               className="font-orbitron bg-white text-black font-mono font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition active:scale-95"
//             >
//               SHOP THE DROP
//             </button>
//           </div>
//         ) : (
//           /* CASE 2: HAS ORDERS */
//           <div className="space-y-8">
//             {orders.map((order: any, i: number) => {
//               const currentStep = getStepIndex(order.orderStatus);

//               return (
//                 <div
//                   key={order._id || i}
//                   className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition hover:border-zinc-800"
//                 >
//                   {/* TOP META DETAILS */}
//                   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6 text-sm">
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Order ID</span>
//                       <span className="font-mono text-zinc-300 font-semibold">{order._id || `ORD-00${i}`}</span>
//                     </div>
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Total Paid</span>
//                       <span className="font-mono text-green-400 font-bold text-base">₹{order.totalPrice}</span>
//                     </div>
//                   </div>

//                   {/* PRODUCTS LIST */}
//                   <div className="space-y-4 mb-8">
//                     {order.products?.map((item: any, idx: number) => (
//                       <div key={idx} className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
//                         <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-[10px] text-zinc-600 font-mono overflow-hidden border border-zinc-800">
//                           {item.image ? (
//                             <img src={item.image} alt="" className="w-full h-full object-cover" />
//                           ) : (
//                             "DROP"
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-medium text-sm text-white">{item.title || "Premium Streetwear Item"}</h4>
//                           <p className="text-xs text-zinc-500 font-mono mt-0.5">
//                             ₹{item.price} {item.size ? `| Size: ${item.size}` : ""} | Qty: {item.quantity || 1}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* LIVE TIMELINE TRACK BAR */}
//                   <div className="my-8 px-2">
//                     <div className="relative flex justify-between items-center w-full">
//                       <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
//                       <div
//                         className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-600 transition-all duration-500 z-0"
//                         style={{
//                           width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
//                         }}
//                       />

//                       {TRACKING_STEPS.map((step, stepIdx) => {
//                         const isDone = stepIdx <= currentStep;
//                         const isCurrent = stepIdx === currentStep;

//                         return (
//                           <div key={stepIdx} className="flex flex-col items-center relative z-10">
//                             <div
//                               className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
//                                 isCurrent
//                                   ? "bg-black border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110"
//                                   : isDone
//                                   ? "bg-red-600 border-red-600"
//                                   : "bg-zinc-950 border-zinc-800"
//                               }`}
//                             >
//                               {isCurrent && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
//                               {isDone && !isCurrent && <span className="text-[9px] text-white font-bold">✓</span>}
//                             </div>
//                             <span
//                               className={`text-[10px] font-mono mt-2 tracking-tight ${
//                                 isCurrent ? "text-red-500 font-bold" : isDone ? "text-zinc-200" : "text-zinc-600"
//                               }`}
//                             >
//                               {step}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* LIVE COURIER / TRACKING LINK BOX */}
//                   {(order.courier || order.trackingUrl) && (
//                     <div className="mt-6 bg-zinc-900 border border-zinc-800/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
//                       <div className="text-xs font-mono">
//                         <span className="text-zinc-500 block">SHIPPING VIA</span>
//                         <span className="text-zinc-300 uppercase font-bold">{order.courier || "Logistics Partner"}</span>
//                       </div>
                      
//                       {order.trackingUrl && (
//                         <a
//                           href={order.trackingUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-zinc-800 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition"
//                         >
//                           LIVE TRACKING ↗
//                         </a>
//                       )}
//                     </div>
//                   )}

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// // Live tracking ke standard states
// const TRACKING_STEPS = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [verifying, setVerifying] = useState(false);
//   const [paymentMsg, setPaymentMsg] = useState("");

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderIdFromUrl = searchParams.get("order_id");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     // 1. FETCH USER PROFILE
//     fetch("https://xbihar.onrender.com/api/auth/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.user) {
//           setUser(data.user);
//         }
//       })
//       .catch((err) => console.log("Profile load failed", err));

//     // 2. CASHFREE PAYMENT AUTO-VERIFY (IF redirected from Cashfree)
//     if (orderIdFromUrl) {
//       setVerifying(true);
//       fetch("https://xbihar.onrender.com/api/payment/verify", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId: orderIdFromUrl }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setPaymentMsg("🎉 Payment Verified & Order Placed Successfully!");
//           }
//         })
//         .catch((err) => console.log("Verification error:", err))
//         .finally(() => {
//           setVerifying(false);
//           // Remove query params from URL without page reload
//           router.replace("/orders");
//           fetchMyOrders(token);
//         });
//     } else {
//       fetchMyOrders(token);
//     }
//   }, [orderIdFromUrl]);

//   // Helper to fetch orders
//   const fetchMyOrders = (token: string) => {
//     fetch("https://xbihar.onrender.com/api/orders/myorders", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.success) {
//           setOrders(data.orders || []);
//         } else if (Array.isArray(data)) {
//           setOrders(data);
//         }
//       })
//       .catch((err) => console.log("Orders load failed", err))
//       .finally(() => setLoading(false));
//   };

//   // Helper for tracking index
//   const getStepIndex = (status: string) => {
//     const currentStatus = status || "Processing";
//     const idx = TRACKING_STEPS.indexOf(currentStatus);
//     return idx !== -1 ? idx : 0;
//   };

//   // LOADING / VERIFYING STATE
//   if (loading || verifying) {
//     return (
//       <div className="font-orbitron min-h-screen flex flex-col items-center justify-center text-white bg-black font-mono tracking-widest animate-pulse p-4 text-center">
//         <p className="text-xl mb-2">
//           {verifying ? "VERIFYING CASHFREE PAYMENT..." : "LOADING ORDERS MATRIX..."}
//         </p>
//         <p className="text-xs text-zinc-500 font-sans">Please do not refresh or close the page.</p>
//       </div>
//     );
//   }

//   // AUTH PROTECT SAFEGUARD
//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black font-mono p-4 text-center">
//         <p className="text-zinc-500 mb-4 font-['Inter']">Please log in to view your orders.</p>
//         <button
//           onClick={() => router.push("/login")}
//           className="bg-white text-black px-6 py-2 rounded font-bold font-orbitron hover:bg-zinc-200 transition"
//         >
//           GO TO LOGIN
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen font-['Inter'] p-6 md:p-12">
//       <div className="max-w-4xl mx-auto">
        
//         {/* PAYMENT SUCCESS TOAST MESSAGE */}
//         {paymentMsg && (
//           <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-sm font-mono text-center animate-bounce">
//             {paymentMsg}
//           </div>
//         )}

//         {/* HEADER */}
//         <div className="border-b border-zinc-800 pb-6 mb-10">
//           <h1 className="text-3xl font-bold uppercase font-orbitron text-white">
//             MY ORDERS
//           </h1>
//           <p className="font-['Inter'] text-zinc-500 text-sm mt-1">
//             Logged in as: <span className="text-zinc-300 font-['Inter']">{user.name || user.email}</span>
//           </p>
//         </div>

//         {/* CASE 1: NO ORDERS */}
//         {orders.length === 0 ? (
//           <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl py-20 px-4 text-center">
//             <h2 className="text-2xl font-['Inter'] mb-2">
//               👋 Welcome, {user.name || user.email?.split("@")[0] || "User"}
//             </h2>
//             <p className="text-zinc-500 max-w-sm mb-8 text-sm font-['Inter']">
//               Your order timeline is empty. Looks like you haven't secured any drops yet.
//             </p>
//             <button
//               onClick={() => router.push("/")}
//               className="font-orbitron bg-white text-black font-mono font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition active:scale-95"
//             >
//               SHOP THE DROP
//             </button>
//           </div>
//         ) : (
//           /* CASE 2: HAS ORDERS */
//           <div className="space-y-8">
//             {orders.map((order: any, i: number) => {
//               const currentStep = getStepIndex(order.orderStatus);

//               return (
//                 <div
//                   key={order._id || i}
//                   className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition hover:border-zinc-800"
//                 >
//                   {/* TOP META DETAILS */}
//                   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6 text-sm">
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Order ID</span>
//                       <span className="font-mono text-zinc-300 font-semibold">{order._id || `ORD-00${i}`}</span>
//                     </div>
//                     <div>
//                       <span className="text-zinc-500 font-mono text-xs block uppercase">Total Paid</span>
//                       <span className="font-mono text-green-400 font-bold text-base">₹{order.totalPrice}</span>
//                     </div>
//                   </div>

//                   {/* PRODUCTS LIST */}
//                   <div className="space-y-4 mb-8">
//                     {order.products?.map((item: any, idx: number) => (
//                       <div key={idx} className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
//                         <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-[10px] text-zinc-600 font-mono overflow-hidden border border-zinc-800">
//                           {item.image ? (
//                             <img src={item.image} alt="" className="w-full h-full object-cover" />
//                           ) : (
//                             "DROP"
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-medium text-sm text-white">{item.title || "Premium Streetwear Item"}</h4>
//                           <p className="text-xs text-zinc-500 font-mono mt-0.5">
//                             ₹{item.price} {item.size ? `| Size: ${item.size}` : ""} | Qty: {item.quantity || 1}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* LIVE TIMELINE TRACK BAR */}
//                   <div className="my-8 px-2">
//                     <div className="relative flex justify-between items-center w-full">
//                       <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
//                       <div
//                         className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-600 transition-all duration-500 z-0"
//                         style={{
//                           width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
//                         }}
//                       />

//                       {TRACKING_STEPS.map((step, stepIdx) => {
//                         const isDone = stepIdx <= currentStep;
//                         const isCurrent = stepIdx === currentStep;

//                         return (
//                           <div key={stepIdx} className="flex flex-col items-center relative z-10">
//                             <div
//                               className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
//                                 isCurrent
//                                   ? "bg-black border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110"
//                                   : isDone
//                                   ? "bg-red-600 border-red-600"
//                                   : "bg-zinc-950 border-zinc-800"
//                               }`}
//                             >
//                               {isCurrent && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
//                               {isDone && !isCurrent && <span className="text-[9px] text-white font-bold">✓</span>}
//                             </div>
//                             <span
//                               className={`text-[10px] font-mono mt-2 tracking-tight ${
//                                 isCurrent ? "text-red-500 font-bold" : isDone ? "text-zinc-200" : "text-zinc-600"
//                               }`}
//                             >
//                               {step}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* LIVE COURIER / TRACKING LINK BOX */}
//                   {(order.courier || order.trackingUrl) && (
//                     <div className="mt-6 bg-zinc-900 border border-zinc-800/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
//                       <div className="text-xs font-mono">
//                         <span className="text-zinc-500 block">SHIPPING VIA</span>
//                         <span className="text-zinc-300 uppercase font-bold">{order.courier || "Logistics Partner"}</span>
//                       </div>
                      
//                       {order.trackingUrl && (
//                         <a
//                           href={order.trackingUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-zinc-800 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition"
//                         >
//                           LIVE TRACKING ↗
//                         </a>
//                       )}
//                     </div>
//                   )}

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";

const TRACKING_STEPS = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

function OrdersContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://xbihar.onrender.com/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.log("Profile load failed", err));

    fetch("https://xbihar.onrender.com/api/orders/myorders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setOrders(data.orders || []);
        } else if (Array.isArray(data)) {
          setOrders(data);
        }
      })
      .catch((err) => console.log("Orders load failed", err))
      .finally(() => setLoading(false));
  }, []);

  const getStepIndex = (status: string) => {
    const currentStatus = status || "Processing";
    const idx = TRACKING_STEPS.indexOf(currentStatus);
    return idx !== -1 ? idx : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black font-mono tracking-widest animate-pulse">
        LOADING ORDERS MATRIX...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black font-mono p-4 text-center">
        <p className="text-zinc-500 mb-4">Please log in to view your orders.</p>
        <button onClick={() => router.push("/login")} className="bg-white text-black px-6 py-2 rounded font-bold">
          GO TO LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-['Inter'] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        <div className="border-b border-zinc-800 pb-6 mb-10">
          <h1 className="text-3xl font-bold uppercase font-orbitron text-white">
            MY ORDERS
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Logged in as: <span className="text-zinc-300 font-mono">{user.email || "Survi"}</span>
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl py-20 px-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              👋 Welcome, {user.name || "Survi"}
            </h2>
            <p className="text-zinc-500 max-w-sm mb-8 text-sm">
              Your order timeline is empty. Looks like you haven't secured any drops yet.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-white text-black font-mono font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition active:scale-95"
            >
              SHOP THE DROP
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any, i: number) => {
              const currentStep = getStepIndex(order.orderStatus);

              return (
                <div
                  key={order._id || i}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition hover:border-zinc-800"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6 text-sm">
                    <div>
                      <span className="text-zinc-500 font-mono text-xs block uppercase">Order ID</span>
                      <span className="font-mono text-zinc-300 font-semibold">{order._id || `ORD-00${i}`}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-mono text-xs block uppercase">Total Paid</span>
                      <span className="font-mono text-green-400 font-bold text-base">₹{order.totalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {order.products?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                        <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-[10px] text-zinc-600 font-mono overflow-hidden border border-zinc-800">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            "DROP"
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-white">{item.title || "Premium Streetwear Item"}</h4>
                          <p className="text-xs text-zinc-500 font-mono mt-0.5">
                            ₹{item.price} {item.size ? `| Size: ${item.size}` : ""} | Qty: {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="my-8 px-2">
                    <div className="relative flex justify-between items-center w-full">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-600 transition-all duration-500 z-0"
                        style={{
                          width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
                        }}
                      />

                      {TRACKING_STEPS.map((step, stepIdx) => {
                        const isDone = stepIdx <= currentStep;
                        const isCurrent = stepIdx === currentStep;

                        return (
                          <div key={stepIdx} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                isCurrent
                                  ? "bg-black border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110"
                                  : isDone
                                  ? "bg-red-600 border-red-600"
                                  : "bg-zinc-950 border-zinc-800"
                              }`}
                            >
                              {isCurrent && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
                              {isDone && !isCurrent && <span className="text-[9px] text-white font-bold">✓</span>}
                            </div>
                            <span
                              className={`text-[10px] font-mono mt-2 tracking-tight ${
                                isCurrent ? "text-red-500 font-bold" : isDone ? "text-zinc-200" : "text-zinc-600"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {(order.courier || order.trackingUrl) && (
                    <div className="mt-6 bg-zinc-900 border border-zinc-800/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs font-mono">
                        <span className="text-zinc-500 block">SHIPPING VIA</span>
                        <span className="text-zinc-300 uppercase font-bold">{order.courier || "Logistics Partner"}</span>
                      </div>

                      {order.trackingUrl && (
                        
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-zinc-800 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition"
                        >
                          LIVE TRACKING ↗
                        </a>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-white bg-black font-mono tracking-widest animate-pulse">
        LOADING...
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
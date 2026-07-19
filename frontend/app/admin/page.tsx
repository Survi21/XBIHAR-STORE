
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function MegaAdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders"); // orders | add-product | coupons | stock-alerts
  
  // Data States
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({ totalOrders: 0, totalSales: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);

  // 🎯 FIX 1: Form input states mein category, tagline, inspiration aur image handle karne ke liye fields add kiye
  const [productForm, setProductForm] = useState({
    title: "", 
    description: "", 
    price: "", 
    originalPrice: "", 
    category: "tshirt", // Default value
    tagline: "",
    inspiration: "",
    imagesString: "", // Commas separated images string ke liye
    stockS: 0, 
    stockM: 0, 
    stockL: 0, 
    stockXL: 0
  });
  const [couponForm, setCouponForm] = useState({ code: "", discountValue: "", minOrderValue: "" });

  // Load All Core Data from DB
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [orderRes, prodRes, coupRes] = await Promise.all([
        fetch("https://xbihar.onrender.com/api/admin/orders").then(r => r.json()),
        fetch("https://xbihar.onrender.com/api/admin/products").then(r => r.json()),
        fetch("https://xbihar.onrender.com/api/admin/coupons").then(r => r.json())
      ]);

      if (orderRes.success) {
        setOrders(orderRes.orders);
        setAnalytics(orderRes.analytics);
      }
      if (prodRes.success) setProducts(prodRes.products);
      if (coupRes.success) setCoupons(coupRes.coupons);
    } catch (err) {
      console.log("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboardData(); }, []);

  // Submit Product Form
  // const handleProductSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // SABHI SIZES KA TOTAL NUMBER BANANA
  //     const totalStockNumber = 
  //       Number(productForm.stockS) + 
  //       Number(productForm.stockM) + 
  //       Number(productForm.stockL) + 
  //       Number(productForm.stockXL);

  //     // 🎯 FIX 2: Images string ko clean array format me badalna
  //     const imagesArray = productForm.imagesString
  //       ? productForm.imagesString.split(",").map(img => img.trim()).filter(Boolean)
  //       : [];
  
  //     const res = await fetch("http://localhost:5000/api/admin/products", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         title: productForm.title,
  //         description: productForm.description,
  //         price: Number(productForm.price),
  //         originalPrice: Number(productForm.originalPrice || productForm.price),
  //         category: productForm.category, // 👈 Sending category to backend database
  //         tagline: productForm.tagline,   // 👈 Sending tagline to backend database
  //         inspiration: productForm.inspiration, // 👈 Sending inspiration text
  //         images: imagesArray, // 👈 Saved as dynamic Array matching your structure
  //         sizes: ["S", "M", "L", "XL"], 
  //         colors: [],
  //         stock: totalStockNumber 
  //       })
  //     });
      
  //     const data = await res.json();
  //     if (data.success) {
  //       alert("✅ Product Add Ho Gaya Database Me!");
  //       // Form states reset logic
  //       setProductForm({ 
  //         title: "", description: "", price: "", originalPrice: "", 
  //         category: "tshirt", tagline: "", inspiration: "", imagesString: "",
  //         stockS: 0, stockM: 0, stockL: 0, stockXL: 0 
  //       });
  //       loadDashboardData();
  //     } else {
  //       alert("❌ Error: " + data.error);
  //     }
  //   } catch (err) { 
  //     alert("❌ Server Connection Issue");
  //   }
  // };
// Submit Product Form
const handleProductSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // 🎯 FIX 2: Images string ko clean array format me badalna
    const imagesArray = productForm.imagesString
      ? productForm.imagesString.split(",").map(img => img.trim()).filter(Boolean)
      : [];

    // 🌟 DATABASE SCHEMAS MATCH MATRIX ARRANGEMENT (Fixes Cast to embedded failed error)
    const formattedSizesArray = [
      { size: "S", stock: Number(productForm.stockS || 0) },
      { size: "M", stock: Number(productForm.stockM || 0) },
      { size: "L", stock: Number(productForm.stockL || 0) },
      { size: "XL", stock: Number(productForm.stockXL || 0) }
    ];

    const res = await fetch("https://xbihar.onrender.com/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: productForm.title,
        description: productForm.description,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        category: productForm.category,     // Sending category to backend database
        tagline: productForm.tagline,         // Sending tagline to backend database
        inspiration: productForm.inspiration, // Sending inspiration text
        images: imagesArray,                  // Saved as dynamic Array matching your structure
        
        // 🔥 CODE CHANGE HERE: Purane string array aur base stock ko hata kar ye proper structured array bheja hai
        sizes: formattedSizesArray, 
        colors: [],
        stock: 0 // Isko default 0 rakh sakte hain kyunki sizes ke andar individual stock store ho raha hai
      })
    });
    
    const data = await res.json();
    if (data.success) {
      alert("✅ Product Add Ho Gaya Database Me!");
      // Form states reset logic
      setProductForm({ 
        title: "", description: "", price: "", originalPrice: "", 
        category: "tshirt", tagline: "", inspiration: "", imagesString: "",
        stockS: 0, stockM: 0, stockL: 0, stockXL: 0 
      });
      loadDashboardData();
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) { 
    alert("❌ Server Connection Issue");
  }
};





  // Submit Coupon Form
  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://xbihar.onrender.com/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponForm.code,
          discountValue: Number(couponForm.discountValue),
          minOrderValue: Number(couponForm.minOrderValue)
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("🎉 Coupon Active Ho Gaya!");
        setCouponForm({ code: "", discountValue: "", minOrderValue: "" });
        loadDashboardData();
      }
    } catch (err) { console.log(err); }
  };

// Submit Coupon Form ke theek niche yeh delete function jodein
const deleteCoupon = async (id: string) => {
  if (!window.confirm("🚨 Kya aap sach mein is coupon ko delete karna chahte hain?")) return;
  try {
    const res = await fetch(`https://xbihar.onrender.com/api/admin/coupons/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      alert("🗑️ Coupon database se delete ho gaya!");
      loadDashboardData(); // Isse screen par se coupon turant hat jayega
    } else {
      alert("❌ Delete nahi ho paya: " + (data.error || "Unknown Error"));
    }
  } catch (err) {
    alert("❌ Server Connection Issue while deleting coupon");
  }
};



  // Shiprocket automated dispatch action
  const dispatchShiprocket = async (orderId: string) => {
    try {
      const res = await fetch(`https://xbihar.onrender.com/api/admin/orders/${orderId}/dispatch`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`🚚 Shiprocket Alert: Order Dispatched! AWB Tracking Generated: ${data.awb}`);
        loadDashboardData();
      }
    } catch (err) { console.log(err); }
  };

  // Status changes listener dropdown
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`https://xbihar.onrender.com/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadDashboardData();
    } catch (err) { console.log(err); }
  };

  // NEW CRASH-PROOF FILTER FOR SINGLE NUMBER STOCK
  const lowStockProducts = products.filter(p => {
    if (!p) return false;
    if (typeof p.stock === 'number') {
      return p.stock <= 3; 
    }
    if (p.stock && typeof p.stock === 'object') {
      return (p.stock.S <= 3 || p.stock.M <= 3 || p.stock.L <= 3 || p.stock.XL <= 3);
    }
    return false;
  });

  if (loading) return <div className="bg-black text-white min-h-screen flex items-center justify-center font-orbitron">SYNCING XBIHAR COMMAND DATA...</div>;

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        
        {/* TOP META DATA CONTROL CONTROLLERS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-orbitron text-red-500 font-bold">XBIHAR CENTRAL ENGINE</h1>
            <p className="text-xs text-zinc-500 font-['Inter'] mt-1">Full control center for streetwear operations.</p>
          </div>

          {/* TAB BUTTONS CONTROL PACK */}
          <div className="flex flex-wrap gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 font-orbitron text-xs">
            <button onClick={() => setActiveTab("orders")} className={`px-4 py-2 rounded-lg transition ${activeTab === "orders" ? "bg-white text-black font-bold" : "text-zinc-400"}`}>ORDERS</button>
            <button onClick={() => setActiveTab("add-product")} className={`px-4 py-2 rounded-lg transition ${activeTab === "add-product" ? "bg-white text-black font-bold" : "text-zinc-400"}`}>PRODUCTS FORM</button>
            <button onClick={() => setActiveTab("coupons")} className={`px-4 py-2 rounded-lg transition ${activeTab === "coupons" ? "bg-white text-black font-bold" : "text-zinc-400"}`}>COUPONS</button>
            <button onClick={() => setActiveTab("stock-alerts")} className={`px-4 py-2 rounded-lg relative transition ${activeTab === "stock-alerts" ? "bg-white text-black font-bold" : "text-zinc-400"}`}>
              STOCK ALERTS
              {lowStockProducts.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />}
            </button>
          </div>
        </div>

        {/* GLOBAL COUNTER METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 font-['Inter']">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <p className="text-zinc-500 text-xs font-orbitron">GROSS REVENUE</p>
            <h3 className="text-3xl mt-2 text-green-400 font-bold">₹{analytics.totalSales}</h3>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <p className="text-zinc-500 text-xs font-orbitron">PROCESSED PARCELS</p>
            <h3 className="text-3xl mt-2 text-white font-bold">{analytics.totalOrders}</h3>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <p className="text-zinc-500 text-xs font-orbitron">CRITICAL STOCK COUNT</p>
            <h3 className={`text-3xl font-bold mt-2 ${lowStockProducts.length > 0 ? "text-red-500 animate-pulse" : "text-zinc-400"}`}>{lowStockProducts.length} DESIGNS</h3>
          </div>
        </div>

        {/* --- 📦 TAB 1: LIVE ORDERS TAB --- */}
        {activeTab === "orders" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-orbitron mb-6">LIVE INCOMING ORDERS</h2>
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div key={order._id} className="border border-zinc-800 bg-black/40 p-5 rounded-xl flex flex-col md:flex-row justify-between gap-4 items-start md:items-center font-['Inter']">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold font-orbitron text-white">{order.name} <span className="text-xs text-zinc-600">({order._id})</span></h4>
                    <p className="text-sm text-zinc-400">✉️ {order.email} | 📞 {order.phone}</p>
                    <p className="text-sm text-zinc-400">📍 {order.shippingAddress?.address}, {order.shippingAddress?.city} ({order.shippingAddress?.pincode})</p>
                    <div className="pt-2 flex gap-1.5 flex-wrap">
                      {order.products?.map((p: any, i: number) => (
                        <span key={i} className="bg-zinc-900 border border-zinc-800 text-xs px-2.5 py-1 rounded text-zinc-300">{p.title} ({p.size}) x{p.quantity}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 border-zinc-800 pt-3 md:pt-0">
                    <p className="text-sm text-zinc-400">Shipping: <span className="text-green-400 font-bold">₹{order.shippingCharge || 0}</span></p>
                    <p className="text-xl font-bold text-white font-['Inter']">Total Bill: ₹{order.totalPrice}</p>
                    
                    {order.trackingId && <p className="text-xs text-zinc-500 font-mono bg-zinc-950 px-2 py-0.5 border border-zinc-800 rounded">AWB: {order.trackingId}</p>}

                    <div className="flex gap-2 items-center mt-1">
                      <select defaultValue={order.status || "Pending"} onChange={(e) => updateStatus(order._id, e.target.value)} className="bg-zinc-950 border border-zinc-700 text-xs rounded-lg px-2 py-1.5 text-white">
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      {order.status !== "Shipped" && order.status !== "Delivered" && (
                        <button onClick={() => dispatchShiprocket(order._id)} className="bg-red-600 hover:bg-red-700 text-white font-orbitron text-[10px] font-bold px-3 py-1.5 rounded-lg tracking-wide uppercase">
                          ⚡ GENERATE AWB
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 👕 TAB 2: PRODUCT FORMS TAB --- */}
        {activeTab === "add-product" && (
          <form onSubmit={handleProductSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl mx-auto space-y-5 font-['Inter']">
            <h2 className="text-xl font-orbitron mb-2 text-white">MANAGE NEW LAUNCH/DROP</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Product Title (e.g., Luxury Towel)" required value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
              
              {/* 🎯 FIX 3: Category Select dropdown dynamically mapping items */}
              <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none text-zinc-400">
                <option value="tshirt">T-Shirt</option>
                <option value="towel">Towel / Gamocha</option>
                <option value="hoodie">Hoodie / Sweatshirt</option>
              </select>
            </div>

            <input placeholder="Tagline (e.g., WHERE HERITAGE COMES ALIVE.)" value={productForm.tagline} onChange={e => setProductForm({...productForm, tagline: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />

            <textarea placeholder="Description / Streetwear Fabric Details" required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none h-24" />
            <textarea placeholder="Design Inspiration & Cultural Story" value={productForm.inspiration} onChange={e => setProductForm({...productForm, inspiration: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none h-20" />
            
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Selling Price (₹)" type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
              <input placeholder="Original Price (MRP ₹)" type="number" required value={productForm.originalPrice} onChange={e => setProductForm({...productForm, originalPrice: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
            </div>

            {/* 🎯 FIX 4: Multi-image array handler with commas split separation support */}
            <div>
              <label className="text-xs text-zinc-500 font-orbitron block mb-1">IMAGE URLS (COMMA SEPARATED FOR MULTIPLE IMAGES)</label>
              <input 
                placeholder="/products/roar/front.png, /products/roar/back.png" 
                required 
                value={productForm.imagesString} 
                onChange={e => setProductForm({...productForm, imagesString: e.target.value})} 
                className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none text-zinc-400 font-mono text-xs" 
              />
            </div>

            {/* SIZES MANAGEMENT DEEP MATRIX */}
            <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-3">
              <p className="text-sm font-orbitron text-zinc-400">QUANTITY/STOCK MATRIX PER SIZE</p>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div><label className="text-xs text-zinc-500">Size S</label><input type="number" value={productForm.stockS} onChange={e => setProductForm({...productForm, stockS: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-center" /></div>
                <div><label className="text-xs text-zinc-500">Size M</label><input type="number" value={productForm.stockM} onChange={e => setProductForm({...productForm, stockM: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-center" /></div>
                <div><label className="text-xs text-zinc-500">Size L</label><input type="number" value={productForm.stockL} onChange={e => setProductForm({...productForm, stockL: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-center" /></div>
                <div><label className="text-xs text-zinc-500">Size XL</label><input type="number" value={productForm.stockXL} onChange={e => setProductForm({...productForm, stockXL: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-center" /></div>
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-orbitron font-bold transition hover:bg-zinc-200">PUSH TO STOREFRONT</button>
          </form>
        )}

        {/* --- 🎟️ TAB 3: COUPON GENERATOR TAB --- */}
        {activeTab === "coupons" && (
          <div className="grid md:grid-cols-2 gap-8 items-start font-['Inter']">
            <form onSubmit={handleCouponSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-orbitron text-white">CREATE NEW DISCOUNT KEY</h2>
              <input placeholder="COUPON CODE (e.g. STREET20)" required value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
              <input placeholder="Discount Amount (₹)" type="number" required value={couponForm.discountValue} onChange={e => setCouponForm({...couponForm, discountValue: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
              <input placeholder="Minimum Order Threshold Value (₹)" type="number" required value={couponForm.minOrderValue} onChange={e => setCouponForm({...couponForm, minOrderValue: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none" />
              <button type="submit" className="w-full bg-white text-black font-orbitron py-3.5 rounded-xl font-bold">ACTIVATE CODE</button>
            </form>

      

<div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
  <h2 className="text-lg font-orbitron text-white mb-4">ACTIVE DEALS CONTROL</h2>
  <div className="space-y-3">
    {coupons && coupons.length > 0 ? (
      coupons.map((c: any) => (
        <div key={c._id} className="bg-black/50 border border-zinc-800 p-4 rounded-xl flex justify-between items-center gap-4">
          <div>
            <p className="font-mono text-green-400 font-bold text-lg">{c.code}</p>
            <p className="text-xs text-zinc-500 mt-0.5">Min Cart Requirement: ₹{c.minOrderValue}</p>
            <p className="font-bold text-white text-sm mt-1">₹{c.discountValue} OFF</p>
          </div>

          {/* 🗑️ DELETE BUTTON */}
          <button
            onClick={() => deleteCoupon(c._id)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-orbitron font-bold px-4 py-2 rounded-xl transition uppercase tracking-wider shrink-0"
          >
            DELETE
          </button>
        </div>
      ))
    ) : (
      <p className="text-zinc-500 text-sm font-['Inter']">No active coupons found.</p>
    )}
  </div>
</div>
          </div>
        )}

        {/* --- 🚨 TAB 4: CRITICAL STOCK ALERTS TAB --- */}
        {activeTab === "stock-alerts" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 font-['Inter']">
            <h2 className="text-xl font-orbitron text-white mb-2">LOW INVENTORY CRITICAL FLAGGING</h2>
            <p className="text-xs text-zinc-500 mb-6">System alerts when any product stock level drops below 4 units.</p>

            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">🎉 All good! No items running out of inventory matrix.</div>
              ) : (
                lowStockProducts.map((p: any) => (
                  <div key={p._id} className="border border-red-900/40 bg-red-950/10 p-5 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="font-orbitron font-bold text-white text-lg">{p.title || "Streetwear Drop"}</h4>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">ID Ref: {p._id}</p>
                    </div>

                    <span className="bg-red-950 border border-red-800 text-red-400 text-xs px-3 py-1 rounded font-bold font-mono">
                      LOW STOCK: {p.stock} LEFT
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}






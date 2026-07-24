


"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [orderId, setOrderId] = useState("");

  // useEffect(() => {
  //   const cfOrderId = searchParams.get("order_id");
  //   const pendingRaw = localStorage.getItem("pendingOrderData");

  //   if (!cfOrderId || !pendingRaw) {
  //     setStatus("failed");
  //     return;
  //   }

  //   const pendingData = JSON.parse(pendingRaw);
  //   const token = localStorage.getItem("token");

  //   const confirmOrder = async () => {
  //     try {
  //       const res = await fetch("https://xbihar.onrender.com/api/orders/verify", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ ...pendingData, cashfreeOrderId: cfOrderId }),
  //       });
  //       const data = await res.json();
  //       if (data.success) {
  //         setOrderId(data.order._id);
  //         localStorage.removeItem("pendingOrderData");
  //         localStorage.removeItem("cartSummary");
  //         setStatus("success");
  //       } else {
  //         setStatus("failed");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setStatus("failed");
  //     }
  //   };

  //   confirmOrder();
  // }, [searchParams]);

useEffect(() => {
  const cfOrderId = searchParams.get("order_id");
  if (!cfOrderId) {
    setStatus("failed");
    return;
  }

  const token = localStorage.getItem("token");
  const pendingRaw = localStorage.getItem("pendingOrderData");

  const confirmOrder = async () => {
    try {
      const body = pendingRaw
        ? { ...JSON.parse(pendingRaw), cashfreeOrderId: cfOrderId }
        : { cashfreeOrderId: cfOrderId };

      const res = await fetch("https://xbihar.onrender.com/api/orders/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.order._id);
        localStorage.removeItem("pendingOrderData");
        localStorage.removeItem("cartSummary");
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (err) {
      console.log(err);
      setStatus("failed");
    }
  };

  confirmOrder();
}, [searchParams]);


  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {status === "verifying" && <p className="text-xl animate-pulse">Verifying your payment...</p>}
        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold text-green-400 mb-4">🎉 Payment Successful!</h1>
            <p className="text-zinc-400 mb-2">Your order has been confirmed.</p>
            {orderId && <p className="text-zinc-500 text-sm mb-6">Order ID: #{orderId.substring(0, 8)}</p>}
            <div className="flex gap-4 justify-center">
              <Link href="/orders" className="bg-white text-black px-6 py-3 rounded-xl font-bold">
                Track My Order
              </Link>
              <Link href="/" className="border border-zinc-700 px-6 py-3 rounded-xl font-bold">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
        {status === "failed" && (
          <>
            <h1 className="text-3xl font-bold text-red-500 mb-4">❌ Order Confirmation Failed</h1>
            <p className="text-zinc-400">If money was deducted, contact support with your payment reference — we'll manually confirm it.</p>
            <Link href="/cart" className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold">
              Back to Cart
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
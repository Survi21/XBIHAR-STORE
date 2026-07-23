"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    if (!orderId) {
      setStatus("failed");
      return;
    }

    const token = localStorage.getItem("token");
    const pendingOrderData = localStorage.getItem("pendingOrder");

    fetch("https://xbihar.onrender.com/api/orders/verify-and-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cashfreeOrderId: orderId,
        orderDetails: pendingOrderData ? JSON.parse(pendingOrderData) : null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("cartSummary");
          localStorage.removeItem("pendingOrder");
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      {status === "verifying" && <p>Verifying your payment...</p>}
      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-orbitron text-green-400">Order Confirmed! 🎉</h1>
          <button onClick={() => router.push("/orders")} className="mt-6 bg-white text-black px-6 py-3 rounded-xl">
            View My Orders
          </button>
        </div>
      )}
      {status === "failed" && (
        <div className="text-center">
          <h1 className="text-2xl text-red-500">Payment verification failed</h1>
          <p className="text-zinc-400 mt-2">Please contact support if amount was deducted.</p>
        </div>
      )}
    </main>
  );
}
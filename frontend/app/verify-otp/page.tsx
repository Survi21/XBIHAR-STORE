"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleVerify = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Verified!");
      router.push("/account");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="mb-4">Enter OTP</h1>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP"
        className="p-3 bg-zinc-800 mb-4"
      />

      <button onClick={handleVerify} className="bg-white text-black px-5 py-2">
        Verify OTP
      </button>

    </div>
  );
}

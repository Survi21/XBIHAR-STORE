
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    console.log("CLICKED ✅"); // 🔥 debug

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ MUST
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("✅ OTP sent to email");

      // ✅ go to OTP page
      router.push(`/verify-otp?email=${email}`);

    } catch (err) {
      console.log("ERROR:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white ">
      <div className="p-8 w-96 border rounded-xl font-orbitron">

        <h1 className="text-2xl mb-6">REGISTER</h1>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 bg-zinc-900 font-['Inter']"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className=" font-['Inter'] w-full p-3 mb-3 bg-zinc-900"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          className="font-['Inter'] w-full p-3 mb-3 bg-zinc-900"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-black p-3 mt-3 font-orbitron"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}

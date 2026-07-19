"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep("otp");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server connection issue");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Ab role check karo
        const meRes = await fetch("https://xbihar.onrender.com/api/auth/me", {
          credentials: "include",
        });
        const meData = await meRes.json();

        if (meData?.user?.role === "admin") {
          router.push("/admin");
        } else {
          setError("Access denied. This account is not an admin.");
        }
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Server connection issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-orbitron text-red-500 font-bold mb-2">ADMIN ACCESS</h1>
        <p className="text-xs text-zinc-500 mb-8">Restricted area. Authorized personnel only.</p>

        {error && (
          <div className="bg-red-950/40 border border-red-800 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {step === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-xl font-orbitron font-bold disabled:opacity-50"
            >
              {loading ? "PLEASE WAIT..." : "CONTINUE"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-zinc-400">OTP sent to {email}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none tracking-widest text-center text-xl"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-xl font-orbitron font-bold disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "VERIFY & LOGIN"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
"use client";

// import { useState } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResendOtp = async () => {
    if (!canResend) return;
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
        setTimer(60); 
        setCanResend(false);
      } else {
        setError(data.message || "Resend failed");
      }
    } catch (err) {
      setError("Server connection issue");
    } finally {
      setLoading(false);
    }
  };




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
        setTimer(60);
        setCanResend(false);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server connection issue");
    } finally {
      setLoading(false);
    }
  };

  // const handleVerifyOtp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });
  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       // ✅ Ab role check karo
  //       const meRes = await fetch("https://xbihar.onrender.com/api/auth/me", {
  //         credentials: "include",
  //       });
  //       const meData = await meRes.json();

  //       if (meData?.user?.role === "admin") {
  //         router.push("/admin");
  //       } else {
  //         setError("Access denied. This account is not an admin.");
  //       }
  //     } else {
  //       setError(data.message || "Invalid OTP");
  //     }
  //   } catch (err) {
  //     setError("Server connection issue");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem("token", data.token);

      const meRes = await fetch("https://xbihar.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const meData = await meRes.json();

      if (meData?.user?.role === "admin") {
        router.push("/admin");
      } else {
        setError("Access denied. This account is not an admin.");
        localStorage.removeItem("token");
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
            {/* <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none"
            /> */}

<div className="relative">
  <input
    type={showPassword ? "text" : "password"} // <-- type yahan change hoga
    placeholder="Password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full bg-black border border-zinc-800 p-4 pr-12 rounded-xl outline-none"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-sm font-semibold select-none"
  >
    {showPassword ? "HIDE" : "SHOW"}
  </button>
</div>

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

{/* 🚨 IS INPUT KE THIK NICHE YE CHIPKA DO */}
            <div className="text-center text-sm my-2">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-red-500 hover:text-red-400 underline font-semibold disabled:opacity-50"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-zinc-500">
                  Resend OTP in <span className="text-zinc-300 font-bold">{timer}s</span>
                </p>
              )}
            </div>
            {/* 🚨 TIMER UI BLOCK YAHAN KHATAM */}

            {/* <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-xl font-orbitron font-bold disabled:opacity-50"
            ></button> */}

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

// "use client";

// import Link from "next/link";
// import { GoogleLogin } from "@react-oauth/google";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState(""); // ✅ NEW: For storing OTP input
//   const [showOtp, setShowOtp] = useState(false); // ✅ NEW: Toggle OTP screen
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   // fix for Google render
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // already login check
//   useEffect(() => {
//     fetch("http://localhost:5000/api/auth/check", {
//       credentials: "include",
//     }).then((res) => {
//       if (res.ok) {
//         router.push("/account");
//       }
//     });
//   }, [router]);

//   // ✅ 1. NORMAL LOGIN (Triggers OTP)
//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       // If backend says verification required, show OTP input screen
//       if (data.requiresVerification) {
//         alert("OTP sent to email! Please check.");
//         setShowOtp(true); // 🎯 Switches UI to OTP input
//         return;
//       }

//       // Fallback if backend directly logs in (like your old system)
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         alert("Login Successful ✅");
//         if (data.user.role === "admin") {
//           router.push("/admin");
//         } else {
//           router.push("/account");
//         }
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ 2. NEW: VERIFY OTP FUNCTION
//   const handleVerifyOtp = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("OTP Verified Successfully! 🎉");
        
//         // Save user to local storage if returned, or re-fetch profile
//         localStorage.setItem("user", JSON.stringify(data.user || { email }));
        
//         // Redirect to account dashboard
//         router.push("/account");
//       } else {
//         alert(data.message || "Invalid OTP, please try again.");
//       }
//     } catch (error) {
//       console.log("OTP Verification Error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl text-white bg-zinc-950">
        
//         {/* 🔄 CONDITIONAL RENDER: SHOW OTP SCREEN OR LOGIN SCREEN */}
//         {!showOtp ? (
//           <>
//             <h1 className="text-3xl text-center mb-6 font-orbitron">LOGIN</h1>

//             {/* EMAIL */}
//             <input
//               type="email"
//               placeholder="Email"
//               className="font-['Inter'] w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             {/* PASSWORD */}
//             <input
//               type="password"
//               placeholder="Password"
//               className="font-['Inter'] w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* LOGIN BUTTON */}
//             <button
//               onClick={handleLogin}
//               className="w-full bg-white text-black py-3 rounded font-bold font-orbitron transition hover:bg-zinc-200"
//             >
//               GET OTP
//             </button>

//             {/* GOOGLE LOGIN */}
//             {mounted && (
//               <div className="mt-4 flex justify-center">
//                 <GoogleLogin
//                   useOneTap={false}
//                   onSuccess={async (credentialResponse) => {
//                     const res = await fetch(
//                       "http://localhost:5000/api/auth/google-login",
//                       {
//                         method: "POST",
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                         credentials: "include",
//                         body: JSON.stringify({
//                           token: credentialResponse.credential,
//                         }),
//                       }
//                     );

//                     if (res.ok) {
//                       alert("Google Login ✅");
//                       router.push("/account");
//                     } else {
//                       alert("Google Login Failed");
//                     }
//                   }}
//                   onError={() => console.log("Google Login Failed")}
//                 />
//               </div>
//             )}

//             {/* REGISTER LINK */}
//             <p className="text-center mt-6 text-zinc-400">
//               No account?{" "}
//               <Link href="/register" className="underline text-white">
//                 Register
//               </Link>
//             </p>
//           </>
//         ) : (
//           /* 🚨 OTP SUBMISSION SCREEN */
//           <>
//             <h1 className="text-3xl text-center mb-2 font-orbitron">Verify OTP</h1>
//             <p className="text-zinc-400 text-sm text-center mb-6">
//               Enter the 6-digit code sent to <br /> <span className="text-white font-mono">{email}</span>
//             </p>

//             {/* OTP INPUT */}
//             <input
//               type="text"
//               maxLength={6}
//               placeholder="Enter 6-Digit OTP"
//               className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none text-center font-mono text-xl tracking-widest text-white"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             {/* VERIFY BUTTON */}
//             <button
//               onClick={handleVerifyOtp}
//               className="w-full bg-red-600 text-white py-3 rounded font-bold font-orbitron transition hover:bg-red-700"
//             >
//               Verify & Login
//             </button>

//             {/* GO BACK */}
//             <button
//               onClick={() => setShowOtp(false)}
//               className="w-full mt-3 text-zinc-500 text-sm hover:text-white transition text-center font-orbitron"
//             >
//               ← Back to Login
//             </button>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); 
  const [showOtp, setShowOtp] = useState(false); 
  const [mounted, setMounted] = useState(false);
  
  // 🔑 Forgot Password States
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSentForReset, setOtpSentForReset] = useState(false);

  // ❌ Validation Messages State
  const [uiError, setUiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("https://xbihar.onrender.com/api/auth/check", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        router.push("/account");
      }
    });
  }, [router]);

  // ✅ 1. NORMAL LOGIN
  const handleLogin = async () => {
    setUiError("");
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUiError(data.message || "Invalid Credentials");
        return;
      }

      if (data.requiresVerification) {
        alert("OTP sent to email! Please check.");
        setShowOtp(true); 
        return;
      }
    } catch (error) {
      setUiError("Server configuration connection failure.");
    }
  };

  // ✅ 2. VERIFY LOGIN OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified Successfully! 🎉");
        localStorage.setItem("user", JSON.stringify({ email }));
        router.push("/account");
      } else {
        alert(data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      console.log("OTP Verification Error:", error);
    }
  };

  // ✅ 3. REQUEST RESET PASSWORD OTP
  const handleForgotPasswordRequest = async () => {
    setUiError("");
    if (!email) {
      setUiError("Please enter your email address first.");
      return;
    }
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setOtpSentForReset(true);
      } else {
        setUiError(data.message);
      }
    } catch (err) {
      setUiError("Something went wrong.");
    }
  };

  // ✅ 4. SUBMIT NEW PASSWORD WITH OTP
  const handleResetPasswordSubmit = async () => {
    setUiError("");
    try {
      const res = await fetch("https://xbihar.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: forgotOtp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setIsForgotPasswordMode(false);
        setOtpSentForReset(false);
        setPassword("");
      } else {
        setUiError(data.message);
      }
    } catch (err) {
      setUiError("Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl text-white bg-zinc-950">
        
        {/* Dynamic Inline Error Bar */}
        {uiError && (
          <div className="bg-red-950/50 border border-red-800 text-red-200 text-sm p-3 rounded mb-4 text-center font-['Inter']">
            {uiError}
          </div>
        )}

        {/* STATE A: FORGOT PASSWORD INTERFACE */}
        {isForgotPasswordMode ? (
          <>
            <h1 className="text-2xl text-center mb-6 font-orbitron">RESET PASSWORD</h1>
            <input
              type="email"
              placeholder="Confirm Email"
              className="font-['Inter'] w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSentForReset}
            />

            {!otpSentForReset ? (
              <button
                onClick={handleForgotPasswordRequest}
                className="w-full bg-white text-black py-3 rounded font-bold font-orbitron transition hover:bg-zinc-200"
              >
                SEND RESET CODE
              </button>
            ) : (
              <>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-Digit Reset OTP"
                  className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none text-center font-mono text-lg tracking-wider"
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="font-['Inter'] w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPasswordSubmit}
                  className="w-full bg-red-600 text-white py-3 rounded font-bold font-orbitron transition hover:bg-red-700"
                >
                  UPDATE PASSWORD
                </button>
              </>
            )}
            <button
              onClick={() => { setIsForgotPasswordMode(false); setOtpSentForReset(false); setUiError(""); }}
              className="w-full mt-4 text-zinc-500 text-xs hover:text-white transition text-center font-orbitron"
            >
              Back to Login
            </button>
          </>
        ) : !showOtp ? (
          /* STATE B: STANDARD LOGIN VIEW */
          <>
            <h1 className="text-3xl text-center mb-6 font-orbitron">LOGIN</h1>

            <input
              type="email"
              placeholder="Email"
              className="font-['Inter'] w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
{/* 
            <input
              type="password"
              placeholder="Password"
              className="font-['Inter'] w-full p-3 bg-zinc-900 border border-zinc-800 rounded outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}


            <div className="relative w-full mb-4">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="font-['Inter'] w-full p-3 bg-zinc-900 border border-zinc-800 rounded outline-none pr-10"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition focus:outline-none"
  >
    {showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    )}
  </button>
</div>

            {/* Forget Password Trigger */}
            <div className="flex justify-end mt-2 mb-4">
              <button 
                onClick={() => { setIsForgotPasswordMode(true); setUiError(""); }}
                className="text-zinc-500 hover:text-white transition text-xs font-['Inter'] underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-white text-black py-3 rounded font-bold font-orbitron transition hover:bg-zinc-200"
            >
              GET OTP
            </button>

            {mounted && (
              <div className="mt-4 flex justify-center">
                <GoogleLogin
                  useOneTap={false}
                  onSuccess={async (credentialResponse) => {
                    const res = await fetch("https://xbihar.onrender.com/api/auth/google-login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({ token: credentialResponse.credential }),
                    });
                    if (res.ok) {
                      alert("Google Login ✅");
                      router.push("/account");
                    } else {
                      alert("Google Login Failed");
                    }
                  }}
                  onError={() => console.log("Google Login Failed")}
                />
              </div>
            )}

            <p className="text-center mt-6 text-zinc-400 font-['Inter'] ">
              No account?{" "}
              <Link href="/register" className="underline text-white">
                Register
              </Link>
            </p>
          </>
        ) : (
          /* STATE C: LOGIN OTP VERIFICATION VIEW */
          <>
            <h1 className="text-3xl text-center mb-2 font-orbitron">Verify OTP</h1>
            <p className="text-zinc-400 text-sm text-center mb-6">
              Enter the 6-digit code sent to <br /> <span className="text-white font-mono">{email}</span>
            </p>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-Digit OTP"
              className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-800 rounded outline-none text-center font-mono text-xl tracking-widest text-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-red-600 text-white py-3 rounded font-bold font-orbitron transition hover:bg-red-700"
            >
              Verify & Login
            </button>

            <button
              onClick={() => setShowOtp(false)}
              className="w-full mt-3 text-zinc-500 text-sm hover:text-white transition text-center font-orbitron"
            >
              ← Back to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}
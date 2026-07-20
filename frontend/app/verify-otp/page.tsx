// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function OTPPage() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const handleVerify = async () => {
//     const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("✅ Verified!");
//       router.push("/account");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

//       <h1 className="mb-4">Enter OTP</h1>

//       <input
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="OTP"
//         className="p-3 bg-zinc-800 mb-4"
//       />

//       <button onClick={handleVerify} className="bg-white text-black px-5 py-2">
//         Verify OTP
//       </button>

//     </div>
//   );
// }
"use client";

import { useState, Suspense } from "react"; // 🚀 Suspense import kiya
import { useSearchParams, useRouter } from "next/navigation";

// 1. Yeh actual form logic dynamic section hai jo render hoga
function OTPFormContent() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // const handleVerify = async () => {
  //   // 💡 Jab backend live hoga, toh is localhost link ko badal kar live backend link kar dena
  //   const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({ email, otp }),
  //   });

  //   const data = await res.json();

  //   if (data.success) {
  //     alert("✅ Verified!");
  //     router.push("/account");
  //   } else {
  //     alert(data.message);
  //   }
  // };


  const handleVerify = async () => {
  const res = await fetch("https://xbihar.onrender.com/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (data.success) {
    alert("✅ Verified!");
    localStorage.setItem("token", data.token);
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

// 2. Main page export jo Vercel prerender client errors ko strict fix karega
export default function OTPPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-black text-white font-orbitron">
        LOADING AUTHENTICATION SYSTEM...
      </div>
    }>
      <OTPFormContent />
    </Suspense>
  );
}
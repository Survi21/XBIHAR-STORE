
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";

// export default function AccountPage() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true); 
//   const router = useRouter();

//   useEffect(() => {
//     fetch("https://xbihar.onrender.com/api/auth/me", {
//       credentials: "include", 
//     })
//       .then((res) => {
//         if (!res.ok) {
//           router.push("/login");
//         } else {
//           return res.json();
//         }
//       })
//       .then((data) => {
//         if (data?.user) {
//           setUser(data.user);
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         router.push("/login");
//       });
//   }, []);

//   // ✅ prevent blinking
//   if (loading) {
//     return (
//       <main className="bg-black text-white min-h-screen flex items-center justify-center">
//         Loading...
//       </main>
//     );
//   }

//   if (!user) {
//     return (
//       <main className="bg-black text-white min-h-screen flex items-center justify-center">
//         Redirecting...
//       </main>
//     );
//   }

//   return (
//     <main className="bg-black text-white min-h-screen">
//       <Navbar />

//       <div className="max-w-3xl mx-auto pt-32 px-6">

//         <h1 className="text-4xl mb-10 font-orbitron">
//           MY ACCOUNT
//         </h1>

//         <div className="bg-zinc-900 p-8 rounded-xl">

//           <h2 className="text-2xl mb-6">
//             Profile Information
//           </h2>

//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Role: {user.role}</p>




//           <div className="mt-6 space-y-4">

//   <button
//     onClick={() => router.push("/orders")}
//     className="w-full bg-white text-black py-2 rounded"
//   >
//     My Orders
//   </button>

//   {/* <button
//     onClick={() => alert("Wishlist coming soon")}
//     className="w-full border py-2 rounded"
//   >
//     Wishlist
//   </button> */}
// <button
//   onClick={() => router.push("/wishlist")}
//   className="w-full border border-zinc-700 hover:border-white text-white py-2 rounded font-orbitron text-sm transition"
// >
//   Wishlist
// </button>
// </div>


//           <button
//             onClick={async () => {
//               await fetch("https://xbihar.onrender.com/api/auth/logout", {
//                 method: "POST",
//                 credentials: "include",
//               });

//               router.push("/login");
//             }}
//             className="mt-6 bg-red-600 px-5 py-2"
//           >
//             Logout
//           </button>

//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("https://xbihar.onrender.com/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        Redirecting...
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-32 px-6">

        <h1 className="text-4xl mb-10 font-orbitron">
          MY ACCOUNT
        </h1>

        <div className="bg-zinc-900 p-8 rounded-xl">

          <h2 className="text-2xl mb-6">
            Profile Information
          </h2>

          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => router.push("/orders")}
              className="w-full bg-white text-black py-2 rounded"
            >
              My Orders
            </button>

            <button
              onClick={() => router.push("/wishlist")}
              className="w-full border border-zinc-700 hover:border-white text-white py-2 rounded font-orbitron text-sm transition"
            >
              Wishlist
            </button>
          </div>

          <button
            onClick={async () => {
              const token = localStorage.getItem("token");
              await fetch("https://xbihar.onrender.com/api/auth/logout", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
              });
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="mt-6 bg-red-600 px-5 py-2"
          >
            Logout
          </button>

        </div>
      </div>
    </main>
  );
}
"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("https://xbihar.onrender.com/api/auth/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* ✅ LEFT MENU */}
      <div className="w-64 border-r border-zinc-800 p-6">

        {/* <p
          className="cursor-pointer mb-4"
          onClick={() => window.location.href = "/orders"}
        >
          Orders
        </p> */}
        <Link href="/orders" className="cursor-pointer mb-4 block">
  Orders
</Link>

        <p className="font-bold">
          Profile
        </p>

      </div>

      {/* ✅ RIGHT CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-2xl mb-6 font-semibold">
          {user.name}
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          {/* ✅ EMAIL */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Email
            </p>

            <p className="text-lg">
              {user.email} ✅
            </p>
          </div>

          {/* ✅ ADDRESS */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Addresses
            </p>

            <p className="text-sm text-gray-500">
              No address added
            </p>
          </div>

          {/* ✅ LOGOUT */}
          <button
            onClick={async () => {
              await fetch(
                "https://xbihar.onrender.com/api/auth/logout",
                {
                  method: "POST",
                  credentials: "include",
                }
              );

              window.location.href = "/login";
            }}
            className="bg-red-600 px-5 py-2 rounded mt-4"
          >
            Sign out
          </button>

        </div>

      </div>
    </div>
  );
}
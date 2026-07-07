

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDropdown() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!user) return null;

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow w-64">

      <p className="font-semibold text-lg">
        Hi {user.name}
      </p>

      <p className="text-sm text-gray-500 mb-4">
        {user.email}
      </p>

      <div className="flex justify-between border-t pt-3">

        {/* ✅ ORDERS */}
        <button
          onClick={() => router.push("/orders")}
        >
          Orders
        </button>

        {/* ✅ PROFILE */}
        <button
          onClick={() => router.push("/profile")}
        >
          Profile
        </button>

      </div>

    </div>
  );
}
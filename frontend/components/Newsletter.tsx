
"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const res = await fetch("https://xbihar.onrender.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Subscribed successfully");
        setEmail("");
      } else {
        alert("❌ Failed to subscribe");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Server error");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">

      <h2 className="text-4xl font-['Orbitron']">
        Subscribe To Our Newsletter
      </h2>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-8 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-4 font-['Inter'] "
      />

      <button
        onClick={handleSubscribe}
        className="mt-4 w-full bg-white text-black py-4 rounded-xl font-['Orbitron']"
      >
        Subscribe
      </button>

    </section>
  );
}




"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("https://xbihar.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message Sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 pt-32">

        <h1 className="text-2xl font-orbitron">
          CONTACT US
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full bg-zinc-900 p-4 rounded-xl font-inter"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-zinc-900 p-4 rounded-xl"
          />

          <textarea
            placeholder="Your Message"
            rows={6}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full bg-zinc-900 p-4 rounded-xl"
          />

          <button
            type="submit"
            className="bg-white text-black px-8 py-4 rounded-xl"
          >
            Send Message
          </button>

        </form>
      </section>
      <Footer/>
    </main>
  );
}

"use client";

import Navbar from "@/components/Navbar";

export default function ComingSoonPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">

      <Navbar />

      {/* ✅ Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/coming-soon.mp4" type="video/mp4" />
      </video>

      {/* ✅ Text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-5xl md:text-7xl font-orbitron tracking-widest">
          COMING SOON
        </h1>
      </div>

    </main>
  );
}
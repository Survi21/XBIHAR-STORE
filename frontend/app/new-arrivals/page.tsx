"use client";

import Navbar from "@/components/Navbar";

export default function NewArrivalsPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Background Video */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src="/comming-soon.MP4" type="video/mp4" />
      </video> */}

      {/* ✅ Background Video (Responsive) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* Yeh sirf mobile browser par chalegi (Max width 767px) */}
        <source src="/coming-soon-mobile.MP4" type="video/MPgit add .4" media="(max-width: 767px)" />
        
        {/* Yeh laptop aur tablet par chalegi (Min width 768px) */}
        <source src="/coming-soon.mp4" type="video/mp4" media="(min-width: 768px)" />
      </video>

      {/* ✅ Center Text */}
      <div className="relative z-10 flex items-center justify-center h-full">

        {/* <h1 className="text-white text-5xl md:text-7xl font-orbitron tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          COMING SOON
        </h1> */}

      </div>

    </main>
  );
}
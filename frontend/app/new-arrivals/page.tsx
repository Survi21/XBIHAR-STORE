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
   {/* ✅ Background Video (Perfect for Mobile & Laptop) */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain bg-black md:object-cover z-0"
      >
        <source src="/comming-soon.MP4" type="video/mp4" />
      </video> */}


{/* ✅ Background Video (No Black Bars on Mobile, Full Screen Everywhere) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-fill md:object-cover z-0"
      >
        <source src="/comming-soon.MP4" type="video/mp4" />
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
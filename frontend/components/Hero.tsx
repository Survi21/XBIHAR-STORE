
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* ✅ VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.MP4" type="video/MP4" />
      </video>

      {/* ✅ DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ✅ CONTENT */}
      <div className="relative z-10 px-5">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logoa.PNG"
            alt="logo"
            width={250}
            height={250}
          />
        </div>

        {/* TAGLINE */}
        <p
  style={{ fontFamily: "'Dancing Script', cursive" }}
  className="text-red-500 text-xl text-center translate-x-18 -mt-18"
>
          Crafted in Pride
        </p>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <Link
            href="/product"
            className="bg-white text-black px-8 py-3 rounded-xl font-orbitron
            hover:scale-105 transition"
          >
            SHOP COLLECTION
          </Link>
        </div>

      </div>
    </section>
  );
}
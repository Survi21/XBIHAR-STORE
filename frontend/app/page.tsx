










// 'use client';

// import { useState, useEffect } from 'react';
// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import Marquee from "@/components/Marquee";
// import FeaturedProducts from "@/components/FeaturedProducts";
// import FAQ from "@/components/FAQ";
// import Benefits from "@/components/Benefits";
// import AboutSection from "@/components/AboutSection";
// import Newsletter from "@/components/Newsletter";
// import Footer from "@/components/Footer";

// // 🗓️ LAUNCH DATE TIMESTAMP SET TO: JULY 24, 2026 AT 05:00 PM IST
// const LAUNCH_DATE = new Date("2026-07-24T17:00:00+05:30").getTime();

// interface TimeLeft {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// export default function Home() {
//   const [isLaunched, setIsLaunched] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   // useEffect(() => {
//   //   const urlParams = new URLSearchParams(window.location.search);
//   //   if (urlParams.get('test') === 'true') {
//   //     setIsLaunched(true);
//   //     return;
//   //   }

//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     // 🔽 YAHAN PAR YE NAYI LINE ADD KARO


//     setIsMounted(true);

//     const urlParams = new URLSearchParams(window.location.search);
//     if (urlParams.get('test') === 'true') {
//       setIsLaunched(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const difference = LAUNCH_DATE - now;

//       if (difference <= 0) {
//         setIsLaunched(true);
//         clearInterval(timer);
//       } else {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//           minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((difference % (1000 * 60)) / 1000)
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // ⏳ CONDITION 1: EXACT MATCHING MOCKUP COUNTDOWN LANDING PAGE
//   // 🔽 IS LINE KO 'if (!isLaunched)' SE THIK PEHLE DAALEIN
//   if (!isMounted) return <div className="min-h-screen bg-black" />;
  
//   if (!isLaunched) {
//     return (
//       <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-red-600 selection:text-white py-8 px-4">
        
//         {/* 🎥 CINEMATIC BACKGROUND VIDEO */}
//         <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
//           <video 
//             autoPlay 
//             loop 
//             muted 
//             playsInline
//             className="absolute top-1/2 left-1/2 min-w-full min-h-full [transform:translate(-50%,-50%)] object-cover opacity-75"
//           >
//             <source src="/v.mp4" type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-1"></div>
//         </div>

//         {/* --- CENTERED HERO CONTENT --- */}
//         <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-xl md:max-w-3xl w-full">
          
//           {/* 1. LOGO + SLOGAN STACK */}
//           {/* <div className="mb-6 md:mb-10 flex flex-col w-48 sm:w-64 md:w-80 select-none pointer-events-none mx-auto items-center">
//             <img 
//               src="/logoa.PNG" 
//               alt="xBihar Logo" 
//               className="w-full h-auto object-contain opacity-95"
//             />
//                 <div className="w-full text-right mt-6 pr-2 md:pr-6">
//               <p
//                 style={{ fontFamily: "'Dancing Script', cursive" }}
//                 className="text-red-500 text-lg sm:text-xl"
//               >
//                 Crafted in Pride
//               </p>
//             </div>
//           </div> */}



//           <div className="mb-10 flex flex-col w-66 md:w-80 select-none pointer-events-none">
//             <img 
//               src="/logoa.PNG" 
//               alt="xBihar Logo" 
//                className="w-full h-auto object-contain opacity-95"
//              />
//              <div className="w-full text-right mt-6 pr-2 md:pr-6">
//                <p
//                  style={{ fontFamily: "'Dancing Script', cursive" }}
//                  className="text-red-500 text-xl text-center translate-x-18 -mt-18"
//             //  className="text-red-500 text-lg sm:text-xl md:text-center md:translate-x-12 md:-mt-12"
//              >
//                  Crafted in Pride
//                </p>
//              </div>
//       </div>


//           {/* 2. PREMIUM CALENDAR METADATA BANNER */}
//           {/* <div className="mb-6 mb-6 select-none px-2"> */}
//           <div className="mb-2 -mt-14 md:mt-0 select-none px-2">
//             <p className="font-orbitron text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-zinc-100 uppercase inline-flex items-center gap-2 sm:gap-3 justify-center flex-wrap">
//               24 July 2026 <span className="text-red-500 text-xs sm:text-base scale-150 relative -top-[1px]">•</span> 05:00 PM IST
//             </p>
//           </div>

//           {/* Tech Diamond Line */}
//           <div className="relative w-24 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6">
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-zinc-500 rotate-45"></div>
//           </div>

            

//           <h3 className="font-orbitron text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-zinc-400 mb-6 font-medium select-none">
//             The Wait Ends In
//           </h3>

//           {/* 3. SCI-FI DIGITAL TIMER SYSTEM (Responsive Gap and Sizes) */}
//           <div className="mb-8 md:mb-12 flex items-center justify-center gap-2 sm:gap-4 md:gap-8 select-none max-w-md md:max-w-xl w-full mx-auto px-2">
            
//             {/* Days */}
//             <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px] md:min-w-[70px]">
//               <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-light tracking-wider text-zinc-100">
//                 {timeLeft.days.toString().padStart(2, '0')}
//               </span>
//               <span className="font-orbitron text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2 font-medium">
//                 Days
//               </span>
//             </div>

//             <span className="text-zinc-800 text-lg sm:text-2xl md:text-4xl font-extralight opacity-40 relative -top-2">|</span>

//             {/* Hours */}
//             <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px] md:min-w-[70px]">
//               <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-light tracking-wider text-zinc-100">
//                 {timeLeft.hours.toString().padStart(2, '0')}
//               </span>
//               <span className="font-orbitron text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2 font-medium">
//                 Hrs
//               </span>
//             </div>

//             <span className="text-zinc-800 text-lg sm:text-2xl md:text-4xl font-extralight opacity-40 relative -top-2">|</span>

//             {/* Minutes */}
//             <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px] md:min-w-[70px]">
//               <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-light tracking-wider text-zinc-100">
//                 {timeLeft.minutes.toString().padStart(2, '0')}
//               </span>
//               <span className="font-orbitron text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2 font-medium">
//                 Mins
//               </span>
//             </div>

//             <span className="text-zinc-800 text-lg sm:text-2xl md:text-4xl font-extralight opacity-40 relative -top-2">|</span>

//             {/* Seconds */}
//             <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px] md:min-w-[70px]">
//               <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-light tracking-wider text-white">
//                 {timeLeft.seconds.toString().padStart(2, '0')}
//               </span>
//               <span className="font-orbitron text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2 font-medium">
//                 Secs
//               </span>
//             </div>

//           </div>

//           <div className="relative w-24 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8">
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-zinc-500 rotate-45"></div>
//           </div>

//           {/* 4. GET NOTIFIED TRIGGER BUTTON */}
//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="relative px-8 py-3 sm:px-12 sm:py-3.5 bg-black/40 border border-red-950 text-red-500 hover:text-white hover:border-red-600 text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.45em] uppercase transition-all duration-500 group overflow-hidden rounded-[2px]"
//           >
//             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
//             <span className="relative z-10 font-orbitron flex items-center justify-center gap-2 sm:gap-3">
//               Get Notified
//               <span className="font-mono text-xs tracking-normal transform group-hover:translate-x-1 transition-transform duration-300">&gt;</span>
//             </span>
//             <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
//           </button>
//         </div>

//         {/* --- POPUP MODAL --- */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300">
//             <div className="relative w-full max-w-[90%] sm:max-w-[440px] bg-gradient-to-b from-[#111111]/95 to-[#070707]/98 border border-zinc-800/80 px-4 py-8 sm:px-8 sm:py-10 text-center shadow-2xl rounded-[4px]">
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 text-xs font-mono"
//               >
//                 ✕
//               </button>
//               <h4 className="text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.25em] font-orbitron text-zinc-100 uppercase mb-4">
//                 Get Instant Updates
//               </h4>
//               {/* <div className="relative w-28 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-red-600/80 to-transparent mx-auto mb-6">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-600 rotate-45 shadow-[0_0_6px_#dc2626]"></div>
//               </div> */}


//               {/* ⚡ RED LINE AND DIAMOND FIXED CODE */}
// <div className="relative w-28 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6 flex items-center justify-center">
//   <span className="w-1.5 h-1.5 bg-red-600 rotate-45 shadow-[0_0_6px_#dc2626]"></span>
// </div>
//               <p className="text-xs sm:text-sm text-zinc-400 font-light tracking-wide leading-relaxed mb-6 sm:mb-8">
//                 Join our official family. The link will become active as soon as the website goes live.
//               </p>
//               <div className="flex flex-col gap-3 sm:gap-4 w-full">
//                 <a 
//                   href="https://www.instagram.com/xbihar.in" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full py-3.5 sm:py-4 bg-transparent hover:bg-zinc-900/30 border border-zinc-800 hover:border-zinc-500 text-zinc-100 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-between px-4 sm:px-6 group rounded-[4px]"
//                 >
//                   <span className="font-orbitron font-medium mx-auto pl-4">Follow On Instagram</span>
//                   <span className="text-red-500 font-mono text-base opacity-80 group-hover:translate-x-1 transition-transform">→</span>
//                 </a>
//                 <a 
//                   href="https://wa.me/message/SKUMBYEC6FR3O1" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full py-3.5 sm:py-4 bg-gradient-to-b from-red-950/70 via-red-900/60 to-red-950/80 hover:from-red-900/70 hover:to-red-950/90 border border-red-800/40 text-zinc-100 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-between px-4 sm:px-6 group rounded-[4px] relative"
//                 >
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-red-500/40"></span>
//                   <span className="font-orbitron font-medium mx-auto pl-4">Join WhatsApp Channel</span>
//                   <span className="text-zinc-100 font-mono text-base opacity-80 group-hover:translate-x-1 transition-transform">→</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     );
//   }

//   // 🎯 CONDITION 2: MAIN STORE CONTENTS
//   return (
//     <main className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Hero />
//       <Marquee />
//       <FeaturedProducts />
//       <FAQ />
//       <Benefits />
//       <AboutSection />
//       <Newsletter />
//       <Footer />
//     </main>
//   );
// }



'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <FAQ />
      <Benefits />
      <AboutSection />
      <Newsletter />
      <Footer />
    </main>
  );
}


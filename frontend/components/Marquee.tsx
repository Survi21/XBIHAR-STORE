

// export default function Marquee() {
//   return (
//     <div className="overflow-hidden border-t border-zinc-800 py-8 bg-black">

//       <div className="flex whitespace-nowrap animate-marquee">

//         <span className="text-xl hidden md:flex gap-1 font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-20">
//          Crafted in Pride
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-2">
//         Crafted in Pride
//         </span>

      
//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-2">
//         Crafted in Pride
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-2">
//         Crafted in Pride
//         </span>
       
//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl hidden md:flex gap-8 font-orbitron font-black mx-2">
//         Crafted in Pride
//         </span>
       

//       </div>

//     </div>
//   );
// }







// export default function Marquee() {
//   return (
//     <div className="overflow-hidden border-t border-zinc-800 py-8 bg-black">

//       <div className="flex whitespace-nowrap animate-marquee">

//         <span className="text-xl flex font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl flex font-orbitron font-black mx-20 bg-gray-700 px-4 py-1 rounded">
//           Crafted in Pride
//         </span>

//         <span className="text-xl flex font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl flex font-orbitron font-black mx-20 bg-gray-700 px-4 py-1 rounded">
//           Crafted in Pride
//         </span>

//         <span className="text-xl flex font-orbitron font-black mx-20">
//           XBIHAR
//         </span>

//         <span className="text-xl flex font-orbitron font-black mx-20 bg-gray-700 px-4 py-1 rounded">
//           Crafted in Pride
//         </span>

//       </div>

//     </div>
//   );
// }


// export default function Marquee() {
//   return (
//     <div className="overflow-hidden border-t border-zinc-800 py-6 bg-black">

//       <div className="flex whitespace-nowrap animate-marquee items-center">

//         {/* ✅ GROUP 1 */}
//         <div className="mx-20 flex flex-col items-center">
//           <div className="h-[2px] w-full bg-gray-500 mb-1"></div>

//           <div className="flex gap-6">
//             <span className="text-xl font-orbitron font-black text-white">
//               XBIHAR
//             </span>
//             <span className="text-xl font-orbitron font-black text-white">
//               Crafted in Pride
//             </span>
//           </div>

//           <div className="h-[2px] w-full bg-gray-500 mt-1"></div>
//         </div>


//         {/* ✅ GROUP 2 (repeat) */}
//         <div className="mx-20 flex flex-col items-center">
//           <div className="h-[2px] w-full bg-gray-500 mb-1"></div>

//           <div className="flex gap-6">
//             <span className="text-xl font-orbitron font-black text-white">
//               XBIHAR
//             </span>
//             <span className="text-xl font-orbitron font-black text-white">
//               Crafted in Pride
//             </span>
//           </div>

//           <div className="h-[2px] w-full bg-gray-500 mt-1"></div>
//         </div>

//       </div>

//     </div>
//   );
// }


export default function Marquee() {
  return (
    <div className="w-full">

      {/* ✅ TOP LINE */}
      {/* <div className="h-[1px] bg-gray-500 w-full"></div> */}

      {/* ✅ GREY STRIP WITH TEXT INSIDE */}
      <div className="overflow-hidden bg-zinc-900 py-3">

        <div className="flex whitespace-nowrap animate-marquee">

          {/* ✅ duplicated content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 mx-10">

              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>
              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>
              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>
              <span className="text-white text-lg font-orbitron font-black">
                XBIHAR
              </span>

              <span className="text-white text-lg font-orbitron font-black">
                Crafted in Pride
              </span>




            </div>
          ))}

        </div>

      </div>

      {/* ✅ BOTTOM LINE */}
      {/* <div className="h-[1px] bg-gray-500 w-full"></div> */}

    </div>
  );
}






















// export default function Marquee() {
//   return (
//     <div className="w-full">

//       {/* Top line */}
//       <div className="h-[1px] bg-gray-500 w-full" />

//       {/* Grey strip */}
//       <div className="overflow-hidden bg-gray-700">

//         <div className="marquee-track">

//           {/* ✅ FIRST COPY */}
//           <div className="marquee-content">
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//           </div>

//           {/* ✅ SECOND COPY (for seamless loop) */}
//           <div className="marquee-content">
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//             <span>XBIHAR</span>
//             <span>Crafted in Pride</span>
//           </div>

//         </div>

//       </div>

//       {/* Bottom line */}
//       <div className="h-[1px] bg-gray-500 w-full" />

//     </div>
//   );
// }

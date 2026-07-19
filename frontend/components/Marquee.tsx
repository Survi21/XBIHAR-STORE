


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


















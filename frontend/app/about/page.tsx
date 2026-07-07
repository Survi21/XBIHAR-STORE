


import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Heading */}
        <div className="text-center mb-20 space-y-8">
          <h1 className="text-3xl md:text-4xl font-orbitron ">
            ABOUT XBIHAR
          </h1>
        
        
          <p className="font-['Inter'] text-zinc-">
            MORE THAN FASHION — A MOVEMENT
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-zinc-300 leading-9 text-lg  font-['Inter'] ">

          <p>
            <span className="text-white font-bold">XBIHAR</span> was born from
            the soil, stories, and spirit of Bihar.
          </p>

          <p>
            Created to carry Bihar forward through identity, design, and
            expression, we exist to bring attention back to the culture,
            history, and legacy that continue to shape generations.
          </p>

          <p>
            Our inspiration flows from the compassion of
            <span className="text-white font-Poppins"> Buddha</span>, the
            intellect of
            <span className="text-white font-semibold"> Chanakya</span>, and
            the courage of
            <span className="text-white font-semibold"> Ashoka</span> —
            legacies born in Bihar that shaped the world.
          </p>

          <div className="border-l-4 border-white pl-6 py-2">
            <p className="italic text-zinc-200">
              "At the center of our emblem rides a warrior representing
              Samrat Ashoka — mounted, focused, and moving forward."
            </p>
          </div>

          <p>
            The drawn bow is not aimed at the past, but toward what comes next.
            A symbol of vision, resilience, and the courage to move beyond
            boundaries while staying rooted.
          </p>

          <p>
            The <span className="text-white font-bold">X</span> in XBIHAR
            represents expansion — beyond Bihar, beyond India. A mark of
            journeys, ambition, and carrying your roots into every place your
            story reaches.
          </p>

          <p>
            Every piece carries the mitti that shaped us, the history that
            inspires us, and the fire that moves us.
          </p>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 my-10">
            <h2 className="text-3xl font-orbitron  mb-4 text-white">
              CRAFTED IN PRIDE
            </h2>

            <p className="text-zinc-300">
              More than our tagline — it reflects what we stand for:
              creating with intention, wearing identity with confidence,
              and carrying Bihar with pride.
            </p>
          </div>

          <p>
            For those from Bihar, those carrying Bihar across India,
            and those taking Bihar to the world —
          </p>

          <div className="text-center  font-orbitron  py-10">
            <h2 className="text-xl md:text-xl font-black leading-relaxed">
              XBIHAR IS MORE THAN CLOTHING.
              <br />
              IT IS YOUR ROOTS.
              <br />
              YOUR PRIDE.
              <br />
              YOUR STORY.
            </h2>
          </div>

          <p className="text-center text-xl text-zinc-300">
            So the world remembers Bihar —
            <br />
            the way it was always meant to be remembered.
          </p>

          <div className="text-center pt-10 border-t border-zinc-800">
            <h3 className="text-3xl font-orbitron ">
              CRAFTED IN PRIDE
            </h3>

            <p className="mt-4 text-zinc-500 uppercase tracking-[4px]">
              Designed in Bihar | Made in Bharat
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}


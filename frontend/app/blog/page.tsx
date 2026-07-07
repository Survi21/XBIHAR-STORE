
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";




export default function BlogPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <h1 className="font-orbitron text-4xl md:text-7xl font-black tracking-wider">
          BLOG
        </h1>
{/* 
        <p className="mt-4 text-zinc-400 tracking-[5px] uppercase">
         Culture . Pride .
        </p> */}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">

       
          <Link
  href="/blog/brand-story"
  className=" font-orbitron  text-l bg-white text-black px-6 py-3 rounded-lg font-medium"
>
  BRAND STORY
</Link>
  
<Link
  href="/blog/brand-story"
  className="font-orbitron  text-l bg-white text-black px-6 py-3 rounded-lg font-medium"
>
  DESIGN
</Link>
<Link
  href="/blog/brand-story"
  className="font-orbitron  text-l bg-white text-black px-6 py-3 rounded-lg font-medium"
>
PHILOSOPHY
</Link>

<Link
  href="/blog/brand-story"
  className="font-orbitron  text-l  bg-white text-black px-6 py-3 rounded-lg font-medium"
>
PROCESS
</Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-700 transition"
            >
             
              <img
  src={blog.image}
  alt={blog.title}
  className="w-full h-72 object-cover"
/>
              {/* Content */}
              <div className="p-8">

             

                <h2 className=" font-orbitron text-3xl font-bold mt-4 leading-tight text-transform: uppercase ">
                  {blog.title}
                </h2>

                <p className="font-['Inter'] mt-5 text-zinc-400 leading-8">
                  {blog.description}
                </p>

                <Link
                 href={`/blog/${blog.id}`}
                  className=" font-['Inter'] inline-block mt-6 text-white font-medium"
                >
                  Read More →
                </Link>

              </div>
            </div>
          ))}

        </div>
      </section>

    
   <section className="border-t border-zinc-900 py-24">
  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="font-orbitron   md:text-3xl font-black leading-tight">
      THIS ISN'T JUST CLOTHING.
      <br />
      IT'S OUR CULTURE.
      <br />
      IT'S OUR REVOLUTION.
    </h2>

    <Link href="/Newsletter">
      <button className=" mt-10 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
        Be A Part Of The Movement
      </button>
    </Link>

  </div>
</section>
<Footer/>
    </main>
  );
} 

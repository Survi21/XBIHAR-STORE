
import Navbar from "@/components/Navbar";
import { blogs } from "@/data/blogs";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const blog = blogs.find(
    (item) => item.id === Number(id)
  );

  if (!blog) {
    return <h1>Blog Not Found</h1>;
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-2xl mb-10 "
        />

        <h1 className="font-orbitron text-4xl font-bold mb-6 text-transform: uppercase ">
          {blog.title}
        </h1>

        <div className="font-['Inter'] whitespace-pre-line text-zinc-300 leading-6">
          {blog.content}
        </div>

      </div>
    </main>
  );
}
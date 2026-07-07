

<nav className="hidden md:flex gap-8 font-orbitron text-zinc-300"> 

</nav>



import Image from "next/image";
import Link from "next/link";
const products = [
    {
      id: 1,
      name: "ROAR BHOJPURI",
      price: "₹999",
      originalPrice: "₹1199",
      image: "/products/roar/front.png",
    },
    {
      id: 2,
      name: "PASHULOK",
      price: "₹1199",
      originalPrice: "₹1499",
      image: "/products/pasulok/front.png",
    },
    {
      id: 3,
      name: "NAARI",
      price: "₹999",
      originalPrice: "₹1199",
      image: "/products/naari/front.png",
    },
  ];

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-xl  font-orbitron text-center mb-12">
        FEATURED   COLLECTION
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <Link
            key={product.id}
            href="/product"
            className="group"
          >

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

              <div className="relative h-[320px]">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-4">

                <h3 className="font-orbitron text-lg">
                  {product.name}
                </h3>

           
                
                <div className="mt-2 flex items-center gap-2">
  {/* <span className="text-lg font-bold text-white">
    {product.price}
  </span> */}
   
   <span className="text-lg font-bold font-['Orbitron']">
  {product.price}
</span>


  <span className="text-zinc-500 line-through font-['Orbitron']">
    {product.originalPrice}
  </span>

  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-['Inter'] ">
    SALE
  </span>
</div>


              </div>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}



import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* SHOP */}
        <div>
          <h3 className="font-['Orbitron']">SHOP</h3>

          <Link
            href="/product"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            All Products
          </Link>
        </div>

        {/* INFO */}
        <div>
          <h3 className="font-['Orbitron']">INFO</h3>

          <Link
            href="/about"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Contact
          </Link>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-['Orbitron']">LEGAL</h3>

          <Link
            href="/privacy-policy"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Privacy Policy
          </Link>

          <Link
            href="/shipping-policy"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Shipping Policy
          </Link>

          <Link
            href="/terms-condition"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Terms & Condition
          </Link>

          <Link
            href="/return-policy"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Return, Replacment & Refund Policy
          </Link>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-['Orbitron']">SOCIAL</h3>

          <a
            href="https://www.instagram.com/xbihar.in"
            target="_blank"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Instagram
          </a>

          <a
            href="https://wa.me/message/SKUMBYEC6FR3O1"
            target="_blank"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Whatsapp
          </a>

        
          <a
            href="https://www.facebook.com/share/1E1Uat3zmH/?mibextid=wwXIfr"
            target="_blank"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            Facebook
          </a>

          <a
            href="https://youtube.com/@xbihar-in"
            target="_blank"
            className="block mt-3 font-['Inter'] hover:text-red-500"
          >
            YouTube
          </a>
        </div>

      </div>

      <p className="font-['Orbitron'] text-center mt-12 text-zinc-500">
        © 2026 XBIHAR
      </p>
    </footer>
  );
}


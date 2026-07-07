import { Truck, RefreshCcw, ShieldCheck } from "lucide-react";

export default function Benefits() {
  return (
    <section className="border-t border-zinc-800 border-b border-zinc-800 py-10">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Free Shipping */}
        <div className="flex items-start gap-4">

          <Truck className="w-7 h-7 text-white" />

          <div>
            <h3 className="font-orbitron uppercase">
              FREE SHIPPING
            </h3>

            <p className="font-['Inter'] text-zinc-400 text-sm mt-1">
              On orders all over India
            </p>
          </div>

        </div>

        {/* Exchange */}
        <div className="flex items-start gap-4">

          <RefreshCcw className="w-7 h-7 text-white" />

          <div>
            <h3 className="font-orbitron uppercase">
              NO RETURN NO EXCHANGE
            </h3>

            <p className="font-['Inter'] text-zinc-400 text-sm mt-1">
              On full priced items only
            </p>
          </div>

        </div>

        {/* Secure Payment */}
        <div className="flex items-start gap-4">

          <ShieldCheck className="w-7 h-7 text-white" />

          <div>
            <h3 className="font-orbitron uppercase">
              PAYMENT SECURE
            </h3>

            <p className=" font-['Inter'] text-zinc-400 text-sm mt-1">
              Guaranteed payment protection
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export default function ReturnsPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 flex-grow">

        <h1 className="text-4xl font-orbitron mb-6">
          RETURN, REPLACEMENT & REFUND POLICY
        </h1>

        <p className="text-zinc-400 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-10 text-zinc-300 text-sm leading-7 font-['Inter']">

          {/* OVERVIEW */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">POLICY OVERVIEW</h2>
            <p>
              At XBIHAR, every product undergoes quality inspection and verification before being packed and dispatched.
            </p>
            <p>
              We strive to ensure that customers receive products that meet our quality standards and accurately reflect the designs showcased on our website.
            </p>
            <p>
              Due to the nature of our inventory management, limited production runs, and operational processes, all purchases made through xbihar.com are considered final and are governed by the terms outlined in this Return, Replacement & Refund Policy.
            </p>
          </section>

          {/* NO RETURNS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">NO RETURNS</h2>
            <p>
              XBIHAR does not accept returns for reasons including change of mind, personal preference, incorrect size selection, color expectations influenced by screen settings, or accidental damage occurring after delivery.
            </p>
            <p>
              Customers are strongly encouraged to review product descriptions, sizing information, and product details carefully before placing an order.
            </p>
            <p>
              By completing a purchase, customers acknowledge that they have reviewed the product information and accept the finality of the transaction.
            </p>
          </section>

          {/* NO EXCHANGES */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">NO EXCHANGES</h2>
            <p>
              XBIHAR does not offer exchanges for size changes, color preferences, style preferences, fit concerns, or customer ordering mistakes.
            </p>
            <p>
              As all purchases are considered final, customers should verify their product selection carefully before completing checkout.
            </p>
            <p>
              Except where specifically provided under this policy, exchange requests will not be accepted.
            </p>
          </section>

          {/* ELIGIBLE REPLACEMENTS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">ELIGIBLE REPLACEMENTS</h2>
            <p>
              A replacement request may be considered only in circumstances where the product received is damaged during transit, contains a manufacturing defect, or differs materially from the item ordered.
            </p>
            <p>
              Replacement eligibility is determined solely after review and verification by the XBIHAR support team.
            </p>
            <p>
              Submission of a request does not guarantee approval.
            </p>
          </section>

          {/* CLAIM WINDOW */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">CLAIM WINDOW</h2>
            <p>
              Customers must report any damage, defect, or incorrect product delivery within 48 hours of receiving the shipment.
            </p>
            <p>
              Requests submitted after the 48-hour reporting window may not be eligible for review, replacement, or resolution.
            </p>
            <p>
              Prompt reporting allows us to investigate issues effectively and coordinate with courier partners where necessary.
            </p>
          </section>

          {/* HOW TO REQUEST */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">HOW TO REQUEST A REPLACEMENT</h2>
            <p>
              To initiate a replacement request, customers should contact XBIHAR support and provide the relevant order number, clear photographs of the product, supporting images of the packaging where applicable, and a detailed description of the issue encountered.
            </p>
            <p>
              Providing complete and accurate information helps us review claims efficiently and reach a resolution as quickly as possible.
            </p>
          </section>

          {/* VERIFICATION */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">VERIFICATION PROCESS</h2>
            <p>
              All replacement requests are reviewed individually by the XBIHAR support team.
            </p>
            <p>
              During the verification process, we may assess submitted photographs, order information, delivery records, product condition, and any additional information necessary to determine eligibility.
            </p>
            <p>
              XBIHAR reserves the right to approve or reject any request based on the findings of this review process.
            </p>
          </section>

          {/* REPLACEMENT PROCESS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">REPLACEMENT PROCESS</h2>
            <p>
              If a replacement request is approved, a replacement product will generally be dispatched within 2–5 business days, subject to inventory availability and operational conditions.
            </p>
            <p>
              In situations where the same product is unavailable, XBIHAR may determine an alternative resolution at its sole discretion.
            </p>
            <p>
              Replacement decisions remain final and are subject to stock availability and verification outcomes.
            </p>
          </section>

          {/* REFUNDS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">REFUNDS</h2>
            <p>
              As a general policy, XBIHAR does not provide refunds for completed purchases.
            </p>
            <p>
              Refunds may only be considered in exceptional situations where a replacement cannot reasonably be provided or where required by applicable law.
            </p>
            <p>
              Any refund decision shall remain at the sole discretion of XBIHAR and may be subject to verification, investigation, and approval procedures.
            </p>
          </section>

          {/* LOST ORDERS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">LOST ORDERS</h2>
            <p>
              If an order is confirmed as lost during transit by the courier partner, XBIHAR may, after completing the necessary verification process, arrange a replacement shipment or issue an appropriate refund depending on the circumstances of the case.
            </p>
            <p>
              Resolution timelines may vary depending on courier investigations and operational requirements.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">CONTACT</h2>
            <p>
              For questions regarding returns, replacements, refunds, damaged products, or order-related concerns, customers may contact XBIHAR through the following channels:
            </p>
            <p>Email: xbihar.in@gmail.com</p>
            <p>WhatsApp: +91 93541 65694</p>
            <p>Website: xbihar.com</p>
          </section>

        </div>
      </div>

      <Newsletter />
      <Footer />

    </main>
  );
}

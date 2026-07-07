
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export default function ShippingPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 flex-grow">

        <h1 className="text-4xl font-orbitron mb-6">
          SHIPPING POLICY
        </h1>

        <p className="text-zinc-400 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-10 text-zinc-300 text-sm leading-7 font-['Inter']">

          {/* OVERVIEW */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">OVERVIEW</h2>
            <p>Thank you for shopping with XBIHAR.</p>
            <p>
              We are committed to delivering every order safely, efficiently, and on time. This Shipping Policy explains how orders are processed, shipped, tracked, and delivered through xbihar.com.
            </p>
            <p>
              By placing an order on our website, you agree to the terms outlined in this Shipping Policy.
            </p>
          </section>

          {/* ORDER PROCESSING */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">ORDER PROCESSING</h2>
            <p>
              All orders are processed within 2–4 business days after successful payment confirmation.
            </p>
            <p>
              During this period, orders undergo payment verification, inventory confirmation, quality inspection, packaging, and preparation for shipment.
            </p>
            <p>
              Orders are generally not processed on Sundays or public holidays.
            </p>
          </section>

          {/* SHIPPING CHARGES */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">SHIPPING CHARGES</h2>
            <p>
              Shipping charges are calculated automatically during checkout based on the delivery location, package weight, courier partner rates, and serviceability of the destination.
            </p>
            <p>
              The applicable shipping charges, if any, will be displayed before payment is completed.
            </p>
          </section>

          {/* DELIVERY */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">DELIVERY TIMELINES</h2>
            <p>
              Standard delivery typically takes between 5–10 business days from the date of dispatch.
            </p>
            <p>
              Delivery timelines may vary depending on customer location, courier partner availability, public holidays, weather conditions, and other operational factors.
            </p>
            <p>
              All delivery timelines provided on the website are estimates and should not be considered guaranteed delivery dates.
            </p>
          </section>

          {/* COVERAGE */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">SHIPPING COVERAGE</h2>
            <p>
              XBIHAR currently ships to serviceable locations across India.
            </p>
            <p>
              International shipping is not available at this time.
            </p>
            <p>
              If an order is placed for a location that is later determined to be non-serviceable, the order may be cancelled and any eligible payment refunded.
            </p>
          </section>

          {/* TRACKING */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">ORDER TRACKING</h2>
            <p>
              Once an order has been dispatched, tracking information may be shared via email, SMS, WhatsApp, or any other available communication channel.
            </p>
            <p>
              Customers can use the provided tracking details to monitor the progress of their shipment directly with the courier partner.
            </p>
          </section>

          {/* DELIVERY ATTEMPTS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">DELIVERY ATTEMPTS</h2>
            <p>
              Courier partners generally make multiple attempts to complete delivery.
            </p>
            <p>
              If delivery cannot be completed because the customer is unavailable, the contact information is incorrect, or the address provided is incomplete, the shipment may be returned.
            </p>
            <p>
              In such cases, additional shipping charges may apply if the customer requests re-dispatch of the order.
            </p>
          </section>

          {/* WRONG ADDRESS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">INCORRECT SHIPPING INFORMATION</h2>
            <p>
              Customers are responsible for ensuring that all shipping information provided during checkout is accurate and complete.
            </p>
            <p>
              XBIHAR shall not be responsible for delays, failed deliveries, lost shipments, or additional expenses arising from incorrect information submitted by the customer.
            </p>
          </section>

          {/* DELAYS */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">SHIPPING DELAYS</h2>
            <p>
              Unexpected shipping delays may occur due to circumstances beyond our reasonable control, including festivals, public holidays, extreme weather conditions, transportation disruptions, government restrictions, or force majeure events.
            </p>
            <p>
              While we will make reasonable efforts to keep customers informed, XBIHAR shall not be liable for delays caused by such circumstances.
            </p>
          </section>

          {/* LOST */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">LOST SHIPMENTS</h2>
            <p>
              If a shipment appears to be lost during transit, customers should contact XBIHAR as soon as possible.
            </p>
            <p>
              After verification with the courier partner, XBIHAR may, at its sole discretion, arrange a replacement shipment or issue an appropriate refund depending on the circumstances of the case.
            </p>
          </section>

          {/* DAMAGED */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">DAMAGED SHIPMENTS</h2>
            <p>
              If the outer package appears damaged at the time of delivery, customers should take clear photographs before opening the package.
            </p>
            <p>
              Customers must contact XBIHAR within 48 hours of receiving the shipment.
            </p>
            <p>
              Supporting images and order details may be required for verification.
            </p>
            <p>
              Claims submitted after 48 hours may not be eligible for review or resolution.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-xl font-orbitron mb-2">CONTACT</h2>
            <p>Email: xbihar.in@gmail.com</p>
            <p>WhatsApp: +91 93541 65694</p>
            <p>Website: xbihar.com</p>
          </section>

        </div>
      </div>

      <Footer />
      <Newsletter />

    </main>
  );
}


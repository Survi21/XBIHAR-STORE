
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">

        <h1 className="text-4xl font-orbitron mb-6">
          PRIVACY POLICY
        </h1>

        <p className="text-zinc-400 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-10 text-zinc-300 text-sm leading-7 font-['Inter']">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              1. INTRODUCTION
            </h2>
            <p>
              Welcome to XBIHAR. XBIHAR operates the website xbihar.com and provides clothing and lifestyle products inspired by the heritage, culture, history, and identity of Bihar.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, process, and protect your personal information when you access our website, create an account, place an order, subscribe to communications, or otherwise interact with our services.
            </p>
            <p>
              By accessing or using xbihar.com, you acknowledge and consent to the practices described in this Privacy Policy.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              2. INFORMATION WE COLLECT
            </h2>
            <p>
              We may collect personal information including your full name, email address, mobile number, shipping address, billing address, order details, and information shared during customer support interactions.
            </p>
            <p>
              We may collect account-related information such as account identifiers, profile information, preferences, and authentication details when you use Google Login or Email Login.
            </p>
            <p>
              Transaction-related information may include purchased products, payment status, order history, cart information, and shipping-related data.
            </p>
            <p>
              We may also collect technical information such as IP address, browser type, device information, operating system, referral sources, and analytics data.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              3. HOW WE COLLECT INFORMATION
            </h2>
            <p>
              Information is collected directly from you when creating accounts, placing orders, contacting support, subscribing, or participating in promotions.
            </p>
            <p>
              We also collect information automatically via cookies, analytics tools, session tracking technologies, and cart systems.
            </p>
            <p>
              We may receive information from trusted third parties such as Google authentication, payment gateways, shipping providers, and analytics services.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              4. HOW WE USE YOUR INFORMATION
            </h2>
            <p>
              We use collected information to process orders, confirm purchases, handle payments, arrange shipping, and deliver products.
            </p>
            <p>
              Information is also used to provide customer support, resolve issues, and manage service requests.
            </p>
            <p>
              We may improve website performance, user experience, and develop new features using analytics data.
            </p>
            <p>
              Where permitted, we may send promotional messages, product launches, and updates. Users can opt out anytime.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              5. PAYMENT INFORMATION
            </h2>
            <p>
              Payments are securely processed via third-party providers such as Razorpay. We do not store sensitive information like card numbers, CVV, or UPI PINs on our servers.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              6. COOKIES
            </h2>
            <p>
              Cookies are used for login sessions, cart functionality, analytics, and remembering preferences. Disabling cookies may impact website performance.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              7. INFORMATION SHARING
            </h2>
            <p>
              XBIHAR does not sell or trade personal data. Information may be shared with trusted service providers such as payment processors, logistics partners, and analytics tools only when necessary.
            </p>
            <p>
              Information may also be disclosed when required by law or legal authorities.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              8. DATA SECURITY
            </h2>
            <p>
              We implement reasonable technical and administrative safeguards to protect your data. However, no system can guarantee complete security.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              9. DATA RETENTION
            </h2>
            <p>
              Personal information is retained only as long as required for business operations, legal compliance, and dispute resolution.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              10. THIRD-PARTY LINKS
            </h2>
            <p>
              Our website may contain links to third-party services. We are not responsible for their privacy practices.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              11. CHILDREN’S PRIVACY
            </h2>
            <p>
              We do not knowingly collect personal data from individuals under 18 years of age.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              12. USER RIGHTS
            </h2>
            <p>
              Users may request access, correction, deletion, or opt-out of marketing communications as permitted by law.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              13. CHANGES TO THIS POLICY
            </h2>
            <p>
              We may update this Privacy Policy at any time. Continued use of the site means acceptance of updated terms.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-xl font-orbitron text-white mb-2">
              14. CONTACT
            </h2>
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

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      question: "What material are XBIHAR products made from?",
      answer:
        "Our products are crafted using carefully selected fabrics focused on comfort, quality, and everyday wear.",
    },
    {
      question: "How do I choose the right size?",
      answer:
        "Please refer to the Size Guide available on each product page before placing your order.",
    },
    {
      question: "How do products fit?",
      answer:
        "Fit may vary by product and collection. Detailed fit information is provided on every product page.",
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer:
        "No. We currently accept prepaid orders only.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are typically processed within 1–3 business days. Delivery timelines may vary depending on location.",
    },
    {
      question: "Are shipping charges included?",
      answer:
        "Shipping charges are calculated separately at checkout.",
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes, we currently ship across India.",
    },
    {
      question: "Can I return or exchange my order?",
      answer:
        "We currently do not offer returns or exchanges. Please review product details carefully before placing your order.",
    },
    {
      question: "How should I care for my product?",
      answer:
        "Please refer to the wash and care instructions provided on the product page.",
    },
    {
      question: "How can I contact XBIHAR?",
      answer:
        "You can reach us through our Contact page, Email, Instagram, or WhatsApp.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">

<h2 className="text-5xl font-black text-center mb-12 font-orbitron">
  FAQ'S
</h2>

      <div className="space-y-4">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-zinc-800 pb-4"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="w-full flex justify-between items-center py-4"
            >
            <span className="text-left text-lg font-bold uppercase tracking-wider font-orbitron">
                       {faq.question}
           </span>

              {open === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>

            {open === index && (
              <p className="text-zinc-400 pb-3 leading-7 font-['Inter'] ">
                {faq.answer}
              </p>
            )}
          </div>
        ))}

      </div>

    </section>
  );
}
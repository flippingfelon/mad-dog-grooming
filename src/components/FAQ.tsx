"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online through our scheduling system or reach out directly via phone, email, or the contact form below. We'll confirm your appointment and send you a reminder before your visit.",
  },
  {
    question: "What should I bring to my dog's first appointment?",
    answer:
      "Just bring your pup and any info about their grooming history or special needs. We'll create a detailed profile for your dog during the first visit so we always know exactly how to take care of them.",
  },
  {
    question: "How long does a full groom take?",
    answer:
      "Most full grooms take between 1.5 to 3 hours depending on your dog's size, coat type, and condition. We never rush — your dog gets all the time they need for a calm, thorough groom.",
  },
  {
    question: "Do you groom all dog breeds?",
    answer:
      "Yes! We groom all breeds, sizes, and coat types. From goldendoodles to German shepherds, poodles to pit bulls — every dog is welcome at Mad Dog Grooming.",
  },
  {
    question: "What if my dog is anxious or aggressive during grooming?",
    answer:
      "We specialize in patient, stress-free grooming. Nervous or reactive dogs get extra time, positive reinforcement, and breaks when needed. We'll work with you to make grooming a positive experience over time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through our secure online payment system. Payment is easy and handled at the time of booking or after your appointment.",
  },
  {
    question: "How often should my dog be groomed?",
    answer:
      "It depends on the breed and coat type. Most dogs benefit from a full groom every 4-8 weeks, with bath-and-brush sessions in between. We'll recommend a schedule that works for your dog during their first visit.",
  },
  {
    question: "Do you offer any packages or regular client discounts?",
    answer:
      "We're currently building out our loyalty program. Recurring clients will get priority booking and special rates. Reach out and we'll keep you in the loop as those options roll out.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gold-light/30 last:border-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-brown pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-gold transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-brown-light leading-relaxed pr-8">
          {answer}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <span className="text-gold font-bold uppercase tracking-widest text-sm">FAQ</span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-brown mt-3 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="rounded-2xl bg-cream p-6 md:p-8 shadow-sm">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | undefined>("item-1"); // Default open first item

  const faqs = [
    {
      id: "q1",
      question: "What kind of data can I enrich with your service?",
      answer:
        "We provide verified contact details including work and personal emails, mobile phone numbers, and firmographic data like company size, industry, and tech stack. Our API works in real-time and supports bulk uploads for large lists.",
    },
    {
      id: "q2",
      question: "How accurate is your data?",
      answer:
        "Our data accuracy exceeds 99.9% thanks to multi-layered validation, human verification, and crowdsourced signals. We provide confidence scores with every record so you know exactly how reliable it is.",
    },
    {
      id: "q3",
      question: "Is your data compliant with privacy laws?",
      answer:
        "Absolutely. We are fully GDPR, CCPA, and CAN-SPAM compliant. We only provide data that is ethically sourced and legally available for B2B outreach.",
    },
    {
      id: "q4",
      question: "How fast is your API?",
      answer:
        "Our API typically responds within 800 milliseconds, enabling real-time enrichment inside your CRM, marketing platform, or sales automation tool.",
    },
    {
      id: "q5",
      question: "Can I upload bulk lists for enrichment?",
      answer:
        "Yes, you can upload CSV files via our dashboard or API. We process bulk requests quickly and deliver clean, enriched output ready for your campaigns.",
    },
    {
      id: "q6",
      question: "How does your Email Validation feature work?",
      answer:
        "Our validation checks email syntax, domain MX records, mailbox existence, and bounce history to minimize risk and improve deliverability.",
    },
    {
      id: "q7",
      question:
        "What’s the difference between work and personal email finding?",
      answer:
        "Work emails are tied to company domains and ideal for targeting professional contacts. Personal emails are often used by freelancers, founders, or people without public corporate emails — helping you reach decision-makers on the move.",
    },
    {
      id: "q8",
      question: "Do you offer phone number verification?",
      answer:
        "Yes, our Mobile Finder provides verified direct dials with regular validation to ensure accuracy and reduce call drop rates.",
    },
    {
      id: "q9",
      question: "How do I get started?",
      answer:
        "Sign up for a free account, get instant API access, and start enriching your first contacts with no credit card required.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 px-4 bg-gradient-to-br from-white via-[#F8FAFC] to-white relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#4285F4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#4285F4]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <header className="text-center mb-16">
          <div className="mb-6">
            <span className="text-sm font-semibold text-[#4285F4] bg-[#4285F4]/10 px-4 py-2 rounded-full">
              SUPPORT CENTER
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6"
          >
            FREQUENTLY ASKED QUESTIONS (FAQ)
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Everything you need to know about gofindy. Can&apos;t find what
            you&apos;re looking for?
            <a href="#" className="text-[#4285F4] hover:underline ml-1">
              Contact our support team
            </a>
            .
          </p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden">
          <Accordion
            type="single"
            collapsible
            className="space-y-0"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={`item-${index + 1}`} // Use index for value to ensure uniqueness
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="text-left px-8 py-6 hover:no-underline group hover:bg-[#F8FAFC] transition-all duration-300">
                  <div className="flex items-start gap-4 w-full">
                    <div className="w-8 h-8 bg-[#4285F4]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#4285F4] transition-colors duration-300">
                      <HelpCircle className="w-4 h-4 text-[#4285F4] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-[#1E293B] group-hover:text-[#4285F4] transition-colors duration-300">
                        {faq.question}
                      </div>
                      {/* Category display removed */}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="pl-12">
                    {" "}
                    {/* Keep indentation for answer */}
                    <p className="text-[#64748B] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact support CTA */}

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#4285F4] to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Still have questions?</div>
              <div className="text-sm opacity-90">
                Our support team is here to help
              </div>
            </div>
            <Link href={"#support"}>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
              Contact Support
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

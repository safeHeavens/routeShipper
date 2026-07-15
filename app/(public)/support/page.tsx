"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MessageCircle, Send, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const openSmartsupp = () => {
  if (typeof window !== 'undefined' && (window as any).smartsupp) {
    (window as any).smartsupp('open');
  }
};

const faqs = [
  { q: "How do I track my shipment?", a: "You can track your shipment by entering your tracking number on our Tracking page for real-time status updates." },
  { q: "What are your shipping rates?", a: "Rates depend on package dimensions, weight, and destination. Use our online calculator for a custom quote." },
  { q: "How long does international shipping take?", a: "Air freight typically takes 1-5 business days, while ocean freight ranges from 15-45 days." },
  { q: "Do you offer shipping insurance?", a: "Yes, we offer comprehensive insurance for all shipment types, with additional coverage options for high-value items." },
  { q: "What items are prohibited?", a: "Hazardous materials, explosives, illegal substances, and perishables without proper packaging are prohibited." },
  { q: "How do I file a claim?", a: "Contact our support team within 48 hours of delivery with photos of the damage and your tracking number." },
  { q: "Can I change my delivery address?", a: "Contact our support team immediately. Changes are possible only if the shipment has not yet left the facility." },
  { q: "Do you offer warehousing services?", a: "Yes, we provide end-to-end warehousing, inventory management, and pick-and-pack fulfillment solutions." },
];

export default function SupportPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease: "power2.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
      <div ref={containerRef} className="bg-white min-h-screen">
        <section className="relative py-28 px-6 bg-[#0B1E4A]">
          <div className="mx-auto max-w-3xl mt-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 reveal">Customer Support Center</h1>
            <p className="text-xl text-gray-400 reveal">Dedicated logistics assistance whenever you need it.</p>
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 reveal">
              <Card className="p-8 shadow-sm border border-gray-100 hidden">
                <h2 className="text-2xl font-bold text-[#0B1E4A] mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="How can we help?" rows={6} />
                  <Button className="w-full bg-[#FF7A00] hover:bg-[#FF7A00]/90 h-12">Submit Inquiry</Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6 reveal">
              <h3 className="font-bold text-[#0B1E4A] text-lg mb-2">Connect With Us</h3>
              <button onClick={openSmartsupp} className="w-full flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm mr-4 text-[#FF7A00]">
                  <MessageSquareText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#0B1E4A]">Live Chat</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </button>
              <a href="https://wa.me/18644654683" target="_blank" rel="noopener noreferrer" className="w-full flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm mr-4 text-green-500">
                  <MessageCircle size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#0B1E4A]">WhatsApp</p>
                  <p className="text-sm text-gray-500">+1 864 465 4683</p>
                </div>
              </a>
              <div className="pt-6 border-t mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 text-gray-600 mb-2"> <Phone size={18} className="text-[#FF7A00]" /> <span>+1-864-465-4683</span></div>
                <div className="flex items-center gap-3 text-gray-600"> <Mail size={18} className="text-[#FF7A00]" /> <span>logistics@lavtradeproshipments.com</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-50 reveal">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B1E4A] text-center mb-10">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 rounded-lg border-none shadow-sm">
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
  );
}
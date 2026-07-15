"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Ruth Whippman",
        role: "Wholesale Business",
        company: "Global Logistics Corp",
        content: "The delivery of our new fleet of trucks was seamless. LavtradePro handled the cross-border paperwork perfectly, and the trucks arrived in pristine condition ahead of schedule.",
        image: "/images/ruth-whippman-avatar.jpeg",
        rating: 5,
    },
    {
        name: "MJonny Rother",
        role: "Supply Chain",
        company: "Gold Standard Retail",
        content: "We trust LavtradePro Shipments exclusively with our high-value Gold Box shipments. The security and real-time tracking give me total peace of mind every single time.",
        image: "/images/jonny-rother-avatar.jpeg",
        rating: 5,
    },
    {
        name: "Zoks Mehnar",
        role: "Founder",
        company: "Urban Freight Solutions",
        content: "Professional, reliable, and incredibly fast. Whether it's a massive vehicle transport or our specialized gold boxes, they handle everything with extreme precision.",
        image: "/images/zoks-mehn-avatar.jpeg",
        rating: 5,
    },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-card", {
                scrollTrigger: { trigger: ".testimonial-section", start: "top 70%" },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-gray-50 overflow-hidden testimonial-section">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <span className="text-[#FF7A00] font-semibold tracking-wider uppercase text-sm">Our Clients</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0B1E4A] mt-3">What Our Partners Say</h2>
                </div>

                <div className="relative max-w-5xl mx-auto testimonial-card">
                    <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 lg:p-16 border border-gray-100">
                        <Quote className="h-12 w-12 text-[#FF7A00]/20 mb-8" />

                        <div className="text-center">
                            <p className="text-2xl lg:text-3xl text-[#0B1E4A] leading-relaxed italic font-medium">
                                &ldquo;{testimonials[current].content}&rdquo;
                            </p>
                        </div>

                        <div className="mt-12 flex flex-col items-center">
                            <div className="relative h-20 w-20 mb-4 rounded-full overflow-hidden border-4 border-gray-100">
                                <Image
                                    src={testimonials[current].image}
                                    alt={testimonials[current].name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-[#0B1E4A] text-lg">{testimonials[current].name}</h4>
                            <p className="text-[#FF7A00] font-medium">{testimonials[current].company}</p>

                            <div className="flex gap-1 mt-3">
                                {[...Array(testimonials[current].rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-[#FF7A00] text-[#FF7A00]" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <button
                        onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-12 h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-colors"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-12 h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-colors"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
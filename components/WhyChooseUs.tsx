"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Globe, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content animation: Slide in from bottom
            gsap.from(".why-us-content", {
                scrollTrigger: {
                    trigger: ".why-us-content",
                    start: "top 80%",
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
            });

            // Image zoom effect
            gsap.fromTo(".why-us-image-zoom",
                { scale: 1.2 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: ".why-us-image-container",
                        start: "top bottom",
                        scrub: 1.5,
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Content */}
                    <div className="why-us-content">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F77FF]/10 text-[#1F77FF] text-sm font-semibold mb-4">
              Why LavtradePro Shipments
            </span>
                        <h2 className="text-4xl font-extrabold text-[#0B1E4A] sm:text-5xl leading-tight">
                            Your Trusted Partner in Global Logistics
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            With decades of expertise and a network spanning 150+ countries, LavtradePro Shipments delivers excellence in every shipment. We combine reliability, speed, and precision to move your business forward.
                        </p>

                        <div className="mt-10 space-y-6">
                            {[
                                { icon: Award, title: "Industry-Leading Reliability", desc: "99.8% on-time delivery rate across all services" },
                                { icon: Globe, title: "Global Network", desc: "Strategic partnerships in 150+ countries" },
                                { icon: TrendingUp, title: "Scalable Solutions", desc: "From small parcels to full container loads" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF7A00] shadow-lg shadow-[#FF7A00]/20">
                                        <item.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0B1E4A] text-lg">{item.title}</h3>
                                        <p className="text-gray-600 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link href="/about">
                                <Button size="lg" variant="outline" className="border-2 border-[#0B1E4A] text-[#0B1E4A] hover:bg-[#0B1E4A] hover:text-white rounded-xl px-8 h-14 font-semibold">
                                    Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Image with Zoom */}
                    <div className="why-us-image-container relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#FF7A00]/20 to-[#1F77FF]/20 rounded-3xl blur-2xl" />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                            <Image
                                src="/images/lavtradeplane.png"
                                alt="LavtradePro operations"
                                fill
                                className="why-us-image-zoom object-cover"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#10B981]">
                                        <CheckCircle className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-[#0B1E4A]">1M+</p>
                                        <p className="text-gray-600 text-sm font-medium">Successful Deliveries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
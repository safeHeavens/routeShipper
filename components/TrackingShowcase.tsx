"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, CheckCircle, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function TrackingShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content slide-in
            gsap.from(".tracking-content", {
                scrollTrigger: { trigger: ".tracking-container", start: "top 70%" },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Interface slide-in
            gsap.from(".tracking-interface", {
                scrollTrigger: { trigger: ".tracking-container", start: "top 70%" },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-gray-50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 tracking-container">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Tracking Interface */}
                    <div className="tracking-interface relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#1F77FF]/20 to-[#FF7A00]/20 rounded-3xl blur-3xl" />
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8 bg-[#0B1E4A] p-4 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <Package className="h-6 w-6 text-[#FF7A00]" />
                                    <span className="text-white font-bold tracking-wider">LP-889210</span>
                                </div>
                                <span className="px-4 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold uppercase">In Transit</span>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { status: "Out for Delivery", loc: "New York, NY", time: "Today, 08:30 AM", active: true },
                                    { status: "Arrived at Facility", loc: "Chicago, IL", time: "Yesterday, 09:15 PM", active: false },
                                    { status: "Picked Up", loc: "Los Angeles, CA", time: "Mar 03, 10:00 AM", active: false },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`h-4 w-4 rounded-full ${step.active ? "bg-[#FF7A00] ring-4 ring-[#FF7A00]/20" : "bg-gray-300"}`} />
                                            {i < 2 && <div className="w-0.5 h-12 bg-gray-100 mt-2" />}
                                        </div>
                                        <div className="pb-4">
                                            <p className={`font-bold ${step.active ? "text-[#0B1E4A]" : "text-gray-400"}`}>{step.status}</p>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                <MapPin className="h-3 w-3" /> {step.loc}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                                <Clock className="h-3 w-3" /> {step.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="tracking-content order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-sm font-semibold mb-4">
              Real-Time Tracking
            </span>
                        <h2 className="text-4xl font-extrabold text-[#0B1E4A] sm:text-5xl leading-tight">
                            Track Shipments in Real Time
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            Stay ahead with LavtradePro’s advanced tracking engine. Get pinpoint location data, automated delivery status, and a full transparency history for every parcel in your network.
                        </p>

                        <div className="mt-10 space-y-4">
                            {[
                                "Live GPS tracking with pinpoint accuracy",
                                "Instant email and SMS notification system",
                                "Detailed delivery milestones and history",
                                "Mobile-optimized dashboard for on-the-go access",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-[#10B981]" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link href="/tracking">
                                <Button size="lg" className="bg-[#FF4500] hover:bg-[#FF7A00]/90 text-white rounded-xl px-10 h-14 font-semibold shadow-lg">
                                    Track Your Package <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
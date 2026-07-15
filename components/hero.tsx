"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, Zap, PackageSearch } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const [trackingNumber, setTrackingNumber] = useState("");

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;
        window.location.href = `/tracking?number=${trackingNumber}`;
    };

    const scrollToNext = () => {
        gsap.to(window, { duration: 1.5, scrollTo: "#next-section", ease: "power3.inOut" });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-bg", { scale: 1.15 }, { scale: 1, duration: 8, ease: "power2.out" });
            gsap.from(".hero-slide-up", { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#0B1E4A]">
            <div className="absolute inset-0">
                <Image src="/images/hero-bg-jet.png" alt="LavtradePro" fill priority className="hero-bg object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E4A]/80 via-[#0B1E4A]/40 to-transparent" />
            </div>

            <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-32 mt-14">
                <div className="z-10 w-full max-w-3xl">
                    <div className="hero-slide-up space-y-4">
                        <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
                            Global Logistics, <br />
                            <span className="text-[#FF7A00]">Refined for Speed.</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                            Experience end-to-end transparency with our precision-engineered shipping platform.
                            Reliable, secure, and built for the modern global economy.
                        </p>
                    </div>

                    <div className="hero-slide-up mt-12 mb-8">
                        <form onSubmit={handleTrack} className="relative max-w-lg">
                            <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl">
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Enter tracking number"
                                    className="w-full bg-transparent border-none text-white placeholder:text-white/50 px-4 py-3 outline-none text-lg"
                                />
                                <Button type="submit" className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white px-8 py-6 rounded-xl font-bold shadow-lg">
                                    <Search className="h-5 w-5 mr-2" /> Track
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* New Trust Badges Section */}
                    <div className="hidden hero-slide-up mt-10 flex items-center gap-10">
                        {[
                            { icon: PackageSearch, label: "Live Tracking", color: "text-[#FF7A00]", bg: "bg-[#FF7A00]/20" },
                            { icon: ShieldCheck, label: "Insured", color: "text-[#1F77FF]", bg: "bg-[#1F77FF]/20" },
                            { icon: Zap, label: "Express", color: "text-[#10B981]", bg: "bg-[#10B981]/20" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} backdrop-blur-sm border border-white/10`}>
                                    <item.icon className={`h-8 w-8 ${item.color}`} />
                                </div>
                                <span className="text-sm font-medium text-white/70 uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={scrollToNext} className="hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group">
                <span className="text-white/50 text-xs font-light tracking-widest uppercase">Scroll</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white animate-bounce">
                    <path d="M12 2v20M5 15l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </section>
    );
}
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Users, TrendingUp, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Define the stats structure
const statsData = [
    { icon: Globe, target: 150, suffix: "+", label: "Countries Covered" },
    { icon: Users, target: 50, suffix: "M", label: "Successful Deliveries" },
    { icon: TrendingUp, target: 99, suffix: "%", label: "On-Time Rate" },
    { icon: Package, target: 12, suffix: "K", label: "Daily Shipments" },
];

export function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Create state to hold the animated values
    const [counts, setCounts] = useState(statsData.map(() => 0));

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance animation for the container
            gsap.from(".stat-item", {
                scrollTrigger: {
                    trigger: ".stat-container",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
            });

            // 2. Counter animation using state
            statsData.forEach((stat, i) => {
                gsap.to(
                    {},
                    {
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".stat-container",
                            start: "top 80%",
                        },
                        onUpdate: function () {
                            const progress = this.progress();
                            setCounts((prev) => {
                                const newCounts = [...prev];
                                newCounts[i] = Math.floor(progress * stat.target);
                                return newCounts;
                            });
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#0B1E4A]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#FF7A00]/10 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#1F77FF]/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 stat-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">Numbers That Speak</h2>
                    <p className="mt-4 text-lg text-gray-300">Our track record of excellence in global logistics</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-item flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF7A00]/20 mb-6">
                                <stat.icon className="h-8 w-8 text-[#FF7A00]" />
                            </div>
                            <div className="text-5xl font-extrabold text-white mb-2">
                                {counts[index]}
                                <span className="text-[#FF7A00]">{stat.suffix}</span>
                            </div>
                            <p className="text-lg text-gray-300 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
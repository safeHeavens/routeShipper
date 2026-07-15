"use client";

import { Package, ShieldCheck, Zap, Clock } from "lucide-react";

const features = [
    { icon: Package, title: "Global Reach", description: "Seamless shipping to 150+ countries." },
    { icon: ShieldCheck, title: "Secure Transit", description: "Full insurance on every shipment." },
    { icon: Zap, title: "Instant Rates", description: "Real-time quotes in seconds." },
    { icon: Clock, title: "24/7 Support", description: "Logistics experts always ready." },
];

export function FeaturesBar() {
    return (
        <div className="relative z-20 -mt-24 px-6 pb-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group relative flex flex-row items-center gap-4 p-6 rounded-3xl bg-white shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 lg:flex-col lg:items-start lg:p-8"
                        >
                            {/* Top Gradient for Mobile "Hero Fade" effect */}
                            <div className="absolute top-0 left-0 w-full h-2 rounded-t-3xl bg-gradient-to-r from-[#FF7A00]/20 to-[#1F77FF]/20" />

                            <div
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 lg:h-14 lg:w-14"
                                style={{ backgroundColor: index % 2 === 0 ? "#FF7A00" : "#1F77FF" }}
                            >
                                <feature.icon className="h-7 w-7 text-white" />
                            </div>

                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-[#0B1E4A] text-base lg:text-lg">{feature.title}</h3>
                                <p className="mt-0.5 text-xs text-gray-600 leading-relaxed lg:text-sm lg:mt-2">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
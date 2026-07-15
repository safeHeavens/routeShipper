"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Target, Users, Zap, Truck, ShieldCheck, Briefcase, Network } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal", { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white min-h-screen">

            {/* Hero Section */}
            <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000"
                    alt="Logistics background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0B1E4A]/85" />
                <div className="relative z-10 text-center px-6 pt-32 md:pt-40 reveal">
                    <p className="text-[#FF7A00] font-bold tracking-widest uppercase mb-2">A LavtradePro Group Subsidiary</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">LavtradePro Shipments & Global Logistics</h1>
                </div>
            </section>

            {/* Corporate Identity Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <h2 className="text-3xl font-bold text-[#0B1E4A] mb-6 border-l-4 border-[#FF7A00] pl-4">Part of the LavtradePro Legacy</h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            LavtradePro Shipments and Global Logistics operates as the specialized logistics arm of the <strong>LavtradePro Group of Companies</strong>. By leveraging the Group’s expansive corporate infrastructure and financial strength, we provide unparalleled supply chain solutions that go beyond traditional freight forwarding.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our integration within the Group ensures that we uphold the highest standards of corporate governance, sustainability, and operational excellence, providing our clients with a robust, reliable logistics backbone for their business growth.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 reveal">
                        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" className="rounded-xl shadow-lg" alt="Logistics" />
                        <img src="https://images.unsplash.com/photo-1566576912321-d58dda7a6088?auto=format&fit=crop&q=80&w=800" className="rounded-xl shadow-lg mt-8" alt="Warehouse" />
                    </div>
                </div>
            </section>

            {/* Deep-Dive Services Info */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#0B1E4A] text-center mb-16 reveal">Comprehensive Logistics Ecosystem</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Strategic Freight Forwarding", desc: "Expert management of Air, Ocean, and Land transport integrated with global customs clearance.", icon: Network },
                            { title: "End-to-End Supply Chain", desc: "From point of origin to final delivery, our Group-backed infrastructure ensures zero visibility gaps.", icon: Briefcase },
                            { title: "Industrial Warehousing", desc: "State-of-the-art storage facilities managed by the latest inventory software for rapid fulfillment.", icon: Zap }
                        ].map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal">
                                <service.icon className="h-12 w-12 text-[#FF7A00] mb-6" />
                                <h3 className="text-xl font-bold text-[#0B1E4A] mb-4">{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "LavtradePro Group History", val: "15+ Years", icon: Award },
                    { label: "Global Presence", val: "150+ Countries", icon: Users },
                    { label: "Daily Operations", val: "500+", icon: Truck },
                    { label: "Security & Safety", val: "100%", icon: ShieldCheck },
                ].map((stat, i) => (
                    <div key={i} className="text-center reveal">
                        <stat.icon className="h-10 w-10 text-[#FF7A00] mx-auto mb-4" />
                        <div className="text-4xl font-extrabold text-[#0B1E4A]">{stat.val}</div>
                        <div className="text-gray-500 mt-2 text-sm uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </section>
        </div>
    );
}
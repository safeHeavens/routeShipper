"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const companies = ["TechCorp", "GlobalRetail", "ManuPro", "EcoShip", "FastTrade"];

export function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cta-reveal", {
                scrollTrigger: { trigger: ".cta-container", start: "top 85%" },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#0B1E4A] cta-container">
            {/* Decorative Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#FF7A00]/20 blur-[100px]" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#1F77FF]/20 blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-4xl px-6 text-center cta-reveal">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    Ready to Transform Your Logistics with LavtradePro?
                </h2>
                <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Join leading businesses that trust our network for secure, scalable global shipping. Get started today with a personalized consultation.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" className="h-14 px-8 bg-[#FF4500] hover:bg-[#FF7A00]/90 text-white rounded-xl text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/support">
                        <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white/20 text-white bg-transparent hover:bg-white/10 rounded-xl text-base font-bold transition-all duration-300">
                            Contact Support
                        </Button>
                    </Link>
                </div>

                {/* Infinite Marquee Trust Logos */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <p className="text-white/50 text-sm font-medium uppercase tracking-widest mb-8">Trusted by industry pioneers</p>

                    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                        <motion.div
                            className="flex gap-16 whitespace-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {[...companies, ...companies].map((company, i) => (
                                <span key={i} className="text-white/40 font-bold text-xl hover:text-white transition-colors cursor-default">
                  {company}
                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
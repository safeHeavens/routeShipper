"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Air Freight",
        description: "Lightning-fast international shipping.",
        image: "/images/hero-bg-jet.png"
    },
    {
        title: "Ocean Cargo",
        description: "Cost-effective bulk transportation.",
        image: "/images/ocean-freight.jpg"
    },
    {
        title: "Warehouse",
        description: "Secure storage and fulfillment.",
        image: "/images/warehouse-img.jpg"
    },
];

export function Services() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[#FF7A00] font-semibold tracking-wider uppercase text-sm">Our Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0B1E4A] mt-3">Comprehensive Logistics</h2>
                </div>

                {/* Image Cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group relative h-[450px] overflow-hidden rounded-3xl cursor-pointer"
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E4A]/90 to-transparent transition-opacity duration-300 group-hover:from-[#0B1E4A]/95" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-white/70 mb-4 opacity-1 lg:opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    {service.description}
                                </p>
                                <Link href="/shipping" className="inline-flex items-center gap-2 text-[#FF7A00] font-semibold">
                                    Learn More <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="hidden mt-16 text-center">
                    <Button size="lg" className="bg-[#0B1E4A] hover:bg-[#0B1E4A]/90 text-white rounded-xl h-14 px-10">
                        Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
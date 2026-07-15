"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, Ship, Truck, Package, Globe, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: "air", icon: Plane, title: "Air Freight", desc: "Fast and reliable air cargo services.", features: ["Express 1-3 days", "Door-to-door", "Temp-controlled"], color: "#FF7A00", img: "/images/hero-bg-jet.png" },
  { id: "ocean", icon: Ship, title: "Ocean Freight", desc: "Cost-effective sea solutions for bulk.", features: ["FCL & LCL options", "Port-to-port", "Container tracking"], color: "#1F77FF", img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1600" },
  { id: "ground", icon: Truck, title: "Ground Delivery", desc: "Comprehensive road network.", features: ["FTL & LTL", "Last-mile delivery", "Same-day options"], color: "#0B1E4A", img: "/images/ground-cargo-img.png" },
];

export default function ShippingPage() {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: servicesRef.current, start: "top 80%" }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
      <div className="bg-white">
        {/* Redesigned Hero with Background Image */}
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
              alt="Logistics Background"
              className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1E4A]/70" />

          {/* pt-32/40 offsets for fixed header */}
          <div className="relative z-10 text-center px-6 pt-32 md:pt-40">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Global Shipping Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Reliable, efficient, and transparent logistics tailored to move your business forward.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0B1E4A] text-center mb-16">Our Core Services</h2>
          <div className="space-y-16">
            {services.map((service, i) => (
                <Card key={service.id} className="service-card border-none shadow-2xl overflow-hidden rounded-3xl">
                  <div className={`grid lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className="relative h-72 lg:h-auto">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-12 lg:p-16 flex flex-col justify-center" style={{ backgroundColor: service.color }}>
                      <service.icon className="text-white h-12 w-12 mb-6" />
                      <h3 className="text-4xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-white/90 text-lg mb-8">{service.desc}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {service.features.map(f => (
                            <li key={f} className="text-white flex items-center gap-2"><CheckCircle className="h-5 w-5" /> {f}</li>
                        ))}
                      </ul>
                      <Button className="w-fit bg-white text-[#0B1E4A] hover:bg-gray-100 font-bold px-8 py-6">Get a Quote</Button>
                    </div>
                  </div>
                </Card>
            ))}
          </div>
        </section>
      </div>
  );
}
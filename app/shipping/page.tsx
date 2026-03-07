"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Plane,
  Ship,
  Truck,
  Package,
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  DollarSign,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "air",
    icon: Plane,
    title: "Air Freight",
    description: "Fast and reliable air cargo services for time-sensitive shipments worldwide.",
    features: [
      "Express delivery within 1-3 days",
      "Door-to-door service",
      "Real-time tracking",
      "Temperature-controlled options",
      "Hazardous goods handling",
      "Charter services available",
    ],
    color: "#FF7A00",
  },
  {
    id: "ocean",
    icon: Ship,
    title: "Ocean Freight",
    description: "Cost-effective sea freight solutions for large volume shipments across all major ports.",
    features: [
      "FCL & LCL options",
      "Port-to-port & door-to-door",
      "Customs clearance support",
      "Container tracking",
      "Refrigerated containers",
      "Project cargo handling",
    ],
    color: "#1F77FF",
  },
  {
    id: "ground",
    icon: Truck,
    title: "Ground Delivery",
    description: "Comprehensive ground transportation network across all major routes in North America and Europe.",
    features: [
      "Full truckload (FTL)",
      "Less than truckload (LTL)",
      "Last-mile delivery",
      "Same-day options",
      "Scheduled deliveries",
      "White-glove service",
    ],
    color: "#0B1E4A",
  },
  {
    id: "warehousing",
    icon: Package,
    title: "Warehousing",
    description: "State-of-the-art storage facilities with advanced inventory management systems.",
    features: [
      "Secure storage facilities",
      "Inventory management",
      "Pick and pack services",
      "Order fulfillment",
      "Cross-docking",
      "Returns processing",
    ],
    color: "#FF7A00",
  },
  {
    id: "international",
    icon: Globe,
    title: "International Shipping",
    description: "Seamless cross-border shipping with comprehensive customs clearance support.",
    features: [
      "150+ countries coverage",
      "Customs brokerage",
      "Import/export documentation",
      "Duty & tax calculation",
      "Trade compliance",
      "Multi-modal solutions",
    ],
    color: "#1F77FF",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "99.8% on-time delivery rate with real-time updates",
  },
  {
    icon: Shield,
    title: "Secure Handling",
    description: "Comprehensive insurance and secure handling protocols",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden fees",
  },
];

export default function ShippingPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".header-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Service cards animation
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        }
      );

      // Benefits animation
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".benefits-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="header-content text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Shipping Services
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive logistics solutions designed to meet your unique shipping
              requirements. From air freight to warehousing, we have you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="benefits-section bg-[#FF7A00] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="benefit-card flex items-center gap-4 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service.id}
                id={service.id}
                className="service-card overflow-hidden border-0 shadow-lg scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div
                    className={`flex flex-col justify-center p-8 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                    style={{ backgroundColor: service.color }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">{service.title}</h2>
                    <p className="mt-4 text-lg text-white/90">{service.description}</p>
                    <Link href="/signup" className="mt-6">
                      <Button className="gap-2 bg-white text-[#0B1E4A] hover:bg-gray-100">
                        Get a Quote
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardContent className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h3 className="text-xl font-semibold text-[#0B1E4A]">Key Features</h3>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A00]" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0B1E4A" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our logistics experts are ready to design a tailored shipping solution
            that meets your specific business needs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/support">
              <Button
                size="lg"
                className="min-w-[180px] text-white"
                style={{ backgroundColor: "#FF7A00" }}
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/tracking">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[180px] border-white text-white hover:bg-white/10"
              >
                Track Shipment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

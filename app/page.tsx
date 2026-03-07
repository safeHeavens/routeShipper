"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Plane,
  Ship,
  Truck,
  Package,
  Globe,
  Clock,
  Shield,
  Search,
  ArrowRight,
  Star,
  Users,
  MapPin,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast and reliable air cargo services for time-sensitive shipments worldwide.",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description: "Cost-effective sea freight solutions for large volume shipments.",
  },
  {
    icon: Truck,
    title: "Ground Delivery",
    description: "Comprehensive ground transportation network across all major routes.",
  },
  {
    icon: Package,
    title: "Warehousing",
    description: "State-of-the-art storage facilities with inventory management.",
  },
  {
    icon: Globe,
    title: "International",
    description: "Seamless cross-border shipping with customs clearance support.",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Countries Served" },
  { value: 50, suffix: "M+", label: "Packages Delivered" },
  { value: 99.8, suffix: "%", label: "On-Time Delivery" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStartup Inc.",
    content: "RouteShipper has transformed our supply chain. Their reliability and speed are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Operations Director, GlobalTrade Co.",
    content: "The tracking system is phenomenal. We always know exactly where our shipments are in real-time.",
    rating: 5,
  },
  {
    name: "Emily Williams",
    role: "Logistics Manager, RetailMax",
    content: "Excellent customer service and competitive pricing. Highly recommend for international shipping.",
    rating: 5,
  },
];

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      // Services cards animation
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 60 },
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

      // Stats counter animation
      const statElements = document.querySelectorAll(".stat-value");
      statElements.forEach((el, index) => {
        const target = stats[index].value;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: target % 1 === 0 ? 1 : 0.1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      });

      // Testimonials animation
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      window.location.href = `/tracking?number=${trackingNumber}`;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#0B1E4A] via-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#FF7A00]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#1F77FF]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="hero-content text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="block">RouteShipper</span>
                <span className="block text-[#FF7A00]">Global Logistics</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 lg:text-xl">
                Delivering excellence worldwide. Fast, reliable, and secure shipping solutions for businesses of all sizes.
              </p>
              
              {/* Tracking Form */}
              <form onSubmit={handleTrack} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="h-12 pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 px-8 text-white"
                  style={{ backgroundColor: "#FF7A00" }}
                >
                  Track Package
                </Button>
              </form>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#FF7A00]" />
                  <span>Free Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="h-5 w-5 text-[#FF7A00]" />
                  <span>Insured Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="h-5 w-5 text-[#FF7A00]" />
                  <span>On-Time Guarantee</span>
                </div>
              </div>
            </div>

            <div className="hero-image hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF7A00]/20 to-[#1F77FF]/20 blur-2xl" />
                <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/10 p-6 text-center">
                      <Plane className="mx-auto h-10 w-10 text-[#FF7A00]" />
                      <p className="mt-2 text-sm font-medium text-white">Air Freight</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-6 text-center">
                      <Ship className="mx-auto h-10 w-10 text-[#1F77FF]" />
                      <p className="mt-2 text-sm font-medium text-white">Ocean Freight</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-6 text-center">
                      <Truck className="mx-auto h-10 w-10 text-[#FF7A00]" />
                      <p className="mt-2 text-sm font-medium text-white">Ground</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-6 text-center">
                      <Globe className="mx-auto h-10 w-10 text-[#1F77FF]" />
                      <p className="mt-2 text-sm font-medium text-white">Global</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0B1E4A] sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive logistics solutions tailored to your needs
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="service-card group cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-[#FF7A00] hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl transition-colors group-hover:bg-[#FF7A00]"
                    style={{ backgroundColor: index % 2 === 0 ? "#0B1E4A" : "#1F77FF" }}
                  >
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0B1E4A]">{service.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shipping">
              <Button
                variant="outline"
                className="gap-2 border-[#0B1E4A] text-[#0B1E4A] hover:bg-[#0B1E4A] hover:text-white"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28" style={{ backgroundColor: "#0B1E4A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#FF7A00] sm:text-5xl">
                  <span className="stat-value">{stat.value}</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="mt-2 text-lg text-white">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0B1E4A] sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Trusted by thousands of businesses worldwide
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="testimonial-card border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#FF7A00] text-[#FF7A00]" />
                    ))}
                  </div>
                  <p className="mt-4 text-gray-600 leading-relaxed">{`"${testimonial.content}"`}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1E4A]">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0B1E4A]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 lg:py-28 bg-gradient-to-r from-[#FF7A00] to-[#FF9A3C]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="cta-content">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Ship with Confidence?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of businesses that trust RouteShipper for their logistics needs.
              Get started today with a free quote.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="min-w-[180px] bg-white text-[#FF7A00] hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/support">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[180px] border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

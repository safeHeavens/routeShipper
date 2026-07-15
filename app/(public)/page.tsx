"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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
  CheckCircle,
  Zap,
  HeadphonesIcon,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  Award,
  Target,
  TrendingUp,
  Building2,
  Boxes,
} from "lucide-react";
import {Hero} from "@/components/hero";
import {FeaturesBar} from "@/components/FeaturesBar";
import {Services} from "@/components/Services";
import {WhyChooseUs} from "@/components/WhyChooseUs";
import {Stats} from "@/components/Stats";
import {TrackingShowcase} from "@/components/TrackingShowcase";
import {Testimonials} from "@/components/Testimonials";
import {CallToAction} from "@/components/CallToAction";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Express air cargo with next-day delivery options for urgent shipments worldwide.",
    color: "#FF7A00",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description: "Cost-effective sea freight for FCL and LCL shipments across major trade lanes.",
    color: "#1F77FF",
  },
  {
    icon: Truck,
    title: "Ground Delivery",
    description: "Nationwide ground transportation with real-time GPS tracking and updates.",
    color: "#0B1E4A",
  },
  {
    icon: Package,
    title: "Warehousing",
    description: "State-of-the-art storage with inventory management and fulfillment services.",
    color: "#FF7A00",
  },
  {
    icon: Globe,
    title: "International",
    description: "Seamless cross-border shipping with customs brokerage and documentation.",
    color: "#1F77FF",
  },
  {
    icon: Boxes,
    title: "Supply Chain",
    description: "End-to-end supply chain solutions optimized for your business needs.",
    color: "#0B1E4A",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Countries Served", icon: Globe },
  { value: 50, suffix: "M+", label: "Packages Delivered", icon: Package },
  { value: 99.8, suffix: "%", label: "On-Time Delivery", icon: Clock },
  { value: 24, suffix: "/7", label: "Support Available", icon: HeadphonesIcon },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStartup Inc.",
    company: "TechStartup Inc.",
    content: "RouteShipper has transformed our supply chain operations. Their reliability and speed are unmatched. We've seen a 40% improvement in delivery times since partnering with them.",
    rating: 5,
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    company: "GlobalTrade Co.",
    content: "The tracking system is phenomenal. We always know exactly where our shipments are in real-time. Customer satisfaction has increased dramatically thanks to RouteShipper.",
    rating: 5,
    image: "/images/testimonial-2.jpg",
  },
  {
    name: "Emily Williams",
    role: "Logistics Manager",
    company: "RetailMax",
    content: "Excellent customer service and competitive pricing. The team goes above and beyond to ensure our shipments arrive on time. Highly recommend for international shipping needs.",
    rating: 5,
    image: "/images/testimonial-3.jpg",
  },
  {
    name: "David Rodriguez",
    role: "Supply Chain VP",
    company: "ManuTech Industries",
    content: "We've been using RouteShipper for over 3 years now. Their warehousing solutions and inventory management have streamlined our entire operation significantly.",
    rating: 5,
    image: "/images/testimonial-4.jpg",
  },
  {
    name: "Jennifer Park",
    role: "Founder",
    company: "EcoShop Online",
    content: "As a growing e-commerce business, we needed a logistics partner that could scale with us. RouteShipper exceeded all expectations with their flexible solutions.",
    rating: 5,
    image: "/images/testimonial-5.jpg",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Express delivery options with guaranteed time-definite services.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive cargo insurance for complete peace of mind.",
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    description: "Live GPS tracking with instant notifications and updates.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock.",
  },
];

const industries = [
  { name: "E-Commerce", icon: Building2 },
  { name: "Healthcare", icon: Target },
  { name: "Automotive", icon: Truck },
  { name: "Technology", icon: Zap },
  { name: "Manufacturing", icon: Boxes },
  { name: "Retail", icon: Package },
];

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const trackingShowcaseRef = useRef<HTMLDivElement>(null);

  // Testimonial carousel autoplay
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        ".hero-tracking-form",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-trust-badges > div",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.8, ease: "power2.out" }
      );

      // Features section animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
          },
        }
      );

      // Services cards animation
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        }
      );

      // Why Us section animation
      gsap.fromTo(
        ".why-us-content",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyUsRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".why-us-image",
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyUsRef.current,
            start: "top 75%",
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
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: target % 1 === 0 ? 1 : 0.1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      });

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      // Tracking showcase animation
      gsap.fromTo(
        ".tracking-content",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackingShowcaseRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".tracking-image",
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackingShowcaseRef.current,
            start: "top 75%",
          },
        }
      );

      // Industries animation
      gsap.fromTo(
        ".industry-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: industriesRef.current,
            start: "top 85%",
          },
        }
      );

      // Testimonials animation
      gsap.fromTo(
        ".testimonial-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      {/* Hero Section with Background Image */}
      <Hero />

      {/* Quick Features Bar */}
      <FeaturesBar />

      {/* Services Section */}
     <Services />

      {/* Why Choose Us - Two Column Section */}
      <WhyChooseUs />

      {/* Stats Section */}
      <Stats />

      {/* Tracking Showcase - Two Column Section (Reversed) */}
      <TrackingShowcase />

      {/* Industries Section */}
      <section ref={industriesRef} className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0B1E4A]/10 text-[#0B1E4A] text-sm font-semibold mb-4">
              Industries We Serve
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1E4A] sm:text-4xl">
              Tailored Solutions for Every Industry
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From e-commerce to healthcare, we provide specialized logistics solutions designed for your industry&apos;s unique requirements.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="industry-item group flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-[#0B1E4A] transition-all duration-300 cursor-pointer"
              >
                <industry.icon className="h-10 w-10 text-[#0B1E4A] group-hover:text-[#FF7A00] transition-colors duration-300" />
                <span className="mt-3 font-semibold text-[#0B1E4A] group-hover:text-white text-center transition-colors duration-300">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <Testimonials />

      {/* CTA Section */}
      <CallToAction />

    </div>
  );
}

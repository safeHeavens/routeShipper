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
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-freight.jpg"
            alt="Global logistics and freight operations"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E4A]/95 via-[#0B1E4A]/85 to-[#0B1E4A]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E4A]/50 to-transparent" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FF7A00]/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-[#1F77FF]/15 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ businesses worldwide</span>
            </div>

            <div className="hero-content">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
                <span className="block text-balance">Ship Smarter.</span>
                <span className="block text-[#FF7A00] mt-2">Deliver Faster.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-200 lg:text-xl max-w-2xl leading-relaxed">
                Experience world-class logistics with RouteShipper. From express air freight to cost-effective ocean shipping, we deliver your goods safely and on time, every time.
              </p>
            </div>
            
            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="hero-tracking-form mt-10 flex flex-col gap-4 sm:flex-row sm:max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-14 pl-12 pr-4 bg-white/95 backdrop-blur-sm border-0 text-[#0B1E4A] placeholder:text-gray-500 text-base rounded-xl shadow-lg focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#FF7A00" }}
              >
                Track Package
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {/* Trust badges */}
            <div className="hero-trust-badges mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7A00]/20">
                  <CheckCircle className="h-5 w-5 text-[#FF7A00]" />
                </div>
                <span className="font-medium">Free Tracking</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F77FF]/20">
                  <Shield className="h-5 w-5 text-[#1F77FF]" />
                </div>
                <span className="font-medium">Insured Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981]/20">
                  <Clock className="h-5 w-5 text-[#10B981]" />
                </div>
                <span className="font-medium">On-Time Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Quick Features Bar */}
      <section ref={featuresRef} className="py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF7A00]/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: index % 2 === 0 ? "#FF7A00" : "#1F77FF" }}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1E4A] text-lg">{feature.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1E4A] sm:text-4xl lg:text-5xl text-balance">
              Comprehensive Logistics Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              From express air freight to complex supply chain management, we offer end-to-end solutions tailored to your business needs.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.title}
                className="service-card group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div className="p-8">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: service.color }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#0B1E4A]">{service.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="px-8 pb-8">
                    <Link 
                      href="/shipping" 
                      className="inline-flex items-center gap-2 text-[#FF7A00] font-semibold group-hover:gap-3 transition-all duration-300"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shipping">
              <Button
                size="lg"
                className="gap-2 bg-[#0B1E4A] text-white hover:bg-[#0B1E4A]/90 rounded-xl px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore All Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Two Column Section */}
      <section ref={whyUsRef} className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Content */}
            <div className="why-us-content">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F77FF]/10 text-[#1F77FF] text-sm font-semibold mb-4">
                Why Choose RouteShipper
              </span>
              <h2 className="text-3xl font-extrabold text-[#0B1E4A] sm:text-4xl lg:text-5xl text-balance">
                Your Trusted Partner in Global Logistics
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                With decades of experience and a global network spanning 150+ countries, RouteShipper delivers excellence in every shipment. Our commitment to reliability, speed, and customer satisfaction sets us apart.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { icon: Award, title: "Industry-Leading Reliability", desc: "99.8% on-time delivery rate across all services" },
                  { icon: Globe, title: "Global Network", desc: "Strategic partnerships in 150+ countries" },
                  { icon: TrendingUp, title: "Scalable Solutions", desc: "From small packages to full container loads" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF7A00]">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1E4A] text-lg">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-2 border-[#0B1E4A] text-[#0B1E4A] hover:bg-[#0B1E4A] hover:text-white rounded-xl px-8 h-14 text-base font-semibold transition-all duration-300"
                  >
                    Learn More About Us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="why-us-image relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FF7A00]/20 to-[#1F77FF]/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-freight.jpg"
                  alt="RouteShipper logistics operations"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#10B981]">
                      <CheckCircle className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-[#0B1E4A]">50M+</p>
                      <p className="text-gray-600 text-sm">Successful Deliveries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: "#0B1E4A" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#FF7A00]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#1F77FF]/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Numbers That Speak
            </h2>
            <p className="mt-4 text-lg text-gray-300">Our track record of excellence in global logistics</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FF7A00]">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-white sm:text-5xl">
                  <span className="stat-value">{stat.value}</span>
                  <span className="text-[#FF7A00]">{stat.suffix}</span>
                </div>
                <p className="mt-3 text-lg text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Showcase - Two Column Section (Reversed) */}
      <section ref={trackingShowcaseRef} className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <div className="tracking-image relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1F77FF]/20 to-[#FF7A00]/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                {/* Mock Tracking Interface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0B1E4A] rounded-xl">
                    <div className="flex items-center gap-3">
                      <Package className="h-6 w-6 text-[#FF7A00]" />
                      <span className="text-white font-semibold">RS-7834521</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#10B981] text-white text-sm font-medium">In Transit</span>
                  </div>
                  
                  <div className="space-y-3 p-4">
                    {[
                      { status: "Delivered", location: "New York, NY", time: "Today, 2:30 PM", active: false },
                      { status: "Out for Delivery", location: "New York, NY", time: "Today, 8:00 AM", active: true },
                      { status: "In Transit", location: "Chicago, IL", time: "Yesterday, 6:45 PM", active: false },
                      { status: "Picked Up", location: "Los Angeles, CA", time: "Mar 3, 10:00 AM", active: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`h-4 w-4 rounded-full ${step.active ? "bg-[#FF7A00]" : i === 0 ? "bg-[#10B981]" : "bg-gray-300"}`} />
                          {i < 3 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${step.active ? "text-[#FF7A00]" : "text-[#0B1E4A]"}`}>{step.status}</p>
                          <p className="text-sm text-gray-600">{step.location}</p>
                          <p className="text-xs text-gray-400">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="tracking-content order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-sm font-semibold mb-4">
                Real-Time Tracking
              </span>
              <h2 className="text-3xl font-extrabold text-[#0B1E4A] sm:text-4xl lg:text-5xl text-balance">
                Track Your Shipments in Real Time
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Stay informed with our advanced tracking system. Get instant updates on your shipment&apos;s location, estimated delivery time, and any changes along the way.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Live GPS tracking with pinpoint accuracy",
                  "Instant email and SMS notifications",
                  "Detailed delivery timeline and history",
                  "Easy-to-use mobile app for tracking on the go",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#10B981] shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/tracking">
                  <Button
                    size="lg"
                    className="gap-2 bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 rounded-xl px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Track Your Package
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section ref={testimonialsRef} className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="testimonial-section">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-sm font-semibold mb-4">
                Client Testimonials
              </span>
              <h2 className="text-3xl font-extrabold text-[#0B1E4A] sm:text-4xl lg:text-5xl text-balance">
                Trusted by Industry Leaders
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See what our clients have to say about their experience with RouteShipper.
              </p>
            </div>

            {/* Carousel */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="max-w-4xl mx-auto">
                        <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                          <CardContent className="p-0">
                            <div className="grid lg:grid-cols-5">
                              {/* Quote Section */}
                              <div className="lg:col-span-3 p-10 lg:p-14">
                                <Quote className="h-12 w-12 text-[#FF7A00]/30 mb-6" />
                                <div className="flex gap-1 mb-6">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 fill-[#FF7A00] text-[#FF7A00]" />
                                  ))}
                                </div>
                                <p className="text-xl lg:text-2xl text-[#0B1E4A] leading-relaxed font-medium">
                                  &ldquo;{testimonial.content}&rdquo;
                                </p>
                                <div className="mt-10">
                                  <p className="font-bold text-[#0B1E4A] text-lg">{testimonial.name}</p>
                                  <p className="text-gray-600">{testimonial.role}</p>
                                  <p className="text-[#FF7A00] font-semibold">{testimonial.company}</p>
                                </div>
                              </div>
                              {/* Image Section */}
                              <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] p-10 lg:p-14 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-white/10 border-2 border-white/20">
                                    <Users className="h-12 w-12 text-white" />
                                  </div>
                                  <div className="mt-6">
                                    <MapPin className="h-5 w-5 text-[#FF7A00] mx-auto mb-2" />
                                    <p className="text-white/80 text-sm">
                                      {testimonial.company}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl border border-gray-100 text-[#0B1E4A] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl border border-gray-100 text-[#0B1E4A] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 mt-10">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? "w-10 bg-[#FF7A00]" 
                        : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00] via-[#FF8C1A] to-[#FF9A3C]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="cta-content">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-balance">
              Ready to Transform Your Logistics?
            </h2>
            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses that trust RouteShipper for their global shipping needs. Get started today with a free consultation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="min-w-[200px] h-14 bg-white text-[#FF7A00] hover:bg-gray-100 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] h-14 border-2 border-white text-white bg-transparent hover:bg-white/10 rounded-xl text-base font-bold transition-all duration-300"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Trust Logos */}
            <div className="mt-16 pt-10 border-t border-white/20">
              <p className="text-white/70 text-sm mb-6">Trusted by leading companies worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
                {["TechCorp", "GlobalRetail", "ManuPro", "EcoShip", "FastTrade"].map((company) => (
                  <span key={company} className="text-white font-bold text-lg">{company}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

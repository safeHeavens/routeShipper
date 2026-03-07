"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Plane,
  Building,
  ArrowRight,
} from "lucide-react";

// Mock tracking data
const mockTrackingData = {
  trackingNumber: "RS-2024-78945612",
  status: "In Transit",
  statusColor: "#FF7A00",
  origin: "Los Angeles, CA, USA",
  destination: "New York, NY, USA",
  estimatedDelivery: "March 8, 2026",
  weight: "15.5 kg",
  service: "Express Air Freight",
  shipper: "TechCorp Industries",
  receiver: "Global Retail Inc.",
  timeline: [
    {
      date: "Mar 6, 2026",
      time: "08:45 AM",
      status: "In Transit",
      location: "Chicago, IL - Distribution Center",
      description: "Package is on the way to destination",
      icon: Truck,
      active: true,
    },
    {
      date: "Mar 5, 2026",
      time: "11:30 PM",
      status: "Arrived at Hub",
      location: "Chicago, IL - O'Hare International Airport",
      description: "Package arrived at sorting facility",
      icon: Building,
      active: false,
    },
    {
      date: "Mar 5, 2026",
      time: "06:15 PM",
      status: "In Flight",
      location: "En Route to Chicago",
      description: "Package departed on flight RS-2847",
      icon: Plane,
      active: false,
    },
    {
      date: "Mar 5, 2026",
      time: "02:00 PM",
      status: "Departed",
      location: "Los Angeles, CA - LAX Airport",
      description: "Package departed origin facility",
      icon: Plane,
      active: false,
    },
    {
      date: "Mar 5, 2026",
      time: "10:30 AM",
      status: "Picked Up",
      location: "Los Angeles, CA",
      description: "Package picked up from sender",
      icon: Package,
      active: false,
    },
    {
      date: "Mar 4, 2026",
      time: "03:45 PM",
      status: "Label Created",
      location: "Los Angeles, CA",
      description: "Shipping label created",
      icon: CheckCircle,
      active: false,
    },
  ],
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialNumber = searchParams.get("number") || "";
  
  const [trackingNumber, setTrackingNumber] = useState(initialNumber);
  const [searchedNumber, setSearchedNumber] = useState(initialNumber);
  const [showResults, setShowResults] = useState(!!initialNumber);
  const headerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".tracking-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );

        gsap.fromTo(
          ".timeline-item",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" }
        );
      }, resultsRef);

      return () => ctx.revert();
    }
  }, [showResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearchedNumber(trackingNumber);
      setShowResults(true);
    }
  };

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
              Track Your Shipment
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Enter your tracking number to get real-time updates on your shipment
              location and delivery status.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col gap-3 sm:flex-row max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter tracking number (e.g., RS-2024-78945612)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-14 pl-12 text-lg bg-white border-0 focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 text-lg text-white"
                style={{ backgroundColor: "#FF7A00" }}
              >
                Track Package
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section ref={resultsRef} className="py-12 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Shipment Details */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="tracking-card border-0 shadow-lg">
                  <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Shipment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-semibold text-[#0B1E4A]">
                        {mockTrackingData.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge
                        className="mt-1 text-white"
                        style={{ backgroundColor: mockTrackingData.statusColor }}
                      >
                        {mockTrackingData.status}
                      </Badge>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full bg-[#1F77FF]" />
                          <div className="w-0.5 h-10 bg-gray-200" />
                          <div className="h-3 w-3 rounded-full bg-[#FF7A00]" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Origin</p>
                            <p className="font-medium text-[#0B1E4A]">
                              {mockTrackingData.origin}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Destination</p>
                            <p className="font-medium text-[#0B1E4A]">
                              {mockTrackingData.destination}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium text-[#0B1E4A]">
                          {mockTrackingData.service}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium text-[#0B1E4A]">
                          {mockTrackingData.weight}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="tracking-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#0B1E4A]">
                      <Clock className="h-5 w-5 text-[#FF7A00]" />
                      Estimated Delivery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#FF7A00]">
                      {mockTrackingData.estimatedDelivery}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Expected by end of business day
                    </p>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="tracking-card border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-[#FF7A00]" />
                      <p className="font-medium">Live Tracking Map</p>
                      <p className="text-sm text-gray-300">Chicago, IL - In Transit</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="tracking-card border-0 shadow-lg">
                  <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                    <CardTitle>Shipment Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="relative">
                      {mockTrackingData.timeline.map((event, index) => (
                        <div
                          key={index}
                          className={`timeline-item relative flex gap-6 ${
                            index !== mockTrackingData.timeline.length - 1 ? "pb-8" : ""
                          }`}
                        >
                          {/* Timeline line */}
                          {index !== mockTrackingData.timeline.length - 1 && (
                            <div
                              className="absolute left-5 top-10 w-0.5 h-full"
                              style={{
                                backgroundColor: event.active ? "#FF7A00" : "#E2E8F0",
                              }}
                            />
                          )}

                          {/* Icon */}
                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              event.active
                                ? "bg-[#FF7A00] text-white ring-4 ring-[#FF7A00]/20"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <event.icon className="h-5 w-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4
                                className={`font-semibold ${
                                  event.active ? "text-[#FF7A00]" : "text-[#0B1E4A]"
                                }`}
                              >
                                {event.status}
                              </h4>
                              {event.active && (
                                <Badge className="bg-[#FF7A00]/10 text-[#FF7A00] hover:bg-[#FF7A00]/20">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{event.description}</p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.date} at {event.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0B1E4A]">Need Help?</h2>
          <p className="mt-2 text-gray-600">
            {"Can't find your tracking information? Our support team is here to help."}
          </p>
          <Button
            className="mt-6 gap-2 text-white"
            style={{ backgroundColor: "#0B1E4A" }}
            asChild
          >
            <a href="/support">
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]" />
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}

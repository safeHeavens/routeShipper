"use client";

import { useEffect, useRef, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
  Loader2,
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import ShipmentMap from "@/app/(public)/tracking/ShipmentMap";

const getIconForStatus = (iconType: string) => {
  switch (iconType?.toLowerCase()) {
    case "truck": return Truck;
    case "building": return Building;
    case "plane": return Plane;
    case "package": return Package;
    case "check": return CheckCircle;
    default: return Package;
  }
};



function TrackingContent() {
  const searchParams = useSearchParams();
  const initialNumber = searchParams.get("number") || "";

  const [trackingNumber, setTrackingNumber] = useState(initialNumber);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".header-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  const fetchShipmentData = useCallback(async (numberToTrack: string, isSilent = false) => {
    if (!isSilent) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const { data: shipment, error: shipError } = await supabase
          .from("shipments")
          .select("*")
          .eq("tracking_number", numberToTrack.trim())
          .maybeSingle();

      if (shipError || !shipment) throw new Error("Tracking number not found.");

      const { data: updates, error: updateError } = await supabase
          .from("shipment_updates")
          .select("*")
          .eq("shipment_id", shipment.id)
          .order("created_at", { ascending: false });

      setTrackingData(shipment);
      setTimeline(updates || []);
    } catch (err: any) {
      if (!isSilent) {
        setError(err.message);
        setTrackingData(null);
        setTimeline([]);
      }
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (trackingData && resultsRef.current) {
      // 1. Auto-scroll to the results section
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 2. GSAP Animations
      const ctx = gsap.context(() => {
        gsap.fromTo(".tracking-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        gsap.fromTo(".timeline-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" });
      }, resultsRef);
      return () => ctx.revert();
    }
  }, [trackingData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) fetchShipmentData(trackingNumber);
  };

  return (
      <div className="bg-white min-h-screen">
        <section ref={headerRef} className="relative py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                alt="Freight Logistics"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0B1E4A]/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="header-content text-center mt-10">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Track Your <span className="text-[#FF4500]">LavtradePro</span> Shipment
              </h1>
              <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
                Enter your tracking number below to get real-time status updates on your global cargo.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                      type="text"
                      placeholder="e.g. LPS-889A210344Y"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      disabled={isLoading}
                      className="h-16 pl-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/20 transition-all"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="h-16 px-10 text-lg bg-[#FF4500] hover:bg-[#FF7A00]/90 text-white rounded-xl font-bold shadow-xl transition-transform active:scale-95">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Track Package"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {trackingData && (
            <section ref={resultsRef} className="py-12 lg:py-20 bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Shipment Details</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div><p className="text-sm text-gray-500">Tracking Number</p><p className="font-semibold text-[#0B1E4A]">{trackingData.tracking_number}</p></div>
                        <div><Badge className="text-white" style={{ backgroundColor: trackingData.status_color || "#FF7A00" }}>{trackingData.status}</Badge></div>
                        <div className="border-t pt-4">
                          <div className="flex gap-4">
                            {/* Route Indicator */}
                            <div className="relative flex flex-col items-center pt-1">
                              {/* Origin */}
                              <div className="z-10 h-4 w-4 rounded-full bg-[#1F77FF] border-2 border-white shadow" />

                              {/* Line to current */}
                              <div className="w-1 h-12 bg-[#1F77FF]" />

                              {/* Current */}
                              <div className="relative z-10">
                                <div className="absolute inset-0 rounded-full bg-[#FF7A00] animate-ping opacity-40" />
                                <div className="relative h-5 w-5 rounded-full bg-[#FF7A00] border-2 border-white shadow-lg" />
                              </div>

                              {/* Line to destination */}
                              <div className="w-1 h-12 bg-gray-300" />

                              {/* Destination */}
                              <div className="h-4 w-4 rounded-full bg-gray-300 border-2 border-white shadow" />
                            </div>

                            {/* Route Details */}
                            <div className="flex-1 space-y-8">
                              <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                  Origin
                                </p>
                                <p className="font-semibold text-[#0B1E4A]">
                                  {trackingData.origin}
                                </p>
                              </div>

                              <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                                <p className="text-xs uppercase tracking-wide text-[#FF7A00] font-semibold">
                                  Current Location
                                </p>

                                <p className="font-bold text-[#0B1E4A]">
                                  {trackingData.event_location || "Location not available"}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  Shipment is currently here.
                                </p>
                              </div>

                              <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                  Destination
                                </p>
                                <p className="font-semibold text-[#0B1E4A]">
                                  {trackingData.destination}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader><CardTitle className="flex items-center gap-2 text-[#0B1E4A]"><Clock className="h-5 w-5 text-[#FF7A00]" /> Estimated Delivery</CardTitle></CardHeader>
                      <CardContent><p className="text-2xl font-bold text-[#FF7A00]">{trackingData.estimated_delivery || "Pending"}</p></CardContent>
                    </Card>
                    {/*
                    <Card className="tracking-card border-0 shadow-lg overflow-hidden h-[350px] opacity-0">
                      <iframe width="100%" height="100%" style={{ border: 0 }} src={`https://maps.google.com/maps?q=${encodeURIComponent(trackingData.destination)}&t=&z=13&output=embed`} />
                    </Card>
                    */}
                    <Card className="tracking-card border-0 shadow-lg overflow-hidden">
                      <ShipmentMap
                          origin={trackingData.origin}
                          current={
                              trackingData.event_location || trackingData.origin
                          }
                          destination={trackingData.destination}
                      />
                    </Card>

                  </div>

                  <div className="lg:col-span-2">
                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg flex justify-between items-center">
                        <CardTitle>Shipment Timeline</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="relative">
                          {timeline.map((event, index) => {
                            const Icon = getIconForStatus(event.icon_type);
                            const isLast = index === timeline.length - 1;
                            return (
                                <div key={event.id} className="timeline-item relative flex gap-6 pb-10">
                                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400"><Icon className="h-5 w-5" /></div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-[#0B1E4A]">{event.status}</h4>
                                    <p className="text-gray-500 text-sm">{event.description}</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{event.location}</p>
                                  </div>
                                </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
        )}
      </div>
  );
}

export default function TrackingPage() {
  return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#FF7A00]" /></div>}>
        <TrackingContent />
      </Suspense>
  );
}
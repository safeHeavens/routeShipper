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
  ArrowRight,
  Loader2,
} from "lucide-react";

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
    if (!trackingData?.tracking_number) return;

    const channel = supabase.channel(`tracking-${trackingData.tracking_number}`)
        .on('broadcast', { event: 'update' }, () => {
          fetchShipmentData(trackingData.tracking_number, true);
        })
        .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [trackingData?.tracking_number, fetchShipmentData]);

  useEffect(() => {
    if (initialNumber) fetchShipmentData(initialNumber);
  }, [initialNumber, fetchShipmentData]);

  useEffect(() => {
    if (trackingData && resultsRef.current) {
      const ctx = gsap.context(() => {
        if (gsap.getProperty(".tracking-card", "opacity") === 0) {
          gsap.fromTo(".tracking-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
          gsap.fromTo(".timeline-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" });
        }
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
        <section ref={headerRef} className="bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="header-content text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">Track Your Shipment</h1>
              <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                      type="text"
                      placeholder="Enter tracking number..."
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      disabled={isLoading}
                      className="h-14 pl-12 text-lg bg-white border-0 text-black"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="h-14 px-8 text-lg bg-[#FF7A00]">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Track Now"}
                </Button>
              </form>
              {error && <div className="mt-4 text-red-400 bg-red-900/20 py-3 px-4 rounded-md border border-red-500/30 max-w-2xl mx-auto">{error}</div>}
            </div>
          </div>
        </section>

        {trackingData && (
            <section ref={resultsRef} className="py-12 lg:py-20 bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">

                  <div className="lg:col-span-1 space-y-6">
                    {/* Shipment Details */}
                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Shipment Details</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Tracking Number</p>
                          <p className="font-semibold text-[#0B1E4A]">{trackingData.tracking_number}</p>
                        </div>
                        <div>
                          <Badge className="text-white" style={{ backgroundColor: trackingData.status_color || "#FF7A00" }}>{trackingData.status}</Badge>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="h-3 w-3 rounded-full bg-[#1F77FF]" />
                              <div className="w-0.5 h-10 bg-gray-200" />
                              <div className="h-3 w-3 rounded-full bg-[#FF7A00]" />
                            </div>
                            <div className="flex-1 space-y-4">
                              <div><p className="text-sm text-gray-500">Origin</p><p className="font-medium text-[#0B1E4A]">{trackingData.origin}</p></div>
                              <div><p className="text-sm text-gray-500">Destination</p><p className="font-medium text-[#0B1E4A]">{trackingData.destination}</p></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Estimated Delivery - FIXED MAPPING */}
                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#0B1E4A]">
                          <Clock className="h-5 w-5 text-[#FF7A00]" />
                          Estimated Delivery
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-[#FF7A00]">
                          {/* Supports both camelCase and snake_case from DB */}
                          {trackingData.estimated_delivery || trackingData.estimatedDelivery || "Pending Schedule"}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Map - FIXED REJECTION ISSUE */}
                    <Card className="tracking-card border-0 shadow-lg overflow-hidden h-[350px] opacity-0">
                      <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(trackingData.destination)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      />
                    </Card>
                  </div>

                  {/* Timeline Column */}
                  <div className="lg:col-span-2">
                    <Card className="tracking-card border-0 shadow-lg opacity-0">
                      <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg flex justify-between items-center">
                        <CardTitle>Shipment Timeline</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-[10px] font-bold uppercase opacity-70">Live Updates</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="relative">
                          {timeline.map((event, index) => {
                            const Icon = getIconForStatus(event.icon_type);
                            const isLast = index === timeline.length - 1;

                            return (
                                <div key={event.id} className={`timeline-item relative flex gap-6 ${!isLast ? "pb-10" : ""}`}>
                                  {/* UPWARD FLOWING LINE */}
                                  {!isLast && (
                                      <div className="absolute left-[19px] top-10 w-[2px] h-full bg-gray-100 overflow-hidden">
                                        <div className="absolute inset-0 w-full h-full animate-travel-line bg-gradient-to-t from-transparent via-[#FF7A00] to-[#FF7A00]" />
                                      </div>
                                  )}

                                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                      index === 0 ? "bg-[#FF7A00] text-white ring-4 ring-[#FF7A00]/20 scale-110" : "bg-gray-100 text-gray-400"
                                  }`}>
                                    <Icon className="h-5 w-5" />
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <h4 className={`font-bold ${index === 0 ? "text-[#FF7A00] text-lg" : "text-[#0B1E4A]"}`}>{event.status}</h4>
                                      <span className="text-[10px] font-bold text-gray-400">{new Date(event.created_at).toLocaleString()}</span>
                                    </div>
                                    <p className="text-gray-500 mt-1 text-sm">{event.description}</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase flex items-center gap-1">
                                      <MapPin className="h-3 w-3" /> {event.location}
                                    </p>
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

        <style jsx global>{`
          @keyframes travel-line {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
          .animate-travel-line {
            animation: travel-line 3s linear infinite;
          }
        `}</style>
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
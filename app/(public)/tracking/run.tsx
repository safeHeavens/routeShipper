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

interface TimelineEvent {
    date: string;
    time: string;
    status: string;
    location: string;
    description: string;
    iconType: string;
    active: boolean;
}

interface TrackingData {
    trackingNumber: string;
    status: string;
    statusColor: string;
    origin: string;
    destination: string;
    estimatedDelivery: string;
    weight: string;
    service: string;
    shipper: string;
    receiver: string;
    timeline: TimelineEvent[];
}

function TrackingContent() {
    const searchParams = useSearchParams();
    const initialNumber = searchParams.get("number") || "";

    const [trackingNumber, setTrackingNumber] = useState(initialNumber);
    const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const headerRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Initial header animation
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
            const response = await fetch(`/api/track?number=${encodeURIComponent(numberToTrack)}`);
            if (!response.ok) throw new Error("Shipment not found.");
            const data = await response.json();
            setTrackingData(data);
        } catch (err: any) {
            if (!isSilent) setError(err.message);
        } finally {
            if (!isSilent) setIsLoading(false);
        }
    }, []);

    // REAL-TIME BROADCAST LISTENER
    useEffect(() => {
        if (!trackingData?.trackingNumber) return;

        const channel = supabase.channel(`tracking-${trackingData.trackingNumber}`)
            .on('broadcast', { event: 'update' }, (payload) => {
                fetchShipmentData(trackingData.trackingNumber, true);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [trackingData?.trackingNumber, fetchShipmentData]);

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
        <div>
            <section ref={headerRef} className="bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="header-content text-center">
                        <h1 className="text-4xl font-bold text-white sm:text-5xl">Track Your Shipment</h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                            Enter your tracking number to get real-time updates on your shipment location and delivery status.
                        </p>

                        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Enter tracking number..."
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    disabled={isLoading}
                                    className="h-14 pl-12 text-lg bg-white border-0 focus:ring-2 focus:ring-[#FF7A00] disabled:opacity-70 text-black"
                                />
                            </div>
                            <Button type="submit" disabled={isLoading || !trackingNumber.trim()} className="h-14 px-8 text-lg text-white" style={{ backgroundColor: "#FF7A00" }}>
                                {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Tracking...</> : "Track Package"}
                            </Button>
                        </form>
                        {error && <div className="mt-4 text-red-400 bg-red-900/20 py-3 px-4 rounded-md max-w-2xl mx-auto border border-red-500/30">{error}</div>}
                    </div>
                </div>
            </section>

            {trackingData && !isLoading && (
                <section ref={resultsRef} className="py-12 lg:py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-3">

                            <div className="lg:col-span-1 space-y-6">
                                <Card className="tracking-card border-0 shadow-lg">
                                    <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                                        <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Shipment Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Tracking Number</p>
                                            <p className="font-semibold text-[#0B1E4A]">{trackingData.trackingNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <Badge className="mt-1 text-white" style={{ backgroundColor: trackingData.statusColor || "#FF7A00" }}>{trackingData.status}</Badge>
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

                                <Card className="tracking-card border-0 shadow-lg">
                                    <CardHeader><CardTitle className="flex items-center gap-2 text-[#0B1E4A]"><Clock className="h-5 w-5 text-[#FF7A00]" /> Estimated Delivery</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold text-[#FF7A00]">{trackingData.estimatedDelivery}</p>
                                        <p className="text-sm text-gray-500 mt-1">Expected by end of business day</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-2">
                                <Card className="tracking-card border-0 shadow-lg">
                                    <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg flex justify-between items-center">
                                        <CardTitle>Shipment Timeline</CardTitle>
                                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Live Updates Enabled</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="relative">
                                            {trackingData.timeline.map((event, index) => {
                                                const TimelineIcon = getIconForStatus(event.iconType);
                                                const isLast = index === trackingData.timeline.length - 1;

                                                return (
                                                    <div key={index} className={`timeline-item relative flex gap-6 ${!isLast ? "pb-8" : ""}`}>

                                                        {/* ANIMATED VERTICAL LINE (FLOWING UP) */}
                                                        {!isLast && (
                                                            <div className="absolute left-[19px] top-10 w-[2px] h-full bg-gray-100 overflow-hidden">
                                                                {event.active && (
                                                                    <div className="absolute inset-0 w-full h-full animate-travel-line bg-gradient-to-t from-transparent via-[#FF7A00]/20 to-[#FF7A00]" />
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                                            event.active ? "bg-[#FF7A00] text-white ring-4 ring-[#FF7A00]/20" : "bg-gray-100 text-gray-400"
                                                        }`}>
                                                            <TimelineIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h4 className={`font-semibold ${event.active ? "text-[#FF7A00]" : "text-[#0B1E4A]"}`}>{event.status}</h4>
                                                                {event.active && <Badge className="bg-[#FF7A00]/10 text-[#FF7A00] hover:bg-[#FF7A00]/20">Current</Badge>}
                                                            </div>
                                                            <p className="text-gray-600 mt-1 text-sm">{event.description}</p>
                                                            <div className="flex flex-wrap gap-4 mt-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.date} at {event.time}</span>
                                                            </div>
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
            animation: travel-line 2.5s linear infinite;
          }
        `}</style>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-[#0B1E4A]">Need Help?</h2>
                    <p className="mt-2 text-gray-600">{"Can't find your tracking information? Our support team is here to help."}</p>
                    <Button className="mt-6 gap-2 text-white" style={{ backgroundColor: "#0B1E4A" }} asChild>
                        <a href="/support">Contact Support <ArrowRight className="h-4 w-4" /></a>
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default function TrackingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]" /></div>}>
            <TrackingContent />
        </Suspense>
    );
}
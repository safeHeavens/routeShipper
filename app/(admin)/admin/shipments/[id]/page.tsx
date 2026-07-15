"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Loader2, MapPin, Package, Clock, Truck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShipmentDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [shipment, setShipment] = useState<any>(null);
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        setLoading(true);

        // Fetch main shipment
        const { data: shipmentData } = await supabase
            .from("shipments")
            .select("*")
            .eq("id", id)
            .single();

        // Fetch history
        const { data: updateData } = await supabase
            .from("shipment_updates")
            .select("*")
            .eq("shipment_id", id)
            .order("created_at", { ascending: false });

        setShipment(shipmentData);
        setUpdates(updateData || []);
        setLoading(false);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-[#FF7A00]" /></div>;
    if (!shipment) return <div className="p-8 text-center">Shipment not found.</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to shipments
            </Button>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Info Column */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Shipment {shipment.tracking_number}</CardTitle>
                            <Badge style={{ backgroundColor: shipment.status_color }}>{shipment.status}</Badge>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Existing Details */}
                            <div>
                                <p className="text-sm text-gray-500">Sender Name</p>
                                <p className="font-bold text-[#0B1E4A]">{shipment.sender_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Recipient Name</p>
                                <p className="font-bold text-[#0B1E4A]">{shipment.receiver}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Service Type</p>
                                <Badge variant="outline" className="text-[#FF7A00] border-[#FF7A00]">
                                    {shipment.service_type || "Standard Priority"}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Estimated Delivery</p>
                                <p className="font-bold">{shipment.estimated_delivery || "TBD"}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Package Description</p>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-700 text-sm italic">
                                    {shipment.description || "No specific description provided for this shipment."}
                                </div>
                            </div>
                            {/* Route Details */}
                            <div className="md:col-span-2 grid grid-cols-2 gap-6 border-t pt-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Origin</p>
                                    <p className="text-md font-medium">{shipment.origin}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Destination</p>
                                    <p className="text-md font-medium">{shipment.destination}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* History Column */}
                <Card>
                    <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {updates.map((update) => (
                            <div key={update.id} className="relative pl-6 border-l-2 border-gray-100 pb-4">
                                <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#FF7A00]" />
                                <p className="text-xs text-gray-400">{new Date(update.created_at).toLocaleDateString()}</p>
                                <p className="font-bold text-sm">{update.status}</p>
                                <p className="text-xs text-gray-600">{update.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
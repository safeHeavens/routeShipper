import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get("number");

    if (!trackingNumber) {
        return NextResponse.json(
            { error: "Tracking number is required." },
            { status: 400 }
        );
    }

    // 1. Fetch data from Supabase including the related updates
    const { data: shipment, error } = await supabase
        .from("shipments")
        .select(`
            *,
            shipment_updates (*)
        `)
        .eq("tracking_number", trackingNumber.toUpperCase())
        .single();

    if (error || !shipment) {
        return NextResponse.json(
            { error: `Shipment ${trackingNumber} not found.` },
            { status: 404 }
        );
    }

    // 2. Sort the updates by creation date (newest first for the timeline)
    const sortedUpdates = (shipment.shipment_updates || []).sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // 3. Map Supabase columns to your frontend expected format
    const formattedData = {
        trackingNumber: shipment.tracking_number,
        status: shipment.status,
        statusColor: shipment.status_color || "#FF7A00",
        origin: shipment.origin,
        destination: shipment.destination,
        estimatedDelivery: shipment.estimated_delivery || "Calculating...",
        weight: shipment.weight || "N/A",
        service: shipment.service_type,
        shipper: shipment.sender_name,
        receiver: shipment.receiver,

        // Build timeline dynamically from the shipment_updates table
        timeline: sortedUpdates.map((update: any, index: number) => ({
            date: new Date(update.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            time: new Date(update.created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            status: update.status,
            location: update.location,
            description: update.description || getStatusDescription(update.status),
            iconType: update.icon_type || getIconType(update.status),
            active: index === 0, // The most recent update is the active one
        })),
    };

    return NextResponse.json(formattedData, { status: 200 });
}

// Fallback helper to match descriptions if table description is empty
function getStatusDescription(status: string) {
    const descriptions: Record<string, string> = {
        "Label Created": "Shipping label created and carrier notified.",
        "In Transit": "Package is moving between distribution centers.",
        "Out for Delivery": "Package has arrived at local facility and is with a courier.",
        "Delivered": "Package was dropped off at the destination.",
    };
    return descriptions[status] || "Package is being processed.";
}

// Fallback helper to match icons if table icon_type is empty
function getIconType(status: string) {
    const s = status.toLowerCase();
    if (s.includes("transit") || s.includes("moving")) return "truck";
    if (s.includes("created") || s.includes("ordered")) return "check";
    if (s.includes("delivered") || s.includes("received")) return "package";
    if (s.includes("flight") || s.includes("air")) return "plane";
    return "building";
}
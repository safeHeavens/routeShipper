"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle2,
    Printer,
    Download,
    Copy,
    ArrowLeft,
    Package,
    QrCode,
    ExternalLink
} from "lucide-react";

export default function ShipmentSuccess({ shipmentData }: { shipmentData: any }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const labelRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print(); // In a real app, you'd use a library like react-to-print
    };

    const copyTracking = () => {
        navigator.clipboard.writeText(shipmentData.tracking_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
            {/* Header Success Message */}
            <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-[#0B1E4A]">Shipment Created!</h1>
                <p className="text-slate-500">The tracking number is now live and notification has been queued.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Left Side: Actions & Info */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-bold text-[#0B1E4A] flex items-center gap-2">
                                <Package className="h-4 w-4" /> Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button onClick={handlePrint} className="bg-[#0B1E4A] hover:bg-[#162a5a] gap-2">
                                    <Printer className="h-4 w-4" /> Print Label
                                </Button>
                                <Button variant="outline" className="gap-2 border-slate-200">
                                    <Download className="h-4 w-4" /> Download PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyTracking}
                                    className="gap-2 border-slate-200"
                                >
                                    <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy Tracking"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="gap-2 text-[#FF7A00] hover:text-[#E66E00] hover:bg-orange-50"
                                    onClick={() => window.open(`/tracking?number=${shipmentData.tracking_number}`, '_blank')}
                                >
                                    <ExternalLink className="h-4 w-4" /> View Public Page
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        variant="link"
                        className="text-slate-500 hover:text-[#0B1E4A]"
                        onClick={() => router.push('/admin')}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Return to Dashboard
                    </Button>
                </div>

                {/* Right Side: The Thermal Label Preview */}
                <div className="flex justify-center items-start">
                    {/* This div is styled specifically for 4x6 thermal printing */}
                    <div
                        ref={labelRef}
                        className="w-[380px] bg-white border-[3px] border-black p-6 flex flex-col font-mono text-black shadow-xl print:shadow-none print:border-black"
                    >
                        {/* Header Part */}
                        <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-start">
                            <div className="text-xl font-black italic tracking-tighter">
                                ROUTE<span className="text-slate-500">SHIPPER</span>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold">SERVICE:</div>
                                <div className="text-xs font-black uppercase">{shipmentData.service_type}</div>
                            </div>
                        </div>

                        {/* From/To Section */}
                        <div className="grid grid-cols-2 gap-4 border-b-2 border-black pb-4 mb-4 text-[10px]">
                            <div>
                                <div className="font-bold border-b border-black mb-1">FROM:</div>
                                <div className="font-black uppercase">{shipmentData.sender_name}</div>
                                <div>{shipmentData.origin}</div>
                                <div className="font-bold">{shipmentData.origin_zip}</div>
                            </div>
                            <div>
                                <div className="font-bold border-b border-black mb-1">TO:</div>
                                <div className="font-black uppercase text-xs">{shipmentData.receiver}</div>
                                <div>{shipmentData.destination}</div>
                                <div className="font-bold">{shipmentData.destination_zip}</div>
                            </div>
                        </div>

                        {/* Barcode Placeholder & Tracking */}
                        <div className="flex flex-col items-center py-4 border-b-2 border-black mb-4">
                            {/* Barcode Simulation */}
                            <div className="w-full h-16 flex gap-[2px] items-stretch mb-2">
                                {[...Array(40)].map((_, i) => (
                                    <div key={i} className="bg-black" style={{ width: `${Math.random() * 5 + 1}px` }} />
                                ))}
                            </div>
                            <div className="text-lg font-black tracking-[0.2em]">
                                {shipmentData.tracking_number}
                            </div>
                        </div>

                        {/* Footer Data */}
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold uppercase">Weight: {shipmentData.weight}</div>
                                <div className="text-[8px] max-w-[150px] leading-tight">
                                    DESC: {shipmentData.description}
                                </div>
                            </div>
                            <QrCode className="h-16 w-16" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Print-only Styles */}
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    .print\:shadow-none, .print\:shadow-none * { visibility: visible; }
                    .print\:shadow-none { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
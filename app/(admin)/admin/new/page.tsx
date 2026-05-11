"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component
import { supabase } from "@/lib/supabase";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowLeft,
    Loader2,
    Info,
    Mail,
    Hash,
    CheckCircle2,
    Printer,
    Copy,
    Package,
    ExternalLink
} from "lucide-react";

export default function NewShipment() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [createdShipment, setCreatedShipment] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    const trackingBaseUrl = "https://routeshipper.vercel.app/tracking?number=";

    const generateTrackingNumber = () => {
        const nums = "0123456789";
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let part1 = "";
        for (let i = 0; i < 6; i++) part1 += nums.charAt(Math.floor(Math.random() * nums.length));
        let part2 = "";
        for (let i = 0; i < 2; i++) part2 += alpha.charAt(Math.floor(Math.random() * alpha.length));
        let part3 = "";
        for (let i = 0; i < 1; i++) part3 += nums.charAt(Math.floor(Math.random() * nums.length));
        return `RS${part1}${part2}${part3}`;
    };

    const [form, setForm] = useState({
        tracking_number: generateTrackingNumber(),
        sender_name: "",
        origin: "",
        origin_zip: "",
        destination: "",
        destination_zip: "",
        receiver: "",
        receiver_email: "",
        weight: "",
        description: "",
        service_type: "Standard Ground",
        status: "Label Created",
        status_color: "#FF7A00"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("shipments")
            .insert([{
                ...form,
                created_by: user?.id
            }])
            .select()
            .single();

        if (!error) {
            setCreatedShipment(data);
        } else {
            alert("Error: " + error.message);
            setLoading(false);
        }
    };

    const copyTracking = () => {
        navigator.clipboard.writeText(createdShipment.tracking_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (createdShipment) {
        return (
            <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
                <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0B1E4A]">Shipment Created!</h1>
                    <p className="text-slate-500">The tracking number is now live and notification has been queued.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
                    <div className="space-y-6">
                        <Card className="border-0 shadow-sm ring-1 ring-slate-200">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-bold text-[#0B1E4A] flex items-center gap-2">
                                    <Package className="h-4 w-4" /> Quick Actions
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Button onClick={() => window.print()} className="bg-[#0B1E4A] hover:bg-[#162a5a] gap-2">
                                        <Printer className="h-4 w-4" /> Print Label
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
                                        className="gap-2 text-[#FF7A00] hover:bg-orange-50 sm:col-span-2"
                                        onClick={() => window.open(`/tracking?number=${createdShipment.tracking_number}`, '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4" /> View Public Tracking Page
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

                    {/* Thermal Label Preview */}
                    <div className="flex justify-center items-start print:block">
                        <div className="w-[380px] bg-white border-[3px] border-black p-6 flex flex-col font-mono text-black shadow-xl print:shadow-none print:border-black print:m-0">
                            <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-center">
                                {/* IMAGE LOGO ADDED HERE */}
                                <div className="relative w-40 h-12">
                                    <Image
                                        src="/images/routeshipper-logo-blk.png"
                                        alt="RouteShipper Logo"
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                                        priority
                                    />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold uppercase">Service</div>
                                    <div className="text-xs font-black uppercase leading-none">{createdShipment.service_type}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b-2 border-black pb-4 mb-4 text-[10px]">
                                <div>
                                    <div className="font-bold border-b border-black mb-1">FROM:</div>
                                    <div className="font-black uppercase">{createdShipment.sender_name}</div>
                                    <div>{createdShipment.origin}</div>
                                    <div className="font-bold">{createdShipment.origin_zip}</div>
                                </div>
                                <div>
                                    <div className="font-bold border-b border-black mb-1">TO:</div>
                                    <div className="font-black uppercase text-xs">{createdShipment.receiver}</div>
                                    <div>{createdShipment.destination}</div>
                                    <div className="font-bold">{createdShipment.destination_zip}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center py-4 border-b-2 border-black mb-4">
                                <div className="w-full h-12 flex gap-[1px] items-stretch mb-2 overflow-hidden">
                                    {[...Array(60)].map((_, i) => (
                                        <div key={i} className="bg-black shrink-0" style={{ width: `${(i % 3) + 1}px` }} />
                                    ))}
                                </div>
                                <div className="text-lg font-black tracking-[0.1em]">
                                    {createdShipment.tracking_number}
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold uppercase">Weight: {createdShipment.weight || "N/A"}</div>
                                    <div className="text-[8px] max-w-[180px] leading-tight uppercase font-bold">
                                        Ref: {createdShipment.description?.substring(0, 40) || "No Description"}
                                    </div>
                                </div>
                                <div className="p-1 bg-white border border-black/10">
                                    <QRCodeSVG
                                        value={`${trackingBaseUrl}${createdShipment.tracking_number}`}
                                        size={60}
                                        level={"H"}
                                        includeMargin={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @media print {
                        body * { visibility: hidden; }
                        .print\:shadow-none, .print\:shadow-none * { visibility: visible; }
                        .print\:shadow-none { position: absolute; left: 0; top: 0; width: 100%; border: none; }
                    }
                `}</style>
            </div>
        );
    }

    return (
        /* ... (rest of form render remains same as previous version) ... */
        <div className="p-8 max-w-3xl mx-auto">
            {/* Same form code as provided in your previous message */}
            <Button
                variant="ghost"
                className="mb-4 gap-2 text-gray-500 hover:text-[#0B1E4A]"
                onClick={() => router.push('/admin')}
            >
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>

            <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-[#FF7A00]" /> New Shipment Entry
                        </CardTitle>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase opacity-60 tracking-widest">Tracking ID</span>
                            <span className="text-[15px] font-mono font-bold tracking-tighter text-[#FF7A00]">
                                {form.tracking_number}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Sender Name</Label>
                                <Input
                                    required
                                    placeholder="Full name of sender"
                                    className="h-11 bg-white border-slate-200"
                                    onChange={e => setForm({...form, sender_name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Receiver Name</Label>
                                <Input
                                    required
                                    placeholder="Full name of recipient"
                                    className="h-11 bg-white border-slate-200"
                                    onChange={e => setForm({...form, receiver: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold flex items-center gap-2">
                                    Recipient Email <Mail className="h-3 w-3 text-[#FF7A00]" />
                                </Label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="customer@email.com"
                                    className="h-11 bg-white border-slate-200"
                                    onChange={e => setForm({...form, receiver_email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Service Type</Label>
                                <Select
                                    defaultValue={form.service_type}
                                    onValueChange={value => setForm({...form, service_type: value})}
                                >
                                    <SelectTrigger className="border-slate-200 bg-white h-11">
                                        <SelectValue placeholder="Select Service" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Standard Ground">Standard Ground (3-5 Days)</SelectItem>
                                        <SelectItem value="Priority Express">Priority Express (1-2 Days)</SelectItem>
                                        <SelectItem value="Freight Logistics">Heavy Freight</SelectItem>
                                        <SelectItem value="International Air">International Air</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[#0B1E4A] font-bold">Origin</Label>
                                    <Input
                                        required
                                        placeholder="City, Country"
                                        className="bg-white h-11 border-slate-200"
                                        onChange={e => setForm({...form, origin: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-slate-500 uppercase font-bold">Origin Zip</Label>
                                    <Input
                                        required
                                        placeholder="Zip Code"
                                        className="bg-white h-10 border-slate-200"
                                        onChange={e => setForm({...form, origin_zip: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[#FF7A00] font-bold">Destination</Label>
                                    <Input
                                        required
                                        placeholder="City, Country"
                                        className="bg-white h-11 border-slate-200"
                                        onChange={e => setForm({...form, destination: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-slate-500 uppercase font-bold">Dest. Zip</Label>
                                    <Input
                                        required
                                        placeholder="Zip Code"
                                        className="bg-white h-10 border-slate-200"
                                        onChange={e => setForm({...form, destination_zip: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Weight</Label>
                                <Input
                                    placeholder="e.g. 15kg"
                                    className="h-11 bg-white border-slate-200"
                                    onChange={e => setForm({...form, weight: e.target.value})}
                                />
                            </div>
                            <div className="flex items-end pb-2">
                                <p className="text-[11px] text-slate-400 italic flex items-center gap-1">
                                    <Info className="h-3 w-3" /> Zip codes auto-calculate transit distance.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-600 font-semibold">Package Description</Label>
                            <Textarea
                                placeholder="Describe items..."
                                className="min-h-[80px] bg-white border-slate-200"
                                onChange={e => setForm({...form, description: e.target.value})}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white h-14 text-lg font-bold shadow-lg transition-transform active:scale-[0.99]"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" /> Finalizing...
                                </span>
                            ) : (
                                "Generate Shipment Label"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
    Plus, Trash2, PlusCircle, ExternalLink, Loader2, MapPin, Search, X,
    ChevronLeft, ChevronRight, History, Printer, Clock, Calendar, Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [shipmentHistory, setShipmentHistory] = useState<any[]>([]);
    const [fetchingHistory, setFetchingHistory] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<any>(null);
    const [updateForm, setUpdateForm] = useState({ status: "", location: "", description: "", estimated_delivery: "" });

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) { router.push("/admin/login"); return; }
            fetchShipments();
        };
        checkAuth();

        const channel = supabase.channel('shipments').on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, () => fetchShipments()).subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [router]);

    const fetchShipments = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from("shipments").select(`*`).order("created_at", { ascending: false });
        const { data, error } = await query;
        if (!error) setShipments(data || []);
        setLoading(false);
    };

    const filteredShipments = shipments.filter((s) =>
        s.tracking_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.receiver?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recentShipments = [...shipments].slice(0, 5);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1E4A]">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm">Managing LavtradePro Global Operations</p>
                </div>
                <Button className="bg-[#FF7A00] hover:bg-[#E66E00]" onClick={() => router.push('/admin/new')}>
                    <Plus className="mr-2 h-4 w-4" /> New Shipment
                </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#0B1E4A] text-white">
                    <CardContent className="pt-6"><p className="text-blue-200 text-sm">Total Shipments</p><h3 className="text-4xl font-bold mt-2">{shipments.length}</h3></CardContent>
                </Card>
                <Card><CardContent className="pt-6"><p className="text-gray-500 text-sm">Active</p><h3 className="text-4xl font-bold mt-2 text-[#FF7A00]">{shipments.filter(s => s.status !== 'Delivered').length}</h3></CardContent></Card>
                <Card><CardContent className="pt-6"><p className="text-gray-500 text-sm">Delivered</p><h3 className="text-4xl font-bold mt-2 text-green-600">{shipments.filter(s => s.status === 'Delivered').length}</h3></CardContent></Card>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-[#0B1E4A] mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {recentShipments.map((shipment) => (
                        <div key={shipment.id} onClick={() => router.push(`/shipments/${shipment.id}`)} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-[#FF7A00] cursor-pointer transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center"><Truck className="h-5 w-5 text-[#0B1E4A]" /></div>
                                <div>
                                    <p className="font-bold text-[#0B1E4A]">{shipment.tracking_number}</p>
                                    <p className="text-xs text-gray-500">To: {shipment.receiver}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Table */}

        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Trash2,
    PlusCircle,
    ExternalLink,
    Loader2,
    MapPin,
    CheckCircle2,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    History,
    Printer,
    Clock,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // History State
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [shipmentHistory, setShipmentHistory] = useState<any[]>([]);
    const [fetchingHistory, setFetchingHistory] = useState(false);

    // Update Modal State
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<any>(null);
    const [updateForm, setUpdateForm] = useState({
        status: "",
        location: "",
        description: "",
        estimated_delivery: "" // New Field
    });

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
                return;
            }
            fetchShipments();
        };
        checkAuth();

        const channel = supabase
            .channel('schema-db-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'shipments' },
                () => fetchShipments()
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [router]);

    const fetchShipments = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user?.id)
            .maybeSingle();

        let query = supabase
            .from("shipments")
            .select(`*, profiles!created_by (username)`)
            .order("created_at", { ascending: false });

        if (profile?.role !== 'super_admin') {
            query = query.eq('created_by', user?.id);
        }

        const { data, error } = await query;
        if (!error) setShipments(data || []);
        setLoading(false);
    };

    const openHistoryModal = async (shipment: any) => {
        setSelectedShipment(shipment);
        setIsHistoryModalOpen(true);
        setFetchingHistory(true);

        const { data, error } = await supabase
            .from("shipment_updates")
            .select("*")
            .eq("shipment_id", shipment.id)
            .order("created_at", { ascending: false });

        if (!error) setShipmentHistory(data || []);
        setFetchingHistory(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const filteredShipments = shipments.filter((s) => {
        const query = searchQuery.toLowerCase();
        return (
            s.tracking_number?.toLowerCase().includes(query) ||
            s.receiver?.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const openUpdateModal = (shipment: any) => {
        setSelectedShipment(shipment);
        setUpdateForm({
            status: shipment.status,
            location: "",
            description: `Package is currently ${shipment.status.toLowerCase()}`,
            estimated_delivery: shipment.estimated_delivery || ""
        });
        setIsUpdateModalOpen(true);
    };

    const handleQuickUpdate = async () => {
        if (!selectedShipment || !updateForm.status) return;
        setUpdating(true);

        const statusConfig: Record<string, { color: string; icon: string }> = {
            "Label Created": { color: "#94a3b8", icon: "clipboard" },
            "In Transit": { color: "#FF7A00", icon: "truck" },
            "At Customs": { color: "#3b82f6", icon: "warehouse" },
            "Arrived at Hub": { color: "#3b82f6", icon: "warehouse" },
            "Out for Delivery": { color: "#8b5cf6", icon: "truck" },
            "Delivered": { color: "#10b981", icon: "package" },
            "Delayed": { color: "#ef4444", icon: "alert-circle" },
        };

        const currentConfig = statusConfig[updateForm.status] || { color: "#FF7A00", icon: "truck" };
        const newLocation = updateForm.location || selectedShipment.origin;

        // Update the shipment record (Status + Estimated Delivery)
        const { error: shipError } = await supabase
            .from("shipments")
            .update({
                status: updateForm.status,
                status_color: currentConfig.color,
                estimated_delivery: updateForm.estimated_delivery // Updating the delivery date
            })
            .eq("id", selectedShipment.id);

        // Insert log to timeline
        const { error: logError } = await supabase
            .from("shipment_updates")
            .insert([{
                shipment_id: selectedShipment.id,
                status: updateForm.status,
                location: newLocation,
                description: updateForm.description || `Shipment status updated to ${updateForm.status}`,
                icon_type: currentConfig.icon
            }]);

        if (!shipError && !logError) {
            setIsUpdateModalOpen(false);
            fetchShipments();
        } else {
            alert("Error updating shipment.");
        }
        setUpdating(false);
    };

    const deleteShipment = async (id: string) => {
        if (confirm("Permanently delete this shipment and all history?")) {
            const { error } = await supabase.from("shipments").delete().eq("id", id);
            if (!error) fetchShipments();
        }
    };

    return (
        <div className="p-8">
            <div className="hidden print:block fixed inset-0 bg-white p-10 z-[9999]">
                <div className="border-4 border-black p-8 w-[450px] mx-auto text-black">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">LOGISTICS PRO</h1>
                    <div className="border-t-2 border-b-2 border-black py-4 mb-6">
                        <p className="text-xs uppercase font-bold">Tracking Number</p>
                        <p className="text-4xl font-mono font-black">{selectedShipment?.tracking_number}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">From:</p>
                            <p className="text-sm font-bold leading-tight">{selectedShipment?.origin}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">To:</p>
                            <p className="text-sm font-bold leading-tight">
                                {selectedShipment?.receiver}<br />
                                {selectedShipment?.destination}
                            </p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-dashed border-black flex justify-between items-center">
                        <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase">Standard Priority</div>
                        <div className="h-16 w-16 bg-black flex items-center justify-center text-white text-[8px]">QR CODE</div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl print:hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0B1E4A]">Shipment Management</h1>
                        <p className="text-gray-500 text-sm">Create and track logistics in real-time.</p>
                    </div>
                    <Button
                        className="bg-[#FF7A00] hover:bg-[#E66E00] text-white"
                        onClick={() => router.push('/admin/new')}
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Shipment
                    </Button>
                </div>

                <div className="relative mb-6 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search tracking number or recipient..."
                        className="pl-10 pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="text-lg">Live Packages</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="pl-6">Tracking Number</TableHead>
                                    <TableHead>Recipient</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Route</TableHead>
                                    <TableHead className="text-right pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center py-12"><Loader2 className="animate-spin h-5 w-5 mx-auto text-[#FF7A00]" /></TableCell></TableRow>
                                ) : currentItems.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="text-center py-12 text-gray-500">No shipments found.</TableCell></TableRow>
                                ) : (
                                    currentItems.map((shipment) => (
                                        <TableRow key={shipment.id} className="group">
                                            <TableCell className="pl-6 font-mono font-bold text-[#0B1E4A]">{shipment.tracking_number}</TableCell>
                                            <TableCell className="font-medium">{shipment.receiver}</TableCell>
                                            <TableCell>
                                                <Badge className="text-white border-0" style={{ backgroundColor: shipment.status_color || "#FF7A00" }}>{shipment.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <div className="text-[#0B1E4A] font-medium">{shipment.origin}</div>
                                                <div className="text-gray-400 text-xs">to {shipment.destination}</div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 space-x-1">
                                                <Button variant="ghost" size="icon" className="hover:bg-amber-50" title="History" onClick={() => openHistoryModal(shipment)}>
                                                    <History className="h-4 w-4 text-amber-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-blue-50" title="Quick Update" onClick={() => openUpdateModal(shipment)}>
                                                    <PlusCircle className="h-4 w-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-red-50" onClick={() => deleteShipment(shipment.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => window.open(`/tracking?number=${shipment.tracking_number}`, '_blank')}>
                                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 mt-4 bg-white border rounded-lg">
                        <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <div>
                            <DialogTitle>Shipment Timeline</DialogTitle>
                            <DialogDescription className="font-mono text-xs">{selectedShipment?.tracking_number}</DialogDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="h-4 w-4 mr-2" /> Print Label</Button>
                    </DialogHeader>
                    <div className="py-6 max-h-[60vh] overflow-y-auto">
                        {fetchingHistory ? <Loader2 className="animate-spin mx-auto" /> : (
                            <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                                {shipmentHistory.map((event, idx) => (
                                    <div key={event.id} className="relative pl-8">
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${idx === 0 ? 'bg-[#FF7A00] ring-4 ring-orange-100' : 'bg-slate-300'}`} />
                                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {new Date(event.created_at).toLocaleString()}
                                        </span>
                                        <p className="text-sm font-bold text-[#0B1E4A]">{event.status}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</p>
                                        <p className="text-xs italic text-gray-400 mt-1 bg-gray-50 p-2 rounded">"{event.description}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Update Shipment</DialogTitle>
                        <DialogDescription>Tracking ID: {selectedShipment?.tracking_number}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>New Status</Label>
                            <Select value={updateForm.status} onValueChange={(v) => setUpdateForm({...updateForm, status: v})}>
                                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Label Created">Label Created</SelectItem>
                                    <SelectItem value="In Transit">In Transit</SelectItem>
                                    <SelectItem value="Arrived at Hub">Arrived at Hub</SelectItem>
                                    <SelectItem value="With Customs">With Customs</SelectItem>
                                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Delayed">Delayed / Exception</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* New Estimated Delivery Field */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#FF7A00]" />
                                Estimated Delivery
                            </Label>
                            <Input
                                placeholder="e.g. May 24, 2026"
                                value={updateForm.estimated_delivery}
                                onChange={(e) => setUpdateForm({...updateForm, estimated_delivery: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Event Location</Label>
                            <Input
                                placeholder={selectedShipment?.origin}
                                value={updateForm.location}
                                onChange={(e) => setUpdateForm({...updateForm, location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                                value={updateForm.description}
                                onChange={(e) => setUpdateForm({...updateForm, description: e.target.value})}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
                        <Button className="bg-[#0B1E4A] text-white" onClick={handleQuickUpdate} disabled={updating}>
                            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Confirm Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
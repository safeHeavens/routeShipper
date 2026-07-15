"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Wrench, Phone, Eye, Save, Plus, Loader2 } from "lucide-react";

export default function AdminOperations() {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    // Form States
    const [announcement, setAnnouncement] = useState("");
    const [service, setService] = useState({ title: "", img: "", desc: "" });
    const [contact, setContact] = useState({ email: "", phone: "", address: "" });

    // Handle File Upload to Supabase Storage
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('service-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
            setService({ ...service, img: data.publicUrl });
        } catch (error) {
            alert("Error uploading image!");
        } finally {
            setUploading(false);
        }
    };

    // Database Update Trigger
    const handleSave = async (section: string) => {
        setLoading(true);
        let table = section === "announcement" ? "announcements" : "site_contact";
        let dataToSave = section === "announcement" ? { content: announcement } : contact;

        const { error } = await supabase.from(table).upsert([dataToSave]);
        if (error) alert("Error saving: " + error.message);
        else alert("Updated successfully!");
        setLoading(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#0B1E4A]">Site Operations</h1>
                <Button variant={previewMode ? "default" : "outline"} onClick={() => setPreviewMode(!previewMode)}>
                    <Eye className="mr-2 h-4 w-4" /> {previewMode ? "Exit Preview" : "Live Preview"}
                </Button>
            </div>

            {previewMode ? (
                <div className="border-4 border-dashed border-[#FF7A00] p-8 rounded-xl bg-gray-50">
                    <h2 className="text-xl font-bold mb-4 text-[#0B1E4A]">Live Site Preview</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-4 shadow rounded"><strong>Alert:</strong> {announcement || "No announcement yet"}</div>
                        <div className="bg-white p-4 shadow rounded"><strong>Contact:</strong> {contact.email} | {contact.phone}</div>
                        {service.img && <img src={service.img} alt="Preview" className="max-h-40 rounded" />}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Announcements */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5" /> Announcements</CardTitle></CardHeader>
                        <CardContent>
                            <Input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="Breaking news..." className="mb-2" />
                            <Button onClick={() => handleSave("announcement")} disabled={loading} className="w-full bg-[#0B1E4A]"><Save className="mr-2 h-4 w-4" /> Post Announcement</Button>
                        </CardContent>
                    </Card>

                    {/* Services */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5" /> Manage Services</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input placeholder="Service Title" value={service.title} onChange={(e) => setService({...service, title: e.target.value})} />
                                <div className="flex items-center gap-2">
                                    <Input type="file" onChange={handleImageUpload} disabled={uploading} />
                                    {uploading && <Loader2 className="animate-spin h-5 w-5" />}
                                </div>
                                <Textarea placeholder="Description" value={service.desc} onChange={(e) => setService({...service, desc: e.target.value})} className="md:col-span-2" />
                            </div>
                            <Button className="w-full bg-[#FF7A00]"><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Contact Information</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <Input placeholder="Email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} />
                            <Input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
                            <Input placeholder="Address" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} />
                            <Button onClick={() => handleSave("contact")} disabled={loading} className="w-full"><Save className="mr-2 h-4 w-4" /> Update Contact Info</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
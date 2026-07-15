"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Save } from "lucide-react";

export default function AdminOperations() {
    const [contact, setContact] = useState({ email: "support@lavtradepro.com", phone: "+234 123 4567" });
    const [previewMode, setPreviewMode] = useState(false);

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#0B1E4A]">Site Operations</h1>
                <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                    <Eye className="mr-2 h-4 w-4" /> {previewMode ? "Exit Preview" : "Live Preview"}
                </Button>
            </div>

            {previewMode ? (
                // PREVIEW UI: This simulates what the user sees on the landing page
                <div className="border-4 border-[#FF7A00] p-10 bg-white rounded-xl shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-[#0B1E4A]">Live Site Preview</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-100 rounded">
                            <p className="text-xs text-gray-500">Contact Email</p>
                            <p className="font-bold">{contact.email}</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded">
                            <p className="text-xs text-gray-500">Phone Number</p>
                            <p className="font-bold">{contact.phone}</p>
                        </div>
                    </div>
                </div>
            ) : (
                // EDIT UI: Standard form fields
                <Card>
                    <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            value={contact.email}
                            onChange={(e) => setContact({...contact, email: e.target.value})}
                        />
                        <Input
                            value={contact.phone}
                            onChange={(e) => setContact({...contact, phone: e.target.value})}
                        />
                        <Button className="w-full bg-[#0B1E4A]">
                            <Save className="mr-2 h-4 w-4" /> Save to Database
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
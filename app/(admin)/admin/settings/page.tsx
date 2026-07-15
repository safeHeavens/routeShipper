"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Lock } from "lucide-react";

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) alert("Error updating password: " + error.message);
        else alert("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-[#0B1E4A]">Admin Settings</h1>

            {/* Password Security Card */}
            <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-[#FF7A00]" /> Account Security</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirm New Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={updatePassword}
                        disabled={loading || !newPassword}
                        className="bg-[#0B1E4A] hover:bg-[#0B1E4A]/90 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                        Update Password
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
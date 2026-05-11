"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'error' | 'success' | null, message: string }>({
        type: null,
        message: ""
    });

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" }); // Reset status

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setStatus({
                type: 'error',
                message: error.message === "Invalid login credentials"
                    ? "The email or password you entered is incorrect."
                    : error.message
            });
            setLoading(false);
        } else {
            setStatus({ type: 'success', message: "Login successful! Redirecting..." });
            // Small delay to let the user see the success message before redirect
            setTimeout(() => {
                router.push("/admin");
            }, 800);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B1E4A] p-4">

            {/* 1. Logo at the top */}
            <div className="mb-8 flex items-center gap-2 text-white font-bold text-3xl">
                <ShieldCheck className="h-10 w-10 text-[#FF7A00]" />
                <span>ROUTE<span className="text-[#FF7A00]">SHIPPER</span></span>
            </div>

            {/* 2. Login Form */}
            <Card className="w-full max-w-md border-0 shadow-2xl bg-white overflow-hidden">
                <CardContent className="pt-8">
                    <div className="mb-6 text-center">
                        <h1 className="text-xl font-bold text-[#0B1E4A]">Admin Access</h1>
                        <p className="text-gray-500 text-sm">Please sign in to manage shipments</p>
                    </div>

                    {/* Dynamic Status Message */}
                    {status.type && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                            status.type === 'error'
                                ? "bg-red-50 text-red-700 border border-red-100"
                                : "bg-green-50 text-green-700 border border-green-100"
                        }`}>
                            {status.type === 'error' ? (
                                <AlertCircle className="h-5 w-5 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-5 w-5 shrink-0" />
                            )}
                            <p className="text-sm font-medium">{status.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <Input
                                type="email"
                                placeholder="admin@routeshipper.com"
                                className="h-12 border-gray-200 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                className="h-12 border-gray-200 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#FF7A00] hover:bg-[#E66E00] text-lg font-semibold transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    Verifying...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <p className="mt-8 text-gray-400 text-sm">
                © 2026 RouteShipper Logistics Platform
            </p>
        </div>
    );
}
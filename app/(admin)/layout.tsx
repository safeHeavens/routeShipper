"use client";

import { ShieldCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import '../global-styles.css'
import {Montserrat} from "next/font/google";


const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${montserrat.variable} font-sans antialiased`}>
                <div className="min-h-screen bg-slate-50 flex flex-col">
                {/* Admin-Only Header: Isolated from the main site */}
            <nav className="bg-[#0B1E4A] text-white px-8 py-4 flex items-center justify-between shadow-md">
                <div
                    className="flex items-center gap-2 font-bold text-xl cursor-pointer"
                    onClick={() => router.push('/admin')}
                >
                    <ShieldCheck className="text-[#FF7A00] h-6 w-6" />
                    <span>ROUTE<span className="text-[#FF7A00]">SHIPPER</span> <span className="text-[10px] opacity-50 uppercase tracking-tighter">Admin</span></span>
                </div>

                <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white gap-2"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </nav>

            {/* Content Area */}
            <main className="flex-1">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}
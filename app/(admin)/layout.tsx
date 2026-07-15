"use client";

import { useState } from "react";
import { LogOut, LayoutDashboard, Package, Users, Globe, Settings, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import '../global-styles.css';

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Shipments", href: "/admin/shipments", icon: Package },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Operations", href: "/admin/operations", icon: Globe },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <html lang="en" suppressHydrationWarning className="h-full">
        <body className={`${montserrat.variable} font-sans antialiased h-full overflow-hidden`}>
        {/* Main Application Shell - Fixed Height */}
        <div className="h-screen flex flex-col">

            {/* Top Header - Fixed Top */}
            <nav className="shrink-0 bg-[#0B1E4A] text-white px-4 md:px-8 py-4 flex items-center justify-between shadow-md z-50">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/admin')}>
                        <Image src="/images/trans-logo.png" alt="Logo" width={120} height={80} className="h-8 w-auto max-w-[180px] object-contain" />
                        <span className="font-bold text-base md:text-xl tracking-tight hidden sm:inline-block">ADMIN PANEL</span>
                    </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/10 text-sm h-9 px-3" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" /> <span className="hidden sm:inline">Logout</span>
                </Button>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar - Fixed Left */}
                <aside className="w-64 bg-slate-900 text-white p-4 hidden md:block shrink-0 overflow-y-auto">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
                            return (
                                <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-[#FF7A00] text-white shadow-lg" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}>
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Mobile Menu Drawer */}
                <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMobileMenuOpen(false)} />
                <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white p-5 z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between mb-8 pb-4 border-b border-slate-800">
                        <Image src="/images/trans-logo.png" alt="Logo" width={100} height={30} className="h-6 w-auto object-contain" />
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}><X className="h-5 w-5" /></Button>
                    </div>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname.startsWith(item.href) ? "bg-[#FF7A00]" : "text-gray-400"}`}>
                                <item.icon className="h-5 w-5" /> {item.name}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area - ONLY scrollable part */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}
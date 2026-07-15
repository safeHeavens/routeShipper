"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Add your authentication logic here
          formData.email === "admin@lavtradepro.com" ? resolve(true) : reject();
        }, 2000);
      });
      setStatus('success');
      router.push("/dashboard");
    } catch {
      setStatus('error');
    }
  };

  return (
      <div className="min-h-screen flex lg:grid lg:grid-cols-2">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0B1E4A] p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF7A00] p-2 rounded-lg"><Truck className="h-6 w-6" /></div>
            <span className="text-xl font-bold">LavtradePro</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-6">Logistics,<br />Simplified.</h1>
            <p className="text-gray-400 text-lg">Secure access to your global supply chain management dashboard.</p>
          </div>
          <p className="text-sm text-gray-500">© 2026 LavtradePro Group of Companies</p>
        </div>

        {/* Right side - Form */}
        <div className="flex items-center justify-center p-8 w-full">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1E4A]">Welcome back</h2>
              <p className="text-gray-500 mt-2">Enter your credentials to access your portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                      className="pl-10 h-12"
                      type="email"
                      placeholder="name@lavtradepro.com"
                      required
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Password</Label>
                  <Link href="#" className="text-sm text-[#FF7A00] font-semibold">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                      className="pl-10 pr-10 h-12"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {status === 'error' && <p className="text-red-500 text-sm">Invalid credentials. Please try again.</p>}

              <Button className="w-full h-12 bg-[#FF7A00] hover:bg-[#ff7a00]/90 text-white font-bold" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
}
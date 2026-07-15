"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Mail, Lock, User, Building, ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", company: "", email: "", password: "" });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate Registration API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      router.push("/dashboard");
    } catch {
      setStatus('error');
    }
  };

  return (
      <div className="min-h-screen flex lg:grid lg:grid-cols-2">
        {/* Sidebar - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0B1E4A] p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF7A00] p-2 rounded-lg"><Truck className="h-6 w-6" /></div>
            <span className="text-xl font-bold">LavtradePro</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-6">Join Our<br />Global Network.</h1>
            <p className="text-gray-400 text-lg">Register your business today to access premium shipping and logistics solutions.</p>
          </div>
          <p className="text-sm text-gray-500">© 2026 LavtradePro Group of Companies</p>
        </div>

        {/* Signup Form */}
        <div className="flex items-center justify-center p-8 w-full">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1E4A]">Create your account</h2>
              <p className="text-gray-500 mt-2">Get started with LavtradePro Shipments</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input className="pl-10 h-12" placeholder="John Doe" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input className="pl-10 h-12" placeholder="Corp Name" required onChange={(e) => setFormData({...formData, company: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input className="pl-10 h-12" type="email" placeholder="name@company.com" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input className="pl-10 h-12" type="password" placeholder="••••••••" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>

              {status === 'error' && <p className="text-red-500 text-sm">Registration failed. Please try again.</p>}

              <Button className="w-full h-12 bg-[#FF7A00] hover:bg-[#ff7a00]/90 text-white font-bold" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Already have an account? <Link href="/login" className="text-[#1F77FF] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
  );
}
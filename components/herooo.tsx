import Image from "next/image";
import {ArrowRight, CheckCircle, Clock, Search, Shield} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

<section ref={heroRef} className="relative min-h-[90vh] flex items-center ">
    {/* Background Image */}
    <div className="absolute inset-0">
        <Image
            src="/images/hero-bg-jet.png"
            alt="Global logistics and freight operations"
            fill
            className="object-cover"
            priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E4A]/95 via-[#0B1E4A]/85 to-[#0B1E4A]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E4A]/50 to-transparent" />
    </div>

    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FF7A00]/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-[#1F77FF]/15 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
    </div>

    <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-sm font-medium text-white">Trusted by 10,000+ businesses worldwide</span>
            </div>

            <div className="hero-content">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
                    <span className="block text-balance">Ship Smarter.</span>
                    <span className="block text-[#FF7A00] mt-2">Deliver Faster.</span>
                </h1>
                <p className="mt-6 text-lg text-gray-200 lg:text-xl max-w-2xl leading-relaxed">
                    Experience world-class logistics with RouteShipper. From express air freight to cost-effective ocean shipping, we deliver your goods safely and on time, every time.
                </p>
            </div>

            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="hero-tracking-form mt-10 flex flex-col gap-4 sm:flex-row sm:max-w-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Enter your tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="h-14 pl-12 pr-4 bg-white/95 backdrop-blur-sm border-0 text-[#0B1E4A] placeholder:text-gray-500 text-base rounded-xl shadow-lg focus:ring-2 focus:ring-[#FF7A00]"
                    />
                </div>
                <Button
                    type="submit"
                    className="h-14 px-8 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#FF7A00" }}
                >
                    Track Package
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </form>

            {/* Trust badges */}
            <div className="hero-trust-badges mt-12 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3 text-white/90">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7A00]/20">
                        <CheckCircle className="h-5 w-5 text-[#FF7A00]" />
                    </div>
                    <span className="font-medium">Free Tracking</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F77FF]/20">
                        <Shield className="h-5 w-5 text-[#1F77FF]" />
                    </div>
                    <span className="font-medium">Insured Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981]/20">
                        <Clock className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <span className="font-medium">On-Time Guarantee</span>
                </div>
            </div>
        </div>
    </div>

    {/* Scroll indicator */}
    <div className="hidden absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60 animate-pulse" />
        </div>
    </div>
</section>
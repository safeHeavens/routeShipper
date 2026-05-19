"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const navItems = [
  { label: "Shipping", href: "/shipping" },
  { label: "Tracking", href: "/tracking" },
  { label: "Locations", href: "/locations" },
  { label: "Support", href: "/support" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animation for navbar elements
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
      
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.children,
          { opacity: 0, y: -10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.1, 
            ease: "power2.out",
            delay: 0.2
          }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#0B1E4A" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/routeshipper-logo.png"
                alt="RouteShipper Global Logistics"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div ref={menuItemsRef} className="hidden -lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-[#1F77FF] ${
                  pathname === item.href ? "text-[#FF7A00]" : "text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full" style={{ backgroundColor: "#FF7A00" }} />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-[#1F77FF] hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                className="gap-2 text-white hover:opacity-90"
                style={{ backgroundColor: "#FF7A00" }}
              >
                <User className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href ? "text-[#FF7A00]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="w-full gap-2 text-white"
                    style={{ backgroundColor: "#FF7A00" }}
                  >
                    <User className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

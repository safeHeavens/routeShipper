"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Air Freight", href: "/shipping#air" },
    { label: "Ocean Freight", href: "/shipping#ocean" },
    { label: "Ground Delivery", href: "/shipping#ground" },
    { label: "Warehousing", href: "/shipping#warehousing" },
    { label: "International", href: "/shipping#international" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Locations", href: "/locations" },
    { label: "News", href: "/news" },
  ],
  support: [
    { label: "Contact Us", href: "/support" },
    { label: "Track Shipment", href: "/tracking" },
    { label: "FAQ", href: "/support#faq" },
    { label: "Help Center", href: "/support" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0B1E4A" }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/routeshipper-logo.png"
                alt="RouteShipper Global Logistics"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-300">
              Global logistics solutions for businesses of all sizes. Fast, reliable, and secure shipping worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF7A00]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FF7A00]">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 transition-colors hover:text-[#1F77FF]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FF7A00]">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 transition-colors hover:text-[#1F77FF]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FF7A00]">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1F77FF]" />
                <span className="text-sm text-gray-300">123 Logistics Way, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#1F77FF]" />
                <a href="tel:+18001234567" className="text-sm text-gray-300 hover:text-[#1F77FF]">
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#1F77FF]" />
                <a href="mailto:info@routeshipper.com" className="text-sm text-gray-300 hover:text-[#1F77FF]">
                  info@routeshipper.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} RouteShipper Global Logistics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#1F77FF]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-[#1F77FF]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

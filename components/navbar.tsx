"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const navItems = [
  {
    label: "Shipping",
    href: "/shipping",
  },
  {
    label: "Tracking",
    href: "/tracking",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Support",
    href: "/support",
  },
  {
    label: "About Company",
    href: "/about",
  },
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
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
          logoRef.current,
          {
            opacity: 0,
            x: -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          }
      );

      if (menuItemsRef.current) {
        gsap.fromTo(
            menuItemsRef.current.children,
            {
              opacity: 0,
              y: -20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.2,
            }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
      <nav
          ref={navRef}
          className={`
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      z-50
      w-[96%]
      max-w-7xl
      transition-all
      duration-500
    `}
      >
        <div
            className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        backdrop-blur-2xl
        transition-all
        duration-500

        ${
                scrolled
                    ? "bg-[#07152d]/75 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.45)]"
                    : "bg-white/10 border-white/15 shadow-[0_10px_40px_rgba(0,0,0,.25)]"
            }
      `}
        >

          {/* Glass Shine */}
          <div
              className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent
        "
          />

          {/* Background Glow */}
          <div
              className="
          absolute
          -right-24
          -top-24
          h-40
          w-48
          rounded-full
          bg-[#FF7A00]/20
          blur-3xl
        "
          />

          <div className="mx-auto max-w-7xl px-4">

            <div className="flex h-20 items-center justify-between lg:h-24">

              {/* ================= Logo ================= */}

              <div ref={logoRef}>

                <Link
                    href="/"
                    className="
                flex
                items-center
                rounded-2xl
              "
                >

                  <Image
                      src="/images/trans-logo.png"
                      alt="LavtradePro Shipments"
                      width={120}
                      height={60}
                      priority
                      className="h-auto w-[120px] lg:w-[120px] -ml-3"
                  />

                </Link>

              </div>

              {/* ================= Desktop Navigation ================= */}

              <div
                  ref={menuItemsRef}
                  className="hidden lg:flex items-center gap-2"
              >
                {navItems.map((item) => {

                  const active = pathname === item.href;

                  return (

                      <Link
                          key={item.href}
                          href={item.href}
                          className={`
                    relative
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-300

                    ${
                              active
                                  ? "bg-white/15 text-[#FF7A00] shadow-[0_0_20px_rgba(255,122,0,.25)]"
                                  : "text-white/90 hover:bg-white/10 hover:text-white hover:scale-105"
                          }
                  `}
                      >
                        {item.label}

                        {active && (
                            <span
                                className="
                        absolute
                        bottom-1
                        left-1/2
                        h-1
                        w-6
                        -translate-x-1/2
                        rounded-full
                        bg-[#FF7A00]
                      "
                            />
                        )}

                      </Link>

                  );

                })}
              </div>

              {/* ================= Right Side ================= */}

              <div className="hidden lg:flex items-center gap-3">

                {/* Client Sign In */}

                <Link href="/login">

                  <Button
                      variant="ghost"
                      className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  px-6
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:bg-white/20
                  hover:text-white
                  hover:scale-105
                "
                  >
                    Sign In
                  </Button>

                </Link>

                {/* CTA */}

                <Link href="/signup">

                  <Button
                      className="
                  group
                  rounded-xl
                  px-6
                  text-white
                  transition-all
                  duration-300

                  bg-gradient-to-r
                  from-[#FF7A00]
                  to-[#FF4500]

                  shadow-[0_0_25px_rgba(255,122,0,.45)]

                  hover:scale-105
                  hover:shadow-[0_0_35px_rgba(255,122,0,.65)]
                "
                  >

                    <User className="mr-1 h-4 w-4 transition-transform group-hover:rotate-12" />

                    Get Started

                  </Button>

                </Link>

              </div>

              {/* ================= Mobile Toggle ================= */}

              <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle Menu"
                  className="
              lg:hidden

              flex
              items-center
              justify-center

              h-12
              w-12

              rounded-2xl

              border
              border-white/10

              bg-white/10

              backdrop-blur-xl

              text-white

              transition-all
              duration-300

              hover:bg-white/20
            "
              >

                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}

              </button>

            </div>

          </div>

          {/* ================= Mobile Menu ================= */}

          <div
              className={`
          overflow-hidden
          transition-all
          duration-500

          ${
                  isOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
              }
        `}
          >

            <div
                className="
            mx-4
            mb-4
            rounded-3xl

            border
            border-white/10

            bg-black/25

            backdrop-blur-2xl

            p-4
          "
            >

              <div className="flex flex-col gap-2">

                {navItems.map((item) => {

                  const active = pathname === item.href;

                  return (

                      <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                    rounded-2xl

                    px-5
                    py-3

                    font-medium

                    transition-all
                    duration-300

                    ${
                              active
                                  ? "bg-white/15 text-[#FF7A00]"
                                  : "text-white hover:bg-white/10"
                          }
                  `}
                      >
                        {item.label}
                      </Link>

                  );

                })}

                <div className="mt-3 border-t border-white/10 pt-4">

                  <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                  >
                    <Button
                        variant="ghost"
                        className="
                    mb-3
                    w-full

                    rounded-2xl

                    border
                    border-white/10

                    bg-white/10

                    text-white

                    hover:bg-white/20
                  "
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                  >

                    <Button
                        className="
                    w-full

                    rounded-2xl

                    bg-gradient-to-r

                    from-[#FF7A00]

                    to-[#FF4500]

                    text-white

                    shadow-[0_0_20px_rgba(255,122,0,.4)]
                  "
                    >
                      <User className="mr-2 h-4 w-4" />

                      Get Started

                    </Button>

                  </Link>

                </div>

              </div>
            </div>
            </div>
          </div>
      </nav>
);
};


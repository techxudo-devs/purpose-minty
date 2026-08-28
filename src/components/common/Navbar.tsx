"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("How it works");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Preview", href: "#preview" },
    { name: "FAQ", href: "#faq" },
    { name: "Demo", href: "#demo" },
  ];

  return (
    <header
      className={`fixed font-dm top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/purposeLogo.png"
                alt="PurposeMint Logo"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Floating Capsule / Pill Navigation Menu (Design from Image 1) */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-purple-900 to-pink-900 backdrop-blur-md rounded-full px-4 py-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#f472b6] font-semibold" // Active Magenta/Pink Color from Theme
                      : "text-white hover:bg-pink-500/50 transition-all duration-300  "
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Waitlist Button & Sparkle Icon Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* CTA Yellow Button from Image 2 */}
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-950 font-semibold text-sm bg-[#facc15] hover:bg-[#eab308] active:scale-95 transition-all duration-300"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gray-300 p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a0022] border-b border-white/10 px-6 pt-4 pb-6 mt-3 space-y-3 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className={`block font-medium py-2 border-b border-white/5 text-base ${
                activeTab === item.name ? "text-[#f472b6]" : "text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-slate-950 font-semibold text-base bg-[#facc15] active:scale-95 transition-all"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { scrollToSection } from "@/lib/smoothScroll";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Goals", href: "#goals" },
  { name: "Benefits", href: "#feature-hub" },
  { name: "Preview", href: "#preview" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Survey", href: "#survey" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Features");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({
        name: item.name,
        el: document.querySelector(item.href),
      }))
      .filter((item): item is { name: string; el: Element } => Boolean(item.el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const match = sections.find((section) => section.el === visible[0].target);
          if (match) setActiveTab(match.name);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section.el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
      event.preventDefault();
      setActiveTab(name);
      setMobileMenuOpen(false);
      scrollToSection(href);
    },
    [],
  );

  const handleWaitlistClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection("#waitlist");
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 font-dm transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex cursor-pointer items-center gap-2">
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

          <nav className="hidden max-w-[min(100%,52rem)] items-center overflow-x-auto rounded-full bg-gradient-to-r from-purple-900 to-pink-900 px-3 py-1.5 backdrop-blur-md scrollbar-none lg:flex">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href, item.name)}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 xl:px-4 xl:text-sm ${
                    isActive
                      ? "font-semibold text-[#f472b6]"
                      : "text-white hover:bg-pink-500/50"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center space-x-3 lg:flex">
            <a
              href="#waitlist"
              onClick={handleWaitlistClick}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#facc15] px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-[#eab308] active:scale-95"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`cursor-pointer p-2 focus:outline-none ${
                isScrolled ? "text-slate-900 hover:text-slate-600" : "text-slate-900 hover:text-slate-700"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mt-3 space-y-1 border-b border-slate-200/80 bg-white/95 px-6 pb-6 pt-4 shadow-2xl backdrop-blur-xl lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href, item.name)}
              className={`block cursor-pointer border-b border-slate-100 py-3 text-base font-medium ${
                activeTab === item.name ? "text-[#c01763]" : "text-slate-700"
              }`}
            >
              {item.name}
            </a>
          ))}

          <div className="flex flex-col gap-3 pt-4">
            <a
              href="#waitlist"
              onClick={handleWaitlistClick}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#facc15] py-3 text-base font-semibold text-slate-950 transition-all active:scale-95"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

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
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
        isScrolled || mobileMenuOpen
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
                className="h-8 w-auto object-contain sm:h-9"
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
                  className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium xl:px-4 xl:text-sm ${
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
              className="motion-btn-lift inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-95"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="motion-btn-lift cursor-pointer rounded-full p-2 text-slate-900 hover:bg-white/60 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block h-6 w-6">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                    mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                    mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden border-slate-200/80 bg-white/95 backdrop-blur-xl transition-[max-height,opacity,transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileMenuOpen
            ? "max-h-[85vh] translate-y-0 border-b opacity-100 shadow-2xl"
            : "pointer-events-none max-h-0 -translate-y-2 border-b border-transparent opacity-0 shadow-none"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href, item.name)}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 45}ms` : "0ms" }}
                className={`motion-btn-lift block cursor-pointer rounded-xl border-b border-slate-100 py-3 text-base font-medium transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                } ${activeTab === item.name ? "text-[#c01763]" : "text-slate-700"}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div
            className={`flex flex-col gap-3 pt-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${navItems.length * 45 + 80}ms` : "0ms" }}
          >
            <a
              href="#waitlist"
              onClick={handleWaitlistClick}
              className="motion-btn-lift inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] py-3 text-base font-semibold text-white hover:opacity-95"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

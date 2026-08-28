"use client";

import React from "react";
import {
  Banknote,
  Coins,
  Lock,
  StickyNote as StickyNoteIcon,
  ExternalLink,
  ShieldCheck,
  Heart,
} from "lucide-react";

// Helper Decor Components using Lucide React Icons
const MoneyBillDecor = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-4 py-2.5 rounded-lg backdrop-blur-md ${className}`}
  >
    <Banknote className="w-6 h-6 text-emerald-600" />
    <span className="text-base font-play tracking-wide">$500</span>
  </div>
);

const CoinBadgeDecor = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#c01763] to-[#52005c] text-white ${className}`}
  >
    <Coins className="w-5 h-5" />
  </div>
);

const StickyNoteDecor = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-amber-100/95 text-amber-950 border border-amber-300/80 p-3.5 rounded-lg backdrop-blur-sm ${className}`}
  >
    <div className="flex items-start gap-1.5">
      <StickyNoteIcon className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
      <div className="text-xs font-dm leading-tight">{children}</div>
    </div>
  </div>
);

export default function DarkSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-10 md:py-10 overflow-hidden bg-[#fdfbf7] text-slate-950"
    >
      {/* ================= 1. TOP-LEFT PINK/MAGENTA GRADIENT GLOW ================= */}
      <div
        className="absolute -top-50 -left-60 w-[550px] sm:w-[550px] h-[550px] sm:h-[550px] pointer-events-none z-0 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.3) 0%, rgba(251, 146, 60, 0.4) 45%, transparent 75%)",
        }}
      />

      {/* ================= 2. BOTTOM-RIGHT YELLOW/ORANGE GRADIENT GLOW ================= */}
      <div
        className="absolute -top-50 -right-60 w-[550px] sm:w-[550px] h-[550px] sm:h-[550px] pointer-events-none z-0 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(253, 224, 71, 0.4) 0%, rgba(244, 114, 182, 0.3) 45%, transparent 75%)",
        }}
      />

      {/* ================= 3. GLITTER / GRAINY NOISE TEXTURE LAYER ================= */}
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Letter Card Area with Floating Lucide Decor */}
        <div className="relative w-full max-w-[420px] sm:max-w-[450px]">
          {/* 1. Floating Money Bill Icon */}
          <div className="absolute -left-12 top-10 hidden sm:block md:-left-28 rotate-[-18deg] z-20">
            <MoneyBillDecor />
          </div>

          {/* 2. Floating Sticky Note Icon */}
          <div className="absolute -right-30 top-0 hidden md:block rotate-[8deg] z-20">
            <StickyNoteDecor className="w-[140px]">
              Paused, not
              <br />
              failed.{" "}
              <Heart className="w-3 h-3 text-pink-600 inline ml-0.5 fill-pink-600" />
            </StickyNoteDecor>
          </div>

          {/* 3. Floating Coin Badge Icon */}
          <CoinBadgeDecor className="absolute -bottom-4 -left-6 z-20" />

          {/* 4. Center Letter Card */}
          <div className="relative rotate-[2.5deg] bg-white text-slate-900 px-8 sm:px-10 py-10 sm:py-12 text-left rounded-2xl border border-pink-200">
            {/* Security Badge Icon inside letter */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-play text-slate-950 font-dm">
                Dear saver,
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium font-dm text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                FDIC-Insured
              </div>
            </div>

            <p className="text-sm font-medium leading-[1.8] text-slate-600 font-dm">
              Millions of families are one flat tire or one missed shift away
              from a payday loan that turns a two-week emergency into five
              months of debt. PurposeMint gives you another way.
            </p>

            <p className="mt-6 text-sm font-medium leading-[1.8] text-slate-600 font-dm">
              Save a little at a time in an FDIC-insured account. Miss a week?
              Paused, not failed. Your first goal isn&apos;t $10,000 — it&apos;s
              $500.
            </p>

            <p className="mt-6 text-sm font-medium font-play leading-[1.8] text-slate-950">
              Start at zero. Build toward what you need.
            </p>

            <div className="mt-10 pt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-base text-slate-950 font-play">
                  PurposeMint
                </p>
                <p className="text-xs font-medium text-pink-400 font-dm">
                  An initiative of Mint To Prosper Foundation
                </p>
              </div>

              {/* Lock Icon */}
              <Lock className="w-4.5 h-4.5 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-8 max-w-[800px] text-center md:mt-10">
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl text-slate-950 font-play tracking-tight">
            Five levels. FDIC-insured savings.
            <br className="hidden sm:block" /> And a real way forward when
            you&apos;re ready.
          </h2> */}

          <a
            href="https://minttoprosper.org/purposemint/partner"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-9 py-4 rounded-full text-white font-medium text-sm font-dm bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] hover:opacity-95 shadow-sm shadow-pink-600/30 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Partner With Us
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

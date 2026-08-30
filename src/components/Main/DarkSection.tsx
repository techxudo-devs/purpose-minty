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

const MoneyBillDecor = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center gap-2 rounded-lg border border-pink-400/40 bg-[#52005c] px-4 py-2.5 text-pink-50 ${className}`}
  >
    <Banknote className="h-6 w-6 text-pink-300" />
    <span className="font-play text-base tracking-wide">$500</span>
  </div>
);

const CoinBadgeDecor = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#c01763] to-[#52005c] text-white shadow-lg shadow-pink-900/40 ${className}`}
  >
    <Coins className="h-5 w-5" />
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
    className={`rounded-lg border border-pink-400/40 bg-[#52005c] p-3.5 text-pink-50 ${className}`}
  >
    <div className="flex items-start gap-1.5">
      <StickyNoteIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-300" />
      <div className="font-dm text-xs leading-tight">{children}</div>
    </div>
  </div>
);

export default function DarkSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[#2E0F3D] py-10 text-white md:py-14"
    >
      <div
        className="pointer-events-none absolute -left-60 -top-50 z-0 h-[550px] w-[550px] rounded-full opacity-80 blur-[90px] sm:h-[550px] sm:w-[550px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(192, 23, 99, 0.45) 0%, rgba(82, 0, 92, 0.35) 45%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-60 -top-50 z-0 h-[550px] w-[550px] rounded-full opacity-80 blur-[90px] sm:h-[550px] sm:w-[550px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.35) 0%, rgba(192, 23, 99, 0.25) 45%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <div className="relative w-full max-w-[420px] sm:max-w-[450px]">
          <div className="absolute -left-12 top-10 z-20 hidden rotate-[-18deg] sm:block md:-left-28">
            <MoneyBillDecor />
          </div>

          <div className="absolute -right-30 top-0 z-20 hidden rotate-[8deg] md:block">
            <StickyNoteDecor className="w-[140px]">
              Paused, not
              <br />
              failed.{" "}
              <Heart className="ml-0.5 inline h-3 w-3 fill-pink-400 text-pink-400" />
            </StickyNoteDecor>
          </div>

          <CoinBadgeDecor className="absolute -bottom-4 -left-6 z-20" />

          <div className="relative isolate w-full max-w-[420px] rotate-[1.5deg] rounded-2xl border border-pink-400/30 bg-[#451752] px-5 py-8 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:max-w-[450px] sm:rotate-[2.5deg] sm:px-8 sm:py-10 md:px-10 md:py-12">
            <div className="mb-8 flex items-center justify-between gap-3">
              <p className="font-play text-sm text-white">Dear saver,</p>
              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-pink-400/40 bg-[#52005c] px-3 py-1 font-dm text-[11px] font-medium text-pink-50">
                <ShieldCheck className="h-3.5 w-3.5 text-pink-200" />
                FDIC-Insured
              </div>
            </div>

            <p className="font-dm text-sm font-medium leading-[1.8] text-pink-50">
              Millions of families are one flat tire or one missed shift away from a payday loan
              that turns a two-week emergency into five months of debt. PurposeMint gives you
              another way.
            </p>

            <p className="mt-6 font-dm text-sm font-medium leading-[1.8] text-pink-50">
              Save a little at a time in an FDIC-insured account. Miss a week? Paused, not failed.
              Your first goal isn&apos;t $10,000 — it&apos;s $500.
            </p>

            <p className="mt-6 font-play text-[15px] font-medium leading-[1.8] text-white">
              Start at zero. Build toward what you need.
            </p>

            <div className="mt-10 flex items-center justify-between border-t border-pink-400/20 pt-5">
              <div>
                <p className="font-play text-base text-white">PurposeMint</p>
                <p className="font-dm text-xs font-medium text-pink-200">
                  An initiative of Mint To Prosper Foundation
                </p>
              </div>

              <Lock className="h-4.5 w-4.5 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="mt-2 max-w-[800px] text-center md:mt-4">
          <a
            href="https://minttoprosper.org/purposemint/partner"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-btn mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-6 py-3.5 font-dm text-sm font-medium text-white shadow-sm shadow-pink-900/40 hover:opacity-95 sm:mt-8 sm:w-auto sm:px-9 sm:py-4"
          >
            Partner With Us
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

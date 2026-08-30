"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PhonePreview from "./PhonePreview";
import { links } from "./site";

const Hero: React.FC = () => {
  // Avatars for the rating badge
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  ];

  return (
    /* ADDED flex-col HERE TO FORCE VERTICAL STACKING (TOP TO BOTTOM) */
    <section className="relative flex w-full flex-col items-center justify-start overflow-hidden bg-[#fdfbf7] pt-24 text-slate-950 sm:pt-30">
      
      {/* ================= 1. CENTER PINK/ORANGE RADIAL GLOW ================= */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] z-0 h-[420px] w-[min(100vw,700px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-80 blur-[75px] sm:h-[600px] sm:w-[950px] md:h-[750px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.7) 0%, rgba(192, 23, 99, 0.45) 35%, rgba(168, 85, 247, 0.25) 65%, transparent 85%)",
        }}
      />

      {/* ================= 2. GLITTER / GRAINY NOISE TEXTURE LAYER ================= */}
      <div 
        className="pointer-events-none absolute left-1/2 top-[45%] z-0 h-[420px] w-[min(100vw,700px)] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay sm:h-[600px] sm:w-[950px] md:h-[750px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
        }}
      />

      {/* ================= TOP HERO TEXT CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        
        {/* Rating Badge */}
        <div className="mb-6 w-full max-w-[min(100%,22rem)] rounded-2xl border border-slate-300/60 bg-white/85 px-3 py-3 font-dm shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] backdrop-blur-md sm:mb-8 sm:inline-flex sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:px-4 sm:py-1.5">
          {/* Avatar Stack */}
          <div className="flex items-center justify-center -space-x-1.5 sm:-space-x-2 sm:justify-start">
            {avatars.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`User ${index + 1}`}
                width={28}
                height={28}
                className="h-6 w-6 rounded-full border-2 border-white object-cover sm:h-7 sm:w-7"
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#e0f2fe] text-[10px] font-bold text-sky-900 sm:h-8 sm:w-8 sm:text-xs">
              60+
            </div>
          </div>

          {/* Waitlist Label & Text */}
          <div className="mt-2.5 flex flex-col items-center gap-1.5 border-t border-slate-200/70 pt-2.5 sm:mt-0 sm:flex-row sm:items-center sm:gap-2 sm:border-0 sm:pt-0 sm:text-left">
            <span className="text-sm font-dm font-medium text-slate-900">In Waitlist</span>
            <span className="px-1 text-center text-[11px] leading-snug text-slate-600 sm:max-w-none sm:px-0 sm:text-left sm:text-sm pt-[2.2px]">
              Most people start at zero. So can you.
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="mb-5 font-play text-[2rem] leading-[1.1] tracking-tight text-slate-950 sm:mb-6 sm:text-5xl md:text-6xl">
          Start with what you have. <br />
          Build toward what you need.
        </h1>

        {/* Paragraph Text */}
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-slate-700 sm:mb-8 sm:text-base md:text-lg font-dm">
          PurposeMint helps you save a little at a time, safely — and turns those savings into a way forward: a car, a home, childcare, a better job. Not a payday loan.
        </p>

        <div
          id="waitlist"
          className="mb-4 flex w-full max-w-lg flex-col items-center gap-3.5 font-dm sm:flex-row sm:justify-center"
        >
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-8 py-3.5 text-base font-medium text-white shadow-[0_8px_24px_-8px_rgba(192,23,99,0.45)] hover:opacity-95 sm:w-auto"
          >
            Start the Demo
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={links.waitlist}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-pink-300 bg-white px-8 py-3.5 text-base font-medium text-[#c01763] shadow-sm hover:border-pink-400 hover:bg-[#fff5f8] sm:w-auto"
          >
            Join the Waitlist
          </a>
        </div>

      </div>

      {/* ================= PHONE PREVIEW AT THE BOTTOM ================= */}
      <div className="w-full relative z-10 flex justify-center -mt-8">
        <PhonePreview />
      </div>

    </section>
  );
};

export default Hero;

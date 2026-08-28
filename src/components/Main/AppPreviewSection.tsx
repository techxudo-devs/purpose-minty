"use client";

import React from "react";
import Image from "next/image";

const phones = [
  {
    src: "/images/preview-purposemap.jpg",
    alt: "PurposeMint PurposeMap connecting Security, Family, and Freedom with a weekly rhythm and daily reflection",
    featured: false,
  },
  {
    src: "/images/preview-home.jpg",
    alt: "PurposeMint home for Maya with this week's purpose, emergency cushion progress, and today's small wins",
    featured: true,
  },
  {
    src: "/images/preview-rhythm.jpg",
    alt: "PurposeMint home showing PurposeMap values, a 4-day streak, and how you're feeling today",
    featured: false,
  },
];

function PreviewPhone({
  src,
  alt,
  featured = false,
}: {
  src: string;
  alt: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 transition-transform duration-300 ${
        featured
          ? "z-20 w-[250px] sm:w-[280px] md:w-[300px]"
          : "z-10 w-[210px] sm:w-[235px] md:w-[250px]"
      } hover:z-30`}
    >
      {/* Glow aura behind featured phone */}
      {featured && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{ background: "rgba(217, 28, 104, 0.28)" }}
          aria-hidden
        />
      )}

      {/* Phone Frame */}
      <div className="relative">
        {/* Hardware side buttons */}
        <span
          className="absolute -left-[3px] top-[88px] h-[24px] w-[3px] rounded-l-sm bg-[#4a2444]"
          aria-hidden
        />
        <span
          className="absolute -left-[3px] top-[120px] h-[44px] w-[3px] rounded-l-sm bg-[#4a2444]"
          aria-hidden
        />
        <span
          className="absolute -right-[3px] top-[110px] h-[56px] w-[3px] rounded-r-sm bg-[#4a2444]"
          aria-hidden
        />

        {/* Device Container */}
        <div
          className={`relative overflow-hidden bg-[#2E0F3D] ${
            featured ? "rounded-[44px] p-[10px]" : "rounded-[38px] p-[8px]"
          }`}
          style={{
            boxShadow:
              "0 30px 60px -12px rgba(46, 15, 61, 0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
        >
          <div
            className={`overflow-hidden bg-white ${
              featured ? "rounded-[34px]" : "rounded-[30px]"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              width={390}
              height={844}
              className="h-auto w-full object-cover"
              sizes={featured ? "300px" : "250px"}
              priority={featured}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppPreviewSection() {
  return (
    <section
      id="preview"
      className="relative w-full py-10 pb-14 overflow-hidden bg-[#fdfbf7] text-slate-950"
    >
      {/* ================= 1. CENTER PINK/ORANGE RADIAL GLOW ================= */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[550px] sm:h-[700px] pointer-events-none z-0 rounded-full opacity-80 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.6) 0%, rgba(251, 146, 60, 0.35) 40%, rgba(253, 224, 71, 0.2) 65%, transparent 65%)",
        }}
      />

      {/* ================= 2. GLITTER / GRAINY NOISE TEXTURE LAYER ================= */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ================= SECTION CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-play text-slate-950 tracking-tighter">
        App Preview
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg font-dm text-slate-600 max-w-lg mx-auto leading-relaxed">
          A glimpse into your financial wellness journey
        </p>

        {/* Desktop 3-Phone Row Layout */}
        <div className="relative mx-auto mt-14 hidden sm:flex max-w-[1020px] items-end justify-center">
          {/* Left Phone */}
          <div className="origin-bottom translate-y-6 scale-[0.92] sm:-mr-8 lg:-mr-12 hover:scale-[0.95] hover:z-30 transition-all duration-300">
            <PreviewPhone src={phones[0].src} alt={phones[0].alt} />
          </div>

          {/* Center Featured Phone */}
          <div className="relative z-20 hover:scale-[1.02] hover:z-30 transition-all duration-300">
            <PreviewPhone src={phones[1].src} alt={phones[1].alt} featured />
          </div>

          {/* Right Phone */}
          <div className="origin-bottom translate-y-6 scale-[0.92] sm:-ml-8 lg:-ml-12 hover:scale-[0.95] hover:z-30 transition-all duration-300">
            <PreviewPhone src={phones[2].src} alt={phones[2].alt} />
          </div>
        </div>

        {/* Mobile Horizontal Scrollable View */}
        <div className="mt-10 flex items-end justify-start gap-4 overflow-x-auto px-4 pb-6 sm:hidden scrollbar-none">
          {phones.map((phone) => (
            <PreviewPhone
              key={phone.src}
              src={phone.src}
              alt={phone.alt}
              featured={phone.featured}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
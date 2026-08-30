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
    src: "/images/image-copy.png",
    alt: "PurposeMint Reflections screen with today's prompt and a recent journal entry connected to Security",
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
          ? "z-20 w-[min(72vw,250px)] sm:w-[280px] md:w-[300px]"
          : "z-10 w-[min(68vw,210px)] sm:w-[235px] md:w-[250px]"
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
      className="relative w-full overflow-hidden bg-[#fdfbf7] py-10 pb-12 text-slate-950 sm:pb-14"
    >
      {/* ================= 1. CENTER PINK/ORANGE RADIAL GLOW ================= */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[550px] sm:h-[700px] pointer-events-none z-0 rounded-full opacity-80 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.6) 0%, rgba(192, 23, 99, 0.35) 40%, rgba(168, 85, 247, 0.2) 65%, transparent 65%)",
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
        <h2 className="font-play text-2xl tracking-tighter text-slate-950 sm:text-4xl md:text-5xl">
        App Preview
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-3 max-w-lg font-dm text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base md:text-lg">
          A glimpse into your financial wellness journey
        </p>

        {/* Desktop 3-Phone Row Layout */}
        <div className="relative mx-auto mt-8 flex max-w-[1020px] flex-col items-center gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-center sm:gap-0">
          {/* Left Phone */}
          <div className="origin-bottom transition-all duration-300 sm:scale-[0.92] sm:-mr-8 sm:translate-y-6 lg:-mr-12 lg:hover:scale-[0.95] lg:hover:z-30">
            <PreviewPhone src={phones[0].src} alt={phones[0].alt} />
          </div>

          {/* Center Featured Phone */}
          <div className="relative z-20 transition-all duration-300 sm:hover:scale-[1.02] sm:hover:z-30">
            <PreviewPhone src={phones[1].src} alt={phones[1].alt} featured />
          </div>

          {/* Right Phone */}
          <div className="origin-bottom transition-all duration-300 sm:scale-[0.92] sm:-ml-8 sm:translate-y-6 lg:-ml-12 lg:hover:scale-[0.95] lg:hover:z-30">
            <PreviewPhone src={phones[2].src} alt={phones[2].alt} />
          </div>
        </div>

      </div>
    </section>
  );
}

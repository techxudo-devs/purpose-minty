"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import PhonePreview from "./PhonePreview";

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");

  // Avatars for the rating badge
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist email submitted:", email);
  };

  return (
    /* ADDED flex-col HERE TO FORCE VERTICAL STACKING (TOP TO BOTTOM) */
    <section className="relative w-full flex flex-col items-center justify-start bg-[#fdfbf7] text-slate-950 pt-28 pb-16">
      
      {/* ================= 1. CENTER PINK/ORANGE RADIAL GLOW ================= */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[600px] sm:h-[750px] pointer-events-none z-0 rounded-full opacity-80 blur-[75px] overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.7) 0%, rgba(251, 146, 60, 0.45) 35%, rgba(253, 224, 71, 0.25) 65%, transparent 85%)",
        }}
      />

      {/* ================= 2. GLITTER / GRAINY NOISE TEXTURE LAYER ================= */}
      <div 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[600px] sm:h-[750px] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
        }}
      />

      {/* ================= TOP HERO TEXT CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-3 bg-white/80 border border-slate-300/60 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 font-dm">
          {/* Avatar Stack */}
          <div className="flex items-center -space-x-2">
            {avatars.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`User ${index + 1}`}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#e0f2fe] text-sky-900 font-bold text-xs flex items-center justify-center">
              60+
            </div>
          </div>

          {/* Stars & Text */}
          <div className="flex items-center gap-2 text-left">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                />
              ))}
            </div>
            <span className="text-slate-900 font-bold text-sm">4.8</span>
            <span className="text-slate-600 text-sm font-normal">
              Most people start at zero. So can you.
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-6xl font-play text-slate-950 tracking-tight leading-[1.08] mb-6">
          Start with what you have. <br />
          Build toward what you need.
        </h1>

        {/* Paragraph Text */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8 font-dm">
          PurposeMint helps you save a little at a time, safely — and turns those savings into a way forward: a car, a home, childcare, a better job. Not a payday loan.
        </p>

        {/* Waitlist Form */}
        <form
          id="waitlist"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-lg mx-auto font-dm mb-4"
        >
          {/* Email Input Field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full sm:flex-1 px-6 py-3.5 rounded-full bg-white border border-pink-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 text-slate-800 placeholder-[#7c3aed]/60 text-base transition-all duration-200"
          />

          {/* Magenta Gradient Waitlist Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-medium text-base bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] hover:opacity-95 shadow-pink-600/30 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Join the Waitlist
          </button>
        </form>

      </div>

      {/* ================= PHONE PREVIEW AT THE BOTTOM ================= */}
      <div className="w-full relative z-10 flex justify-center -mt-8">
        <PhonePreview />
      </div>

    </section>
  );
};

export default Hero;
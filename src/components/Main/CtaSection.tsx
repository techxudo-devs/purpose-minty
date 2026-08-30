"use client";

import { ArrowRight, Heart, LifeBuoy, ShieldCheck } from "lucide-react";
import { links } from "./site";

const trustItems = [
  { label: "FDIC-insured", icon: ShieldCheck },
  { label: "No judgment", icon: Heart },
  { label: "Real, secure support", icon: LifeBuoy },
];

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-[#2E0F3D] py-16 text-white sm:py-10 md:py-10"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 z-0 h-[420px] w-[420px] rounded-full opacity-90 blur-[100px] sm:h-[520px] sm:w-[520px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(192, 23, 99, 0.55) 0%, rgba(82, 0, 92, 0.35) 45%, transparent 72%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 z-0 h-[420px] w-[420px] rounded-full opacity-90 blur-[100px] sm:h-[520px] sm:w-[520px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.45) 0%, rgba(192, 23, 99, 0.28) 45%, transparent 72%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.28) 0%, rgba(124, 58, 237, 0.18) 50%, transparent 78%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl rounded-[28px] border border-pink-400/20 p-[1px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,114,182,0.45), rgba(255,255,255,0.08), rgba(168,85,247,0.4))",
          }}
        >
          <div className="rounded-[27px] border border-white/5 bg-[#451752]/55 px-6 py-10 backdrop-blur-xl sm:px-10 sm:py-12 md:px-14 md:py-14">
            <h2 className="font-play text-[1.75rem] leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
              Start at zero.{" "}
              <span
                className="bg-gradient-to-r from-[#f472b6] via-[#fb7185] to-[#c084fc] bg-clip-text text-transparent"
              >
                Build your next $500.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl font-dm text-[15px] leading-relaxed text-pink-100/80 sm:mt-6 sm:text-base md:text-lg">
              Five levels. FDIC-insured savings. And a real way forward when
              you&apos;re ready.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href={links.waitlist}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-8 py-3.5 font-dm text-base font-medium text-white hover:opacity-95 sm:w-auto"
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-pink-300/35 bg-white/8 px-8 py-3.5 font-dm text-base font-medium text-white backdrop-blur-sm hover:border-pink-200/50 hover:bg-white/12 sm:w-auto"
              >
                Try the Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          {trustItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 font-dm text-[13px] font-medium text-pink-100/75 sm:text-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/25 bg-[#52005c]/60">
                <Icon className="h-3.5 w-3.5 text-pink-200" strokeWidth={2.25} aria-hidden />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

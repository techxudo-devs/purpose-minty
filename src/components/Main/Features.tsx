"use client";

import React from "react";

// 1. Start Where You Are (Compass / Navigation)
const StartWhereYouAreIcon = () => (
  <svg
    className="w-5 h-5 text-slate-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// 2. Save A Little (Piggy Bank / Coins)
const SaveALittleIcon = () => (
  <svg
    className="w-5 h-5 text-slate-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h2v2h4v-3.5c1-.8 2-1.8 2-3.5 0-3-1-4-1-4" />
    <circle cx="16" cy="11" r="1" fill="currentColor" />
    <path d="M11 2v4" />
    <path d="M9 4h4" />
  </svg>
);

// 3. Lock the Cushion (Padlock / Cushion)
const LockCushionIcon = () => (
  <svg
    className="w-5 h-5 text-slate-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" />
  </svg>
);

// 4. Paused, Not Failed (Pause & Life Happens)
const PausedNotFailedIcon = () => (
  <svg
    className="w-5 h-5 text-slate-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="10" y1="9" x2="10" y2="15" strokeWidth="2.2" />
    <line x1="14" y1="9" x2="14" y2="15" strokeWidth="2.2" />
  </svg>
);

// 5. Unlock a Pathway (Key & Milestone)
const UnlockPathwayIcon = () => (
  <svg
    className="w-5 h-5 text-slate-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="M10.7 12.3L19 4" />
    <path d="M15.5 7.5L18 10" />
    <path d="M18 5l2 2" />
  </svg>
);

// 5 Cards Configuration with PurposeMint Icons
const featureCards = [
  {
    id: "start-where-you-are",
    title: "Start\nWhere You Are",
    description: "Start with what you have. Join the waitlist or try the demo. Your first real goal isn’t $10,000 — it’s $500, and we’ll prove it’s possible.",
    Icon: StartWhereYouAreIcon,
    rotation: "-rotate-[6deg]",
    translateY: "translate-y-6 sm:translate-y-8",
    zIndex: "z-10",
    gradientFrom: "#facc15", // Yellow
    gradientTo: "#38bdf8", // Cyan
    arcPath: "M -10 130 Q 80 180 180 80",
    trackPath: "M -10 160 Q 80 210 180 110",
  },
  {
    id: "save-a-little",
    title: "Save A Little",
    description: "Build the habit, not the guilt. Round-ups, payday rules, and gentle nudges — so saving is something you do, not something you feel guilty skipping.",
    Icon: SaveALittleIcon,
    rotation: "-rotate-[3deg]",
    translateY: "translate-y-2 sm:translate-y-3",
    zIndex: "z-20",
    gradientFrom: "#38bdf8", // Cyan
    gradientTo: "#84cc16", // Lime
    arcPath: "M -20 80 Q 70 0 180 40",
    trackPath: "M -20 120 Q 70 40 180 80",
  },
  {
    id: "lock-the-cushion",
    title: "Lock the cushion",
    description: "Block your own withdrawals. You choose the delay. $500 that a flat tire can’t turn into a payday loan.",
    Icon: LockCushionIcon,
    rotation: "rotate-0",
    translateY: "-translate-y-2 sm:-translate-y-3",
    zIndex: "z-30", // Center top card
    gradientFrom: "#84cc16", // Lime
    gradientTo: "#c084fc", // Purple
    arcPath: "M -20 40 Q 90 120 180 160",
    trackPath: "M -20 0 Q 90 80 180 120",
  },
  {
    id: "paused-not-failed",
    title: "Paused, not failed",
    description: "Life happens. Pick it back up. No punishment, no reset, no lecture. Resume when you’re ready.",
    Icon: PausedNotFailedIcon,
    rotation: "rotate-[3deg]",
    translateY: "translate-y-2 sm:translate-y-3",
    zIndex: "z-20",
    gradientFrom: "#c084fc", // Purple
    gradientTo: "#facc15", // Yellow
    arcPath: "M -20 160 Q 70 20 180 60",
    trackPath: "M -20 120 Q 70 -20 180 20",
  },
  {
    id: "unlock-a-pathway",
    title: "Unlock a pathway",
    description: "After your next $500. Your savings become proof you’re ready — then we match you with fair partners. Not a payday loan.",
    Icon: UnlockPathwayIcon,
    rotation: "rotate-[6deg]",
    translateY: "translate-y-6 sm:translate-y-8",
    zIndex: "z-10",
    gradientFrom: "#facc15", // Yellow
    gradientTo: "#ef4444", // Red
    arcPath: "M -20 60 Q 80 160 180 120",
    trackPath: "M -20 20 Q 80 120 180 80",
  },
];

const Features: React.FC = () => {
  return (
    <section className="relative w-full py-10 sm:py-10 bg-[#fbfcfd] overflow-hidden flex flex-col items-center justify-center" id="features">
      {/* Subtle Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Background Glow Under Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-100/30 via-purple-100/40 to-amber-100/30 rounded-full pointer-events-none -z-10" />

      {/* Top Heading & Short Paragraph */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-10 sm:mb-14 relative z-10">
        <h2 className="mb-3 font-play text-2xl tracking-tight text-slate-950 sm:mb-4 sm:text-4xl md:text-5xl">
          You're not bad with money. <br className="hidden sm:block" />You've just been handed bad options.
        </h2>
        <p className="mx-auto max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
          Manage deployments, pipelines, and environments seamlessly in one
          unified platform.
        </p>
      </div>

      {/* Mobile: stacked cards */}
      <div className="relative z-10 mx-auto grid w-full max-w-md grid-cols-1 gap-4 px-4 sm:max-w-lg sm:gap-5 lg:hidden">
        {featureCards.map((card) => {
          const Icon = card.Icon;
          return (
            <div
              key={card.id}
              className="group relative flex h-auto min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-5"
            >
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
                viewBox="0 0 160 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`grad-mobile-${card.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={card.gradientFrom} />
                    <stop offset="100%" stopColor={card.gradientTo} />
                  </linearGradient>
                </defs>
                <path d={card.trackPath} stroke="rgba(0, 0, 0, 0.04)" strokeWidth="14" fill="none" strokeLinecap="round" />
                <path d={card.arcPath} stroke={`url(#grad-mobile-${card.id})`} strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
                  <Icon />
                </div>
                <h3 className="whitespace-pre-line text-right font-dm text-sm leading-tight tracking-tight text-slate-900">
                  {card.title}
                </h3>
              </div>
              <div className="relative z-10 mt-auto pt-4">
                <p className="font-dm text-xs leading-snug text-slate-600">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: arc layout */}
      <div className="relative z-10 mx-auto hidden w-full max-w-6xl items-center justify-center px-4 pb-12 pt-4 sm:px-6 lg:flex lg:px-8">
        <div className="flex min-w-0 items-center justify-center -space-x-6 sm:-space-x-8 md:-space-x-10">
          {featureCards.map((card) => {
            const Icon = card.Icon;
            return (
              <div
                key={card.id}
                className={`relative group w-40 sm:w-48 md:w-58 h-64 sm:h-72 md:h-80 bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-5 flex flex-col justify-between transition-all duration-300 transform ${card.rotation} ${card.translateY} ${card.zIndex} hover:-translate-y-4 hover:z-50 cursor-pointer overflow-hidden flex-shrink-0 `}
              >
                {/* SVG Gradient Rainbow Arc Passing Through Card */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 160 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={`grad-${card.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={card.gradientFrom} />
                      <stop offset="100%" stopColor={card.gradientTo} />
                    </linearGradient>
                  </defs>

                  {/* Secondary Track Line */}
                  <path
                    d={card.trackPath}
                    stroke="rgba(0, 0, 0, 0.04)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Main Glowing Color Line */}
                  <path
                    d={card.arcPath}
                    stroke={`url(#grad-${card.id})`}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Top Row: Icon (Left) & Title (Top Right) */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>

                  <h3 className="text-xs sm:text-sm font-dm text-slate-900 tracking-tight leading-tight whitespace-pre-line text-right">
                    {card.title}
                  </h3>
                </div>

                {/* Bottom Row: Small Paragraph Description (Where Title Was) */}
                <div className="relative z-10 mt-auto pt-6">
                  <p className="text-[11px] sm:text-xs font-dm text-slate-600 leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Subtitle Tagline */}
      <div className="mt-4 text-center relative z-10 px-4">
        <p className="text-[11px] sm:text-xs font-dm font-medium text-slate-400 tracking-wider uppercase">
          Your first goal isn't $10,000. It's $500 — and we prove it's possible.S
        </p>
      </div>
    </section>
  );
};

export default Features;
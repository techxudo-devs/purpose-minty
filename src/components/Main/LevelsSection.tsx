"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Coins,
  KeyRound,
  Lock,
  Route,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const leftPills = [
  {
    title: "Stash your first dollar",
    description: "Round-ups and payday rules start where you are.",
    icon: Coins,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#8d0543]/90",
  },
  {
    title: "Hit your next $500",
    description: "Build a cushion a flat tire can't wipe out.",
    icon: ShieldCheck,
    accent: "from-[#c084fc]/90 via-[#7c3aed]/90 to-[#52005c]/90",
  },
  {
    title: "Keep a streak alive",
    description: "Lock tools and nudges that keep you consistent.",
    icon: Lock,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#7c3aed]/90",
  },
];

const rightPills = [
  {
    title: "Grow the buffer",
    description: "Rent gaps, childcare, job transitions — covered.",
    icon: TrendingUp,
    accent: "from-[#c084fc]/90 via-[#9333ea]/90 to-[#52005c]/90",
  },
  {
    title: "Unlock a Pathway",
    description: "Your savings become proof you're ready.",
    icon: KeyRound,
    accent: "from-[#c01763]/90 via-[#b00f57]/90 to-[#52005c]/90",
  },
  {
    title: "Pathways",
    description: "Car, housing, childcare — fair partners ahead.",
    icon: Route,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#7c3aed]/90",
    featured: true,
  },
];

type PillData = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  featured?: boolean;
};

type ConnectorLine = {
  d: string;
};

function connectorPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  index: number,
  total: number,
) {
  const dx = x2 - x1;
  const t = total <= 1 ? 0.5 : index / (total - 1);
  const bow = (0.5 - t) * 42;

  const c1x = x1 + dx * 0.38;
  const c2x = x1 + dx * 0.72;
  const c1y = y1 + bow * 0.25;
  const c2y = y2 + bow * 0.9;

  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

function LevelPill({
  title,
  description,
  icon: Icon,
  accent,
  featured = false,
}: PillData) {
  if (featured) {
    return (
      <div
        className="relative w-full rounded-[20px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(244,114,182,0.95), rgba(192,23,99,0.75), rgba(124,58,237,0.9))",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[19px] px-4 py-3.5 sm:px-5 sm:py-4"
          style={{
            background:
              "linear-gradient(145deg, #c01763 0%, #b00f57 38%, #7c3aed 72%, #52005c 100%)",
          }}
        >
          <div className="pill-shimmer-level pointer-events-none absolute inset-0 opacity-30" aria-hidden />

          <div className="relative flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/30 bg-gradient-to-br ${accent}`}
            >
              <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.25} aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="font-play text-[14px] leading-tight text-white sm:text-[15px]">
                {title}
              </h3>
              <p className="mt-1 font-dm text-[12px] leading-snug text-pink-100/85 sm:text-[13px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-[20px] p-[1px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(244,114,182,0.45), rgba(255,255,255,0.2), rgba(168,85,247,0.4))",
      }}
    >
      <div className="relative overflow-hidden rounded-[19px] border border-white/70 bg-white/45 px-4 py-3.5 backdrop-blur-2xl backdrop-saturate-[1.75] sm:px-5 sm:py-4">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/50 to-transparent"
          aria-hidden
        />
        <div className="pill-shimmer-level pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/60 bg-gradient-to-br ${accent}`}
          >
            <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0">
            <h3 className="font-play text-[14px] leading-tight text-[#2E0F3D] sm:text-[15px]">
              {title}
            </h3>
            <p className="mt-1 font-dm text-[12px] leading-snug text-slate-600 sm:text-[13px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LevelsSection() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const leftPillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<ConnectorLine[]>([]);

  const updateLines = useCallback(() => {
    const layout = layoutRef.current;
    const video = videoRef.current;

    if (!layout || !video || window.innerWidth < 1024) {
      setLines([]);
      return;
    }

    const layoutRect = layout.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();
    const nextLines: ConnectorLine[] = [];

    const headY = videoRect.top + videoRect.height * 0.34 - layoutRect.top;
    const attachLeftX = videoRect.left - layoutRect.left + videoRect.width * 0.46;
    const attachRightX = videoRect.right - layoutRect.left - videoRect.width * 0.46;
    const leftCount = leftPillRefs.current.filter(Boolean).length;
    const rightCount = rightPillRefs.current.filter(Boolean).length;

    leftPillRefs.current.forEach((pill, index) => {
      if (!pill) return;
      const pillRect = pill.getBoundingClientRect();
      const y1 = pillRect.top + pillRect.height / 2 - layoutRect.top;
      const x1 = pillRect.right - layoutRect.left + 4;
      const y2 = y1 + (headY - y1) * 0.62;

      nextLines.push({
        d: connectorPath(x1, y1, attachLeftX, y2, index, leftCount),
      });
    });

    rightPillRefs.current.forEach((pill, index) => {
      if (!pill) return;
      const pillRect = pill.getBoundingClientRect();
      const y1 = pillRect.top + pillRect.height / 2 - layoutRect.top;
      const x1 = pillRect.left - layoutRect.left - 4;
      const y2 = y1 + (headY - y1) * 0.62;

      nextLines.push({
        d: connectorPath(x1, y1, attachRightX, y2, index, rightCount),
      });
    });

    setLines(nextLines);
  }, []);

  useEffect(() => {
    updateLines();

    const layout = layoutRef.current;
    if (!layout) return;

    const observer = new ResizeObserver(updateLines);
    observer.observe(layout);

    window.addEventListener("resize", updateLines);
    window.addEventListener("load", updateLines);

    const timer = window.setTimeout(updateLines, 120);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLines);
      window.removeEventListener("load", updateLines);
      window.clearTimeout(timer);
    };
  }, [updateLines]);

  return (
    <section id="levels" className="relative w-full overflow-hidden bg-[#FBF8FB] py-10 sm:py-10 md:py-10">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-play text-2xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Five levels. Start at zero.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:text-base">
            Each level is small enough to finish and worth celebrating.
          </p>
        </div>

        <div ref={layoutRef} className="relative mt-10 lg:mt-14">
          {lines.length > 0 ? (
            <svg
              className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block"
              aria-hidden
            >
              {lines.map((line, index) => (
                <path
                  key={index}
                  d={line.d}
                  stroke="rgba(203, 213, 225, 0.95)"
                  strokeWidth="1.75"
                  strokeDasharray="4 7"
                  strokeLinecap="round"
                  fill="none"
                />
              ))}
            </svg>
          ) : null}

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(200px,300px)_minmax(0,1fr)] lg:gap-4 xl:gap-6">
            <div className="order-2 flex w-full flex-col gap-4 lg:order-1 lg:items-end lg:gap-5">
              {leftPills.map((pill, index) => (
                <div
                  key={pill.title}
                  ref={(el) => {
                    leftPillRefs.current[index] = el;
                  }}
                  className="mx-auto w-full max-w-[400px] lg:mx-0"
                >
                  <LevelPill {...pill} />
                </div>
              ))}
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <div ref={videoRef} className="relative w-full max-w-[280px] sm:max-w-[320px]">
                <video
                  src="/girl2.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={updateLines}
                  className="relative z-10 h-auto w-full object-cover"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.55) 88%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.55) 88%, transparent 100%)",
                  }}
                  aria-label="PurposeMint member preview"
                />
              </div>
            </div>

            <div className="order-3 flex w-full flex-col gap-4 lg:items-start lg:gap-5">
              {rightPills.map((pill, index) => (
                <div
                  key={pill.title}
                  ref={(el) => {
                    rightPillRefs.current[index] = el;
                  }}
                  className="mx-auto w-full max-w-[400px] lg:mx-0"
                >
                  <LevelPill {...pill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes levelPillShimmer {
          0% {
            transform: translateX(-130%) skewX(-14deg);
          }
          100% {
            transform: translateX(230%) skewX(-14deg);
          }
        }
        .pill-shimmer-level {
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 70%
          );
          animation: levelPillShimmer 5.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pill-shimmer-level {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

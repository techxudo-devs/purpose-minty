"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  Heart,
  LifeBuoy,
  PauseCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const floatingPills: {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  borderGradient: string;
  position: string;
  floatDelay: string;
  floatDuration: string;
}[] = [
  {
    id: "fdic",
    title: "FDIC-insured",
    subtitle: "Bank-level protection",
    icon: ShieldCheck,
    accent: "from-[#c084fc]/90 via-[#7c3aed]/90 to-[#52005c]/90",
    borderGradient:
      "linear-gradient(135deg, rgba(192,132,252,0.65), rgba(255,255,255,0.35), rgba(82,0,92,0.55))",
    position: "left-2 md:left-30 top-15 -rotate-[8deg]",
    floatDelay: "0s",
    floatDuration: "5s",
  },
  {
    id: "no-judgment",
    title: "No judgment",
    subtitle: "Start where you are",
    icon: Heart,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#8d0543]/90",
    borderGradient:
      "linear-gradient(135deg, rgba(244,114,182,0.65), rgba(255,255,255,0.35), rgba(192,23,99,0.55))",
    position: "left-2 md:left-45 top-[58%]",
    floatDelay: "1.1s",
    floatDuration: "4.6s",
  },
  {
    id: "secure-support",
    title: "Real, secure support",
    subtitle: "Humans who get it",
    icon: LifeBuoy,
    accent: "from-violet-400/90 via-purple-500/90 to-[#7c3aed]/90",
    borderGradient:
      "linear-gradient(135deg, rgba(167,139,250,0.65), rgba(255,255,255,0.35), rgba(124,58,237,0.55))",
    position: "right-2 md:right-38 top-32",
    floatDelay: "2s",
    floatDuration: "4.8s",
  },
  {
    id: "paused",
    title: "Paused, not failed",
    subtitle: "Life happens — resume anytime",
    icon: PauseCircle,
    accent: "from-fuchsia-400/90 via-[#c01763]/90 to-violet-600/90",
    borderGradient:
      "linear-gradient(135deg, rgba(232,121,249,0.65), rgba(255,255,255,0.35), rgba(124,58,237,0.55))",
    position: "right-2 md:right-24 top-[52%]",
    floatDelay: "0.5s",
    floatDuration: "5.2s",
  },
];

function FloatingPill({
  title,
  subtitle,
  icon: Icon,
  accent,
  borderGradient,
  position,
  floatDelay,
  floatDuration,
}: (typeof floatingPills)[number]) {
  return (
    <div className={`absolute z-20 hidden sm:block ${position}`}>
      <div
        className="pill-float relative rounded-2xl p-[1px]"
        style={{
          background: borderGradient,
          animationDelay: floatDelay,
          animationDuration: floatDuration,
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-white/40 px-4 py-3.5 backdrop-blur-2xl backdrop-saturate-[1.75]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/55 to-transparent"
            aria-hidden
          />
          <div className="pill-shimmer pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative flex items-center gap-3.5">
            <div
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br ${accent} backdrop-blur-sm`}
            >
              <div
                className="absolute inset-0 rounded-[16px] bg-gradient-to-tr from-white/45 via-white/10 to-transparent"
                aria-hidden
              />
              <Icon className="relative h-[22px] w-[22px] text-white" strokeWidth={2.35} aria-hidden />
              <span className="pill-spark absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white" aria-hidden />
            </div>

            <div className="min-w-0">
              <p className="whitespace-nowrap font-play text-[14px] leading-tight text-[#2E0F3D]">
                {title}
              </p>
              <p className="mt-0.5 whitespace-nowrap font-dm text-[11px] font-medium text-slate-600/90">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const goals = [
  { name: "Fresh Haircut Fund", now: "$38 of $50", pct: "76%", icon: "💇" },
  { name: "Self-Care Sunday", now: "$42 of $50", pct: "84%", icon: "✨" },
  { name: "Coffee Joy Runs", now: "$8 of $25", pct: "32%", icon: "☕" },
  { name: "Emergency Rainy Day", now: "$160 of $200", pct: "80%", icon: "☔" },
];

/** Content is authored for ~280px-wide screens; scale down when the mockup is narrower. */
const PHONE_SCREEN_BASE_WIDTH = 280;

function usePhoneScreenScale(
  ref: RefObject<HTMLDivElement | null>,
  baseWidth = PHONE_SCREEN_BASE_WIDTH,
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;
      setScale(Math.min(1, width / baseWidth));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [baseWidth]);

  return scale;
}

function GoalsScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-pink-100 bg-white px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">Hey Queen 👑</span>
        <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-medium font-dm text-[#c01763]">
          You&apos;re doing amazing
        </span>
      </div>
      <div className="flex-1 bg-white px-5 py-4">
        <p className="text-[11px] font-medium font-dm tracking-wider uppercase text-slate-400">
          Total Saved
        </p>
        <p className="mt-1 text-[32px] font-play leading-none text-[#2E0F3D]">$247.50</p>
        <p className="mt-1.5 text-[13px] font-medium font-dm text-[#c01763]">+$12 this week!</p>

        <p className="mt-5 text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400">
          Your Goals
        </p>
        <div className="mt-2 space-y-2.5">
          {goals.map((goal) => (
            <div
              key={goal.name}
              className="flex items-center justify-between rounded-2xl border border-pink-100 bg-[#fff5f8] px-3.5 py-2.5"
            >
              <div className="min-w-0 pr-2">
                <p className="truncate text-[13px] font-play text-[#2E0F3D]">
                  {goal.icon} {goal.name}
                </p>
                <p className="text-[11px] font-medium font-dm text-slate-500">{goal.now}</p>
              </div>
              <span className="shrink-0 text-[13px] font-medium font-dm text-[#c01763]">
                {goal.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddGoalScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">Add a New Goal</span>
      </div>
      <div className="flex-1 px-5 py-5">
        <p className="text-[13px] font-semibold text-slate-600">What are you saving for?</p>
        <p className="mt-4 text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400">
          Goal name
        </p>
        <div className="mt-1.5 rounded-2xl border border-pink-100 bg-[#fff5f8] px-4 py-3 text-[13px] font-medium font-dm text-[#2E0F3D]">
          Coffee Joy Runs ☕
        </div>
        <p className="mt-4 text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400">
          Target amount
        </p>
        <div className="mt-1.5 rounded-2xl border border-pink-100 bg-[#fff5f8] px-4 py-3 text-[13px] font-medium font-dm text-[#2E0F3D]">
          $25.00
        </div>
        <div className="mt-6 h-11 rounded-full text-center text-[13px] font-medium font-dm leading-[44px] text-white bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] shadow-md shadow-pink-600/20">
          Create Goal
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  const rows = [
    { label: "Money", hint: "Build stability", pct: "72%" },
    { label: "Mindset", hint: "Grow confidence", pct: "58%" },
    { label: "Motivation", hint: "Stay inspired", pct: "85%" },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">Your PurposeMap™</span>
      </div>
      <div className="flex-1 px-5 py-5">
        <p className="text-[13px] font-medium font-dm text-slate-600">
          Align savings with your values
        </p>
        <div className="mt-5 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-[13px] font-medium font-dm text-[#2E0F3D]">
                <span>{row.label}</span>
                <span className="text-[#c01763]">{row.pct}</span>
              </div>
              <p className="text-[11px] font-dm text-slate-400">{row.hint}</p>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-pink-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c01763] to-[#8d0543]"
                  style={{ width: row.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PathwaysScreen() {
  const items = ["Auto", "Housing", "Childcare", "Workforce"];
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">PurposeMint Pathways</span>
      </div>
      <div className="flex-1 px-5 py-5">
        <p className="text-[11px] font-medium tracking-wide font-play uppercase text-[#c01763]">
          Stability → Mobility
        </p>
        <p className="mt-1 text-[13px] font-medium font-dm text-slate-600">
          Select your major goal
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-pink-100 bg-[#fff5f8] px-4 py-3 text-center text-[13px] font-play text-[#2E0F3D]"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] font-medium font-dm text-slate-400">
          Build readiness. Connect with partners.
        </p>
      </div>
    </div>
  );
}

function PausedScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">Goal Paused</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-5 text-center">
        <p className="text-[32px]" aria-hidden>
          💜
        </p>
        <p className="mt-3 text-[17px] font-play leading-snug text-[#2E0F3D]">
          No worries! Life happens.
        </p>
        <p className="mt-1.5 text-[12px] font-medium font-dm leading-snug text-slate-500">
          Resume when you&apos;re ready. Need more time? That&apos;s okay.
        </p>
        <div className="mt-5 w-full h-11 rounded-full text-center text-[13px] font-medium leading-[44px] text-white bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] shadow-md font-dm shadow-pink-600/20">
          Resume Saving
        </div>
      </div>
    </div>
  );
}

const screens = [
  { id: "goals" },
  { id: "add" },
  { id: "map" },
  { id: "path" },
  { id: "pause" },
];

/** Measured inset of the black screen area inside hand.png (1080×1599) */
const HAND_SCREEN = {
  top: "1.8%",
  left: "12.8%",
  width: "45%",
  height: "64.8%",
  radius: "9%",
} as const;

function StatusIcons() {
  return (
    <svg className="h-[10px] w-auto" viewBox="0 0 56 12" fill="none" aria-hidden>
      <rect x="0" y="4" width="3" height="4" rx="0.6" fill="#2E0F3D" />
      <rect x="5" y="2.5" width="3" height="5.5" rx="0.6" fill="#2E0F3D" />
      <rect x="10" y="1" width="3" height="7" rx="0.6" fill="#2E0F3D" />
      <rect
        x="15"
        y="0"
        width="3"
        height="8"
        rx="0.6"
        fill="#2E0F3D"
        opacity="0.35"
      />
      <path
        d="M24.5 3.2c1.7-1.5 4.3-1.5 6 0M26.1 5c.9-.8 2.4-.8 3.3 0"
        stroke="#2E0F3D"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="27.8" cy="7.6" r="1.15" fill="#2E0F3D" />
      <rect
        x="42"
        y="1.2"
        width="13"
        height="8"
        rx="2"
        stroke="#2E0F3D"
        strokeWidth="1.15"
      />
      <rect x="43.3" y="2.5" width="8.2" height="5.4" rx="1" fill="#c01763" />
      <rect x="55.2" y="3.6" width="1.4" height="3.2" rx="0.5" fill="#2E0F3D" />
    </svg>
  );
}

function PhoneScreenAnimation({ index }: { index: number }) {
  const screenNodes = [
    <GoalsScreen key="goals" />,
    <AddGoalScreen key="add" />,
    <MapScreen key="map" />,
    <PathwaysScreen key="path" />,
    <PausedScreen key="pause" />,
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="relative z-10 flex min-h-[18px] shrink-0 items-end justify-between bg-white px-[7%] pb-0.5">
        <span className="text-[9px] font-dm tracking-tight text-[#2E0F3D]">9:41</span>
        <StatusIcons />
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <div key={screens[index].id} className="h-full animate-screen-fade">
          {screenNodes[index]}
        </div>
      </div>

      <div className="flex shrink-0 justify-center bg-white pb-1 pt-0.5">
        <span className="h-1 w-[30%] rounded-full bg-[#2E0F3D]/20" />
      </div>
    </div>
  );
}

export default function PhonePreview() {
  const [index, setIndex] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const scale = usePhoneScreenScale(screenRef);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % screens.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      id="hero-preview"
      className="relative mx-auto mt-4 w-full max-w-[980px] px-3 pb-2 pt-6 sm:mt-6 sm:px-4 sm:pb-4 sm:pt-10"
    >
      {/* Background Soft Pink Radial Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-75"
        style={{ background: "rgba(217, 28, 104, 0.25)" }}
        aria-hidden
      />

      {/* ================= FLOATING FEATURE PILLS ================= */}
      {floatingPills.map((pill) => (
        <FloatingPill key={pill.id} {...pill} />
      ))}

      {/* ================= HAND + SCREEN PREVIEW ================= */}
      <div className="relative mx-auto w-full max-w-[min(96vw,640px)] sm:max-w-[min(92vw,700px)]">
        <div
          className="relative mx-auto w-full translate-x-[4%] sm:translate-x-[14%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.5) 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.5) 85%, transparent 100%)",
          }}
        >
          <Image
            src="/images/hand.png"
            alt="Hand holding PurposeMint app"
            width={1080}
            height={1599}
            className="relative z-[1] block h-auto w-full"
            priority
          />

          {/* Animated app screens — aligned to the empty screen in hand.png */}
          <div
            ref={screenRef}
            className="absolute z-[2] overflow-hidden bg-white"
            style={{
              top: HAND_SCREEN.top,
              left: HAND_SCREEN.left,
              width: HAND_SCREEN.width,
              height: HAND_SCREEN.height,
              borderRadius: HAND_SCREEN.radius,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            <div
              className="origin-top-left"
              style={
                scale < 1
                  ? {
                      width: `${100 / scale}%`,
                      height: `${100 / scale}%`,
                      transform: `scale(${scale})`,
                    }
                  : { width: "100%", height: "100%" }
              }
            >
              <PhoneScreenAnimation index={index} />
            </div>
          </div>
        </div>

        {/* Large bottom fade — hides wrist cut-off into hero background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-10 lg:bottom-0 z-[4] h-[10%] sm:h-[10%] translate-x-[14%]"
          style={{
            background:
              "linear-gradient(to top, #fdfbf7 0%, #fdfbf7 50%, rgba(253,251,247,0.92) 72%, rgba(253,251,247,0.55) 88%, transparent 100%)",
          }}
        />
      </div>

      {/* Keyframe Transition Style */}
      <style jsx global>{`
        @keyframes screenFade {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-screen-fade {
          animation: screenFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pillFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          35% {
            transform: translateY(-7px) rotate(0.6deg);
          }
          70% {
            transform: translateY(-13px) rotate(-0.4deg);
          }
        }
        @keyframes pillShimmer {
          0% {
            transform: translateX(-130%) skewX(-14deg);
          }
          100% {
            transform: translateX(230%) skewX(-14deg);
          }
        }
        @keyframes pillSpark {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        .pill-float {
          animation-name: pillFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .pill-shimmer {
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 70%
          );
          animation: pillShimmer 5.5s ease-in-out infinite;
        }
        .pill-spark {
          animation: pillSpark 2.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pill-float,
          .pill-shimmer,
          .pill-spark {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

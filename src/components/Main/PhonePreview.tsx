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

const HERO_SCREEN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/** Bump when hero assets change to bust browser / Next image cache */
const HERO_ASSET_VERSION = "4";

function getHeroScreenSrc(num: (typeof HERO_SCREEN_NUMBERS)[number]) {
  const extension = num === 1 ? "png" : "jpeg";
  return `/images/purposeHero${num}.${extension}?v=${HERO_ASSET_VERSION}`;
}

const screens = HERO_SCREEN_NUMBERS.map((num) => ({
  id: `hero${num}`,
  src: getHeroScreenSrc(num),
}));

/** Measured inset of the black screen area inside hand.png (1080×1599) */
const HAND_SCREEN = {
  top: "1.8%",
  left: "12.8%",
  width: "45%",
  height: "64.8%",
  radius: "9%",
} as const;

function PhoneScreenAnimation({ index }: { index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {screens.map((screen, i) => (
        <Image
          key={screen.src}
          src={screen.src}
          alt={`PurposeMint screen ${i + 1}`}
          fill
          unoptimized
          priority={i === 0}
          sizes="(max-width: 640px) 45vw, 380px"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        />
      ))}
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
    }, 3000);
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
          className="relative mx-auto w-full translate-x-[13%] sm:translate-x-[14%]"
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
    </div>
  );
}
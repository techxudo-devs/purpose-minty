"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  HiCurrencyDollar,
  HiFlag,
  HiFire,
  HiShieldCheck,
  HiKey,
  HiMap,
} from "react-icons/hi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const journeySteps = [
  {
    icon: HiCurrencyDollar,
    title: "Your first dollar",
    description: "Round-ups and payday rules start where you are.",
  },
  {
    icon: HiFlag,
    title: "Hit your next $500",
    description: "Build a cushion a flat tire can't wipe out.",
  },
  {
    icon: HiFire,
    title: "Keep a streak alive",
    description: "Lock tools and nudges that keep you consistent.",
  },
  {
    icon: HiShieldCheck,
    title: "Grow the buffer",
    description: "Rent gaps, childcare, job transitions — covered.",
  },
  {
    icon: HiKey,
    title: "Unlock a Pathway",
    description: "Your savings become proof you're ready.",
  },
  {
    icon: HiMap,
    title: "Pathways",
    description: "Car, housing, childcare — fair partners ahead.",
    note: "Unlocked at Level 5",
  },
];

type StepStatus = "idle" | "active" | "completed";

type AnchorPoint = "top" | "bottom";

type ConnectorAnchor = {
  from: AnchorPoint;
  to: AnchorPoint;
};

const connectorAnchors: ConnectorAnchor[] = [
  { from: "bottom", to: "bottom" },
  { from: "top", to: "top" },
  { from: "bottom", to: "bottom" },
  { from: "top", to: "top" },
  { from: "bottom", to: "bottom" },
];

type MeasuredPath = {
  d: string;
  length: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const PINK = "#c01763";
const PINK_LIGHT = "#fda4af";
const PINK_TRACK = "#fecdd3";

function getStepStatus(stepIndex: number, activeStep: number | null): StepStatus {
  if (activeStep === null) return "idle";
  if (stepIndex < activeStep) return "completed";
  if (stepIndex === activeStep) return "active";
  return "idle";
}

function StepCard({
  icon: Icon,
  title,
  description,
  note,
  status,
  alignHigh,
  cardRef,
}: {
  icon: IconType;
  title: string;
  description: string;
  note?: string;
  status: StepStatus;
  alignHigh: boolean;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  const isActive = status === "active";
  const isCompleted = status === "completed";

  return (
    <article
      ref={cardRef}
      data-step-card
      className={`relative w-full max-w-[168px] rounded-2xl border px-3 py-4 text-center transition-all duration-500 sm:max-w-none sm:px-4 sm:py-5 ${
        isActive
          ? "z-20 scale-[1.04] border-[#c01763]/50 bg-[#fff5f8] shadow-[0_0_0_1px_rgba(192,23,99,0.15),0_12px_32px_rgba(192,23,99,0.12)]"
          : "border-pink-100/80 bg-white"
      } ${alignHigh ? "lg:mt-0" : "lg:mt-16"}`}
    >
      <span
        className={`absolute left-1/2 top-0 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white lg:block ${
          isActive || isCompleted ? "bg-[#c01763]" : "bg-pink-200"
        }`}
        aria-hidden
      />
      <span
        className={`absolute bottom-0 left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white lg:block ${
          isActive || isCompleted ? "bg-[#c01763]" : "bg-pink-200"
        }`}
        aria-hidden
      />
      <div
        className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500 sm:h-12 sm:w-12 ${
          isActive
            ? "bg-gradient-to-br from-[#c01763] to-[#8d0543] text-white"
            : isCompleted
              ? "bg-[#fff5f8] text-[#c01763] ring-1 ring-[#c01763]/25"
              : "bg-[#fff5f8] text-[#c01763]"
        }`}
      >
        <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
      </div>

      <h3
        className={`font-play text-[14px] leading-snug sm:text-[15px] ${
          isActive ? "text-[#c01763]" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <p className="mt-2 font-dm text-[11px] leading-relaxed text-slate-600 sm:text-xs">
        {description}
      </p>
      {note && (
        <p
          className={`mt-2 font-dm text-[10px] font-medium sm:text-[11px] ${
            isActive ? "text-[#c01763]" : "text-[#c01763]/75"
          }`}
        >
          {note}
        </p>
      )}
    </article>
  );
}

function getAnchorY(rect: DOMRect, anchor: AnchorPoint, containerTop: number) {
  return (anchor === "bottom" ? rect.bottom : rect.top) - containerTop;
}

function buildConnectorPath(
  fromRect: DOMRect,
  toRect: DOMRect,
  anchor: ConnectorAnchor,
  containerRect: DOMRect,
): MeasuredPath {
  const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
  const y1 = getAnchorY(fromRect, anchor.from, containerRect.top);
  const x2 = toRect.left + toRect.width / 2 - containerRect.left;
  const y2 = getAnchorY(toRect, anchor.to, containerRect.top);

  const dx = x2 - x1;
  const cp1x = x1 + dx * 0.42;
  const cp2x = x1 + dx * 0.58;
  const d = `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;

  const chord = Math.hypot(x2 - x1, y2 - y1);
  const length = chord * 1.12;

  return { d, length, x1, y1, x2, y2 };
}

function JourneyConnectors({
  containerRef,
  cardRefs,
  activeStep,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  activeStep: number | null;
}) {
  const [paths, setPaths] = useState<MeasuredPath[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const fillPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotStartRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dotEndRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const nextPaths: MeasuredPath[] = [];

      for (let i = 0; i < connectorAnchors.length; i += 1) {
        const fromEl = cardRefs.current[i];
        const toEl = cardRefs.current[i + 1];
        if (!fromEl || !toEl) continue;

        const built = buildConnectorPath(
          fromEl.getBoundingClientRect(),
          toEl.getBoundingClientRect(),
          connectorAnchors[i],
          containerRect,
        );

        const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
        probe.setAttribute("d", built.d);
        const length = probe.getTotalLength() || built.length;

        nextPaths.push({ ...built, length });
      }

      setPaths(nextPaths);
      setSize({ w: containerRect.width, h: containerRect.height });

      requestAnimationFrame(() => {
        nextPaths.forEach((path, index) => {
          const fill = fillPathRefs.current[index];
          const glow = glowPathRefs.current[index];
          if (!fill || !glow) return;

          const len = fill.getTotalLength() || path.length;
          gsap.set(fill, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 0,
          });
          gsap.set(glow, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 0,
          });
        });
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    cardRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, cardRefs]);

  useLayoutEffect(() => {
    paths.forEach((path, index) => {
      const fill = fillPathRefs.current[index];
      const glow = glowPathRefs.current[index];
      const dotStart = dotStartRefs.current[index];
      const dotEnd = dotEndRefs.current[index];
      const pulse = pulseRefs.current[index];
      if (!fill || !glow) return;

      const len = fill.getTotalLength() || path.length;
      const lit = activeStep !== null && index < activeStep;
      const drawing = activeStep !== null && index === activeStep - 1;

      gsap.killTweensOf([fill, glow, dotStart, dotEnd, pulse].filter(Boolean));

      if (drawing) {
        gsap.set(fill, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        gsap.set(glow, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.85 });
        gsap.set(dotEnd, { attr: { r: 5 } });

        const tl = gsap.timeline();

        tl.fromTo(
          dotStart,
          { attr: { r: 5 }, opacity: 0.7 },
          { attr: { r: 8 }, opacity: 1, duration: 0.25, ease: "power2.out" },
          0,
        );

        tl.fromTo(
          fill,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.75, ease: "power3.out" },
          0,
        );

        tl.fromTo(
          glow,
          { strokeDashoffset: len, opacity: 0.9 },
          { strokeDashoffset: 0, opacity: 0, duration: 0.75, ease: "power3.out" },
          0,
        );

        tl.fromTo(
          pulse,
          { cx: path.x1, cy: path.y1, opacity: 0.9, r: 4 },
          {
            cx: path.x2,
            cy: path.y2,
            opacity: 0,
            r: 9,
            duration: 0.75,
            ease: "power3.out",
          },
          0,
        );

        tl.fromTo(
          dotEnd,
          { attr: { r: 3 }, opacity: 0.5 },
          { attr: { r: 6 }, opacity: 1, duration: 0.3, ease: "back.out(3)" },
          0.55,
        );

        tl.to(dotEnd, { attr: { r: 9 }, duration: 0.18, ease: "power2.out" }, 0.72);
        tl.to(dotEnd, { attr: { r: 5 }, duration: 0.22, ease: "elastic.out(1, 0.5)" }, 0.9);
      } else if (lit) {
        gsap.set(fill, { strokeDasharray: len, strokeDashoffset: 0, opacity: 1 });
        gsap.set(glow, { opacity: 0 });
        gsap.set(dotStart, { attr: { r: 5 }, opacity: 1 });
        gsap.set(dotEnd, { attr: { r: 5 }, opacity: 1 });
        gsap.set(pulse, { opacity: 0 });
      } else {
        gsap.set(fill, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.set(glow, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.set(dotStart, { attr: { r: 5 }, opacity: 0.85 });
        gsap.set(dotEnd, { attr: { r: 5 }, opacity: 0.85 });
        gsap.set(pulse, { opacity: 0 });
      }
    });
  }, [activeStep, paths]);

  if (size.w === 0 || paths.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[15] hidden h-full w-full overflow-visible lg:block"
      viewBox={`0 0 ${size.w} ${size.h}`}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="journey-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor={PINK} />
          <stop offset="100%" stopColor="#8d0543" />
        </linearGradient>
        <filter id="journey-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="journey-arrow-active" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={PINK} />
        </marker>
        <marker id="journey-arrow-muted" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={PINK_LIGHT} />
        </marker>
      </defs>

      {paths.map((path, index) => {
        const lit = activeStep !== null && index < activeStep;
        const drawing = activeStep !== null && index === activeStep - 1;
        const energized = lit || drawing;

        return (
          <g key={`connector-${index}`}>
            <path
              d={path.d}
              stroke={PINK_TRACK}
              strokeWidth="3"
              strokeDasharray="10 7"
              strokeLinecap="round"
              opacity={0.95}
            />

            <path
              ref={(el) => {
                glowPathRefs.current[index] = el;
              }}
              d={path.d}
              stroke={PINK}
              strokeWidth="8"
              strokeLinecap="round"
              opacity={0}
              filter="url(#journey-glow)"
            />

            <path
              ref={(el) => {
                fillPathRefs.current[index] = el;
              }}
              d={path.d}
              stroke="url(#journey-line-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              markerEnd={`url(#${energized ? "journey-arrow-active" : "journey-arrow-muted"})`}
              opacity={0}
            />

            <circle
              ref={(el) => {
                pulseRefs.current[index] = el;
              }}
              cx={path.x1}
              cy={path.y1}
              r="4"
              fill="#f472b6"
              opacity={0}
            />

            <circle
              ref={(el) => {
                dotStartRefs.current[index] = el;
              }}
              cx={path.x1}
              cy={path.y1}
              r="5"
              fill={energized ? PINK : PINK_LIGHT}
              stroke="#fff"
              strokeWidth="2"
            />
            <circle
              ref={(el) => {
                dotEndRefs.current[index] = el;
              }}
              cx={path.x2}
              cy={path.y2}
              r="5"
              fill={energized ? PINK : PINK_LIGHT}
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
        );
      })}
    </svg>
  );
}

function MobileConnector({ lit, drawing }: { lit: boolean; drawing: boolean }) {
  return (
    <div className="relative flex justify-center py-2 lg:hidden" aria-hidden>
      <div
        className={`relative flex flex-col items-center transition-colors duration-500 ${
          lit ? "text-[#c01763]" : "text-pink-300"
        }`}
      >
        <div
          className={`h-8 w-[3px] rounded-full transition-all duration-500 ${
            lit ? "bg-gradient-to-b from-[#f472b6] to-[#c01763]" : "bg-pink-200"
          } ${drawing ? "animate-pulse" : ""}`}
        />
        <div
          className={`mt-0.5 h-2.5 w-2.5 rotate-45 border-r-[3px] border-b-[3px] transition-colors duration-500 ${
            lit ? "border-[#c01763]" : "border-pink-300"
          }`}
        />
      </div>
      {drawing && (
        <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 animate-ping rounded-full bg-[#c01763]/70" />
      )}
    </div>
  );
}

function LevelJourneyPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const journeyGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stepsCount = journeySteps.length;

      if (reducedMotion) {
        setActiveStep(stepsCount - 1);
        return;
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });

      journeySteps.forEach((_, index) => {
        tl.call(() => setActiveStep(index), [], index === 0 ? 0 : "+=0.95");
      });

      tl.to({}, { duration: 1 });
      tl.call(() => setActiveStep(null));

      const scrollTrigger = ScrollTrigger.create({
        trigger: panel,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => tl.play(),
        onLeave: () => {
          tl.pause();
          setActiveStep(null);
        },
        onEnterBack: () => tl.play(),
        onLeaveBack: () => {
          tl.pause();
          setActiveStep(null);
        },
      });

      return () => {
        scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-pink-100/80 bg-white"
    >
      <div
        className="relative overflow-hidden px-6 py-5 text-center sm:px-8 sm:py-6"
        style={{
          background:
            "linear-gradient(135deg, #52005c 0%, #2E0F3D 32%, #c01763 68%, #b00f57 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(253,224,71,0.25) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(244,114,182,0.3) 0%, transparent 42%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="font-dm text-[11px] font-medium uppercase tracking-[0.1em] text-[#facc15]/90 sm:text-xs">
            Your journey
          </p>
          <p className="mt-1 font-play text-2xl leading-tight text-white sm:text-[28px]">
            Zero to Pathways
          </p>
        </div>
      </div>

      <div className="bg-[#fffdfb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Desktop zig-zag */}
        <div
          ref={journeyGridRef}
          className="relative hidden min-h-[300px] overflow-visible lg:block xl:min-h-[280px]"
        >
          <JourneyConnectors
            containerRef={journeyGridRef}
            cardRefs={cardRefs}
            activeStep={activeStep}
          />
          <ol className="relative z-10 grid grid-cols-6 items-start gap-x-2">
            {journeySteps.map((step, index) => {
              const status = getStepStatus(index, activeStep);
              const alignHigh = index % 2 === 1;

              return (
                <li key={step.title} className="flex justify-center">
                  <StepCard
                    cardRef={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    note={"note" in step ? step.note : undefined}
                    status={status}
                    alignHigh={alignHigh}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile / tablet vertical */}
        <ol className="flex flex-col items-center lg:hidden">
          {journeySteps.map((step, index) => {
            const status = getStepStatus(index, activeStep);
            const connectorLit = activeStep !== null && index > 0 && index <= activeStep;
            const connectorDrawing = activeStep !== null && index > 0 && index === activeStep;

            return (
              <li key={step.title} className="flex w-full max-w-sm flex-col items-center">
                {index > 0 && (
                  <MobileConnector lit={connectorLit} drawing={connectorDrawing} />
                )}
                <StepCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  note={"note" in step ? step.note : undefined}
                  status={status}
                  alignHigh={false}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function LevelsSection() {
  return (
    <section id="levels" className="relative w-full overflow-hidden bg-[#fdfbf7] py-12 sm:py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(192, 23, 99, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(192, 23, 99, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-16 h-[280px] w-[min(92vw,720px)] -translate-x-1/2 rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.22) 0%, rgba(253, 224, 71, 0.1) 45%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 font-dm text-[12px] font-medium text-slate-700 sm:text-[13px]"
            style={{
              background:
                "linear-gradient(#fdfbf7, #fdfbf7) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            Built for real progress
          </span>

          <h2 className="mt-4 font-play text-2xl tracking-tight text-slate-950 sm:mt-5 sm:text-4xl md:text-5xl">
            Five levels.{" "}
            <span className="text-[#c01763]">Start at zero.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:text-base">
            Each level is small enough to finish and worth celebrating.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <LevelJourneyPanel />
        </div>
      </div>
    </section>
  );
}

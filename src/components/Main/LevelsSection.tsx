"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const journeySteps = [
  {
    level: 1,
    title: "Your first dollar",
    description: "Round-ups and payday rules start where you are.",
  },
  {
    level: 2,
    title: "Hit your next $500",
    description: "Build a cushion a flat tire can't wipe out.",
  },
  {
    level: 3,
    title: "Keep a streak alive",
    description: "Lock tools and nudges that keep you consistent.",
  },
  {
    level: 4,
    title: "Grow the buffer",
    description: "Rent gaps, childcare, job transitions — covered.",
  },
  {
    level: 5,
    title: "Unlock a Pathway",
    description: "Your savings become proof you're ready.",
  },
  {
    isStar: true,
    title: "Pathways",
    description: "Car, housing, childcare — fair partners ahead.",
    note: "Unlocked at Level 5",
  },
];

type StepStatus = "future" | "active" | "completed";

function getStepStatus(stepIndex: number, activeStep: number): StepStatus {
  if (stepIndex < activeStep) return "completed";
  if (stepIndex === activeStep) return "active";
  return "future";
}

function StepMarker({
  level,
  isStar,
  status,
}: {
  level?: number;
  isStar?: boolean;
  status: StepStatus;
}) {
  const isReached = status === "active" || status === "completed";

  if (isStar) {
    return (
      <span
        data-marker
        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white transition-[transform,box-shadow] duration-500 sm:h-10 sm:w-10 ${
          status === "active"
            ? "scale-110 ring-4 ring-[#c01763]/30"
            : isReached
              ? "ring-4 ring-[#c01763]/15"
              : "scale-90 opacity-45 ring-4 ring-transparent"
        }`}
        style={{
          background: isReached
            ? "linear-gradient(135deg, #c01763 0%, #7c3aed 100%)"
            : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
        }}
      >
        ★
      </span>
    );
  }

  return (
    <span
      data-marker
      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-dm text-xs font-bold transition-all duration-300 sm:h-10 sm:w-10 sm:text-sm ${
        status === "active"
          ? "scale-110 border-[#c01763] bg-[#c01763] text-white"
          : status === "completed"
            ? "scale-100 border-[#c01763]/40 bg-[#fff5f8] text-[#c01763]"
            : "scale-90 border-[#c01763]/15 bg-white text-slate-400 opacity-60"
      }`}
    >
      {level}
    </span>
  );
}

function LevelJourneyPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const lineProgress = lineProgressRef.current;
      if (!panel || !lineProgress) return;

      const mm = gsap.matchMedia();
      const stepsCount = journeySteps.length;

      // Desktop (>= 768px): Horizontal Animation
      mm.add("(min-width: 768px)", () => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          gsap.set(lineProgress, { scaleX: 1, scaleY: 1 });
          setActiveStep(stepsCount - 1);
          return;
        }

        gsap.set(lineProgress, { scaleX: 0, scaleY: 1, transformOrigin: "left center" });
        setActiveStep(0);

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, paused: true });

        journeySteps.forEach((_, index) => {
          tl.to(
            lineProgress,
            {
              scaleX: index / (stepsCount - 1),
              duration: 0.45,
              ease: "power2.inOut",
            },
            index === 0 ? 0 : "+=0.25",
          );

          tl.call(() => setActiveStep(index), [], "<0.08");
        });

        tl.to({}, { duration: 0.6 });
        tl.to(lineProgress, { scaleX: 0, duration: 0.3, ease: "power2.inOut" });
        tl.call(() => setActiveStep(0), [], "-=0.08");

        const scrollTrigger = ScrollTrigger.create({
          trigger: panel,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => tl.play(),
          onLeave: () => tl.pause(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(),
        });

        return () => {
          scrollTrigger.kill();
          tl.kill();
        };
      });

      // Mobile (< 768px): Vertical Animation
      mm.add("(max-width: 767px)", () => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          gsap.set(lineProgress, { scaleY: 1, scaleX: 1 });
          setActiveStep(stepsCount - 1);
          return;
        }

        gsap.set(lineProgress, { scaleY: 0, scaleX: 1, transformOrigin: "top center" });
        setActiveStep(0);

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, paused: true });

        journeySteps.forEach((_, index) => {
          tl.to(
            lineProgress,
            {
              scaleY: index / (stepsCount - 1),
              duration: 0.45,
              ease: "power2.inOut",
            },
            index === 0 ? 0 : "+=0.25",
          );

          tl.call(() => setActiveStep(index), [], "<0.08");
        });

        tl.to({}, { duration: 0.6 });
        tl.to(lineProgress, { scaleY: 0, duration: 0.3, ease: "power2.inOut" });
        tl.call(() => setActiveStep(0), [], "-=0.08");

        const scrollTrigger = ScrollTrigger.create({
          trigger: panel,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => tl.play(),
          onLeave: () => tl.pause(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(),
        });

        return () => {
          scrollTrigger.kill();
          tl.kill();
        };
      });
    },
    { scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-pink-200/80 bg-white/90 backdrop-blur-sm sm:max-w-2xl md:max-w-5xl lg:max-w-6xl"
    >
      <div
        className="relative px-5 py-4 text-center sm:px-6 sm:py-5"
        style={{
          background:
            "linear-gradient(135deg, #52005c 0%, #2E0F3D 28%, #c01763 58%, #b00f57 78%, #8d0543 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 14px)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="font-dm text-[11px] font-medium uppercase tracking-[0.08em] text-pink-100/80 sm:text-xs">
            Your journey
          </p>
          <p className="mt-1 font-play text-xl leading-tight text-white sm:text-2xl">
            Zero to Pathways
          </p>
        </div>
      </div>

      <div className="px-5 py-7 sm:px-7 sm:py-9 md:px-8 md:py-10">
        <ol className="relative flex flex-col md:grid md:grid-cols-6">
          {/* Progress Line Track */}
          <div
            className="pointer-events-none absolute bottom-5 left-[17px] top-5 w-px overflow-hidden sm:left-[19px] md:bottom-auto md:left-[8.33%] md:right-[8.33%] md:top-[20px] md:h-px md:w-auto"
            aria-hidden
          >
            <div className="absolute inset-0 bg-slate-200" />
            <div
              ref={lineProgressRef}
              className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#7c3aed]"
            />
          </div>

          {journeySteps.map((step, index) => {
            const isStar = "isStar" in step && step.isStar;
            const status = getStepStatus(index, activeStep);
            const isActive = status === "active";
            const isReached = status === "active" || status === "completed";
            const isLast = index === journeySteps.length - 1;

            return (
              <li
                key={step.title}
                className={`relative flex flex-row gap-4 sm:gap-5 md:flex-col md:items-center md:text-center md:gap-3 ${
                  isLast ? "pb-0" : "pb-7 sm:pb-8 md:pb-0"
                }`}
              >
                <div className="relative z-10 shrink-0 pt-0.5 md:pt-0">
                  <StepMarker
                    level={"level" in step ? step.level : undefined}
                    isStar={isStar}
                    status={status}
                  />
                </div>

                <div className="min-w-0 flex-1 pt-0.5 md:pt-1 text-left md:text-center">
                  <h3
                    className={`font-play text-[15px] leading-snug transition-colors duration-500 sm:text-base md:text-sm lg:text-[15px] ${
                      isActive
                        ? "text-[#c01763]"
                        : isReached
                          ? "text-slate-900"
                          : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-1.5 font-dm text-[13px] leading-relaxed transition-colors duration-500 sm:mt-2 sm:text-sm md:text-xs lg:text-[13px] ${
                      isActive ? "text-slate-700" : isReached ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {"note" in step && step.note && (
                    <p
                      className={`mt-1.5 font-dm text-[12px] font-medium transition-colors duration-500 sm:text-[13px] md:text-[11px] lg:text-xs ${
                        isActive ? "text-[#c01763]" : isReached ? "text-[#c01763]/70" : "text-slate-400"
                      }`}
                    >
                      {step.note}
                    </p>
                  )}
                </div>
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
    <section id="levels" className="relative w-full overflow-hidden bg-[#fdfbf7] py-10 sm:py-12 md:py-14">
      <div
        className="pointer-events-none absolute -left-24 top-12 h-[320px] w-[320px] rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.3) 0%, rgba(192, 23, 99, 0.14) 45%, transparent 75%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-8 h-[320px] w-[320px] rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(192, 132, 252, 0.28) 0%, rgba(192, 23, 99, 0.12) 45%, transparent 75%)",
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
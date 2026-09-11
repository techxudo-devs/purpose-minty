"use client";

import { useRef, useState } from "react";
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

type StepStatus = "idle" | "active" | "completed" | "future";

function getStepStatus(stepIndex: number, activeStep: number | null): StepStatus {
  if (activeStep === null) return "idle";
  if (stepIndex < activeStep) return "completed";
  if (stepIndex === activeStep) return "active";
  return "future";
}

function StepMarker({ icon: Icon, status }: { icon: IconType; status: StepStatus }) {
  const isActive = status === "active";
  const isCompleted = status === "completed";
  const isFuture = status === "future";

  return (
    <span
      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 sm:h-11 sm:w-11 ${
        isActive
          ? "scale-110 border-[#c01763] bg-[#c01763] text-white shadow-[0_0_0_4px_rgba(192,23,99,0.18)]"
          : isCompleted
            ? "border-[#c01763]/45 bg-[#fff5f8] text-[#c01763]"
            : isFuture
              ? "scale-95 border-slate-200 bg-white text-slate-300 opacity-60"
              : "border-[#c01763]/35 bg-white text-[#c01763]"
      }`}
    >
      <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
    </span>
  );
}

function StepContent({
  icon,
  title,
  description,
  note,
  status,
}: {
  icon: IconType;
  title: string;
  description: string;
  note?: string;
  status: StepStatus;
}) {
  const isActive = status === "active";
  const isReached = status === "active" || status === "completed";
  const isFuture = status === "future";

  return (
    <>
      <div className="relative z-10 shrink-0 pt-0.5 lg:mx-auto lg:mb-3">
        <StepMarker icon={icon} status={status} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5 text-left lg:text-center">
        <h3
          className={`font-play text-[15px] leading-snug transition-colors duration-500 sm:text-base lg:text-[15px] ${
            isActive
              ? "text-[#c01763]"
              : isReached
                ? "text-slate-900"
                : isFuture
                  ? "text-slate-400"
                  : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1.5 font-dm text-[13px] leading-relaxed transition-colors duration-500 sm:mt-2 sm:text-sm lg:text-xs ${
            isActive
              ? "text-slate-700"
              : isReached
                ? "text-slate-600"
                : isFuture
                  ? "text-slate-400"
                  : "text-slate-600"
          }`}
        >
          {description}
        </p>
        {note && (
          <p
            className={`mt-1.5 font-dm text-[12px] font-medium transition-colors duration-500 sm:mt-2 sm:text-[13px] lg:text-[11px] ${
              isActive
                ? "text-[#c01763]"
                : isReached
                  ? "text-[#c01763]/70"
                  : isFuture
                    ? "text-slate-400"
                    : "text-[#c01763]/75"
            }`}
          >
            {note}
          </p>
        )}
      </div>
    </>
  );
}

function LevelJourneyPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const lineProgress = lineProgressRef.current;
      if (!panel || !lineProgress) return;

      const mm = gsap.matchMedia();
      const stepsCount = journeySteps.length;

      mm.add("(min-width: 1024px)", () => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          gsap.set(lineProgress, { scaleX: 1, scaleY: 1 });
          setActiveStep(stepsCount - 1);
          return;
        }

        gsap.set(lineProgress, { scaleX: 0, scaleY: 1, transformOrigin: "left center" });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });

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
      });

      mm.add("(max-width: 1023px)", () => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          gsap.set(lineProgress, { scaleY: 1, scaleX: 1 });
          setActiveStep(stepsCount - 1);
          return;
        }

        gsap.set(lineProgress, { scaleY: 0, scaleX: 1, transformOrigin: "top center" });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });

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
      });

      return () => mm.revert();
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
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 14px)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="font-dm text-[11px] font-medium uppercase tracking-[0.1em] text-pink-100/90 sm:text-xs">
            Your journey
          </p>
          <p className="mt-1 font-play text-2xl leading-tight text-white sm:text-[28px]">
            Zero to Pathways
          </p>
        </div>
      </div>

      <div className="bg-[#fffdfb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ol className="relative flex flex-col lg:grid lg:grid-cols-6 lg:gap-x-2">
          <div
            className="pointer-events-none absolute bottom-5 left-[17px] top-5 w-px overflow-hidden sm:left-[19px] lg:bottom-auto lg:left-[8.33%] lg:right-[8.33%] lg:top-5 lg:h-px lg:w-auto"
            aria-hidden
          >
            <div className="absolute inset-0 bg-pink-200" />
            <div
              ref={lineProgressRef}
              className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#7c3aed]"
            />
          </div>

          {journeySteps.map((step, index) => {
            const status = getStepStatus(index, activeStep);
            const isLast = index === journeySteps.length - 1;

            return (
              <li
                key={step.title}
                className={`relative flex gap-4 sm:gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center ${
                  isLast ? "pb-0" : "pb-7 sm:pb-8 lg:pb-0"
                }`}
              >
                <StepContent
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  note={"note" in step ? step.note : undefined}
                  status={status}
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

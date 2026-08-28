"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const goals = [
  { name: "Fresh Haircut Fund", now: "$38 of $50", pct: "76%", icon: "💇" },
  { name: "Self-Care Sunday", now: "$42 of $50", pct: "84%", icon: "✨" },
  { name: "Coffee Joy Runs", now: "$8 of $25", pct: "32%", icon: "☕" },
  { name: "Emergency Rainy Day", now: "$160 of $200", pct: "80%", icon: "☔" },
];

function GoalsScreen() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between border-b border-pink-100 px-5 py-3 bg-white">
        <span className="text-[14px] font-play text-[#2E0F3D]">
          Hey Queen 👑
        </span>
        <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-medium font-dm text-[#c01763]">
          You&apos;re doing amazing
        </span>
      </div>
      <div className="px-5 py-4 flex-1 bg-white">
        <p className="text-[11px] font-medium font-dm tracking-wider uppercase text-slate-400">
          Total Saved
        </p>
        <p className="mt-1 text-[32px] font-play leading-none text-[#2E0F3D]">
          $247.50
        </p>
        <p className="mt-1.5 text-[13px] font-medium font-dm text-[#2ec4b6]">
          +$12 this week!
        </p>

        <p className="mt-5 text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400">
          Your Goals
        </p>
        <div className="mt-2 space-y-2.5">
          {goals.map((goal) => (
            <div
              key={goal.name}
              className="flex items-center justify-between rounded-2xl border border-pink-100 bg-[#fff5f8] px-3.5 py-2.5"
            >
              <div>
                <p className="text-[13px] font-play text-[#2E0F3D]">
                  {goal.icon} {goal.name}
                </p>
                <p className="text-[11px] font-medium font-dm text-slate-500">
                  {goal.now}
                </p>
              </div>
              <span className="text-[13px] font-medium font-dm text-[#c01763]">
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
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">
          Add a New Goal
        </span>
      </div>
      <div className="px-5 py-5 flex-1">
        <p className="text-[13px] font-semibold text-slate-600">
          What are you saving for?
        </p>
        <p className="text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400 mt-4">
          Goal name
        </p>
        <div className="mt-1.5 rounded-2xl border border-pink-100 bg-[#fff5f8] px-4 py-3 text-[13px] font-medium font-dm text-[#2E0F3D]">
          Coffee Joy Runs ☕
        </div>
        <p className="text-[11px] font-medium font-dm tracking-wide uppercase text-slate-400 mt-4">
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
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">
          Your PurposeMap™
        </span>
      </div>
      <div className="px-5 py-5 flex-1">
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
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">
          PurposeMint Pathways
        </span>
      </div>
      <div className="px-5 py-5 flex-1">
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
        <p className="mt-5 text-[11px] font-medium font-dm text-slate-400 text-center">
          Build readiness. Connect with partners.
        </p>
      </div>
    </div>
  );
}

function PausedScreen() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-pink-100 px-5 py-3">
        <span className="text-[14px] font-play text-[#2E0F3D]">
          Goal Paused
        </span>
      </div>
      <div className="px-5 py-6 text-center flex-1 flex flex-col justify-center items-center">
        <p className="text-[32px]" aria-hidden>
          💜
        </p>
        <p className="mt-3 text-[17px] font-play text-[#2E0F3D]">
          No worries! Life happens.
        </p>
        <p className="mt-1.5 text-[12px] font-medium font-dm text-slate-500">
          Resume when you&apos;re ready. Need more time? That&apos;s okay.
        </p>
        <div className="mt-6 w-full h-11 rounded-full text-center text-[13px] font-medium leading-[44px] text-white bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] shadow-md font-dm shadow-pink-600/20">
          Resume Saving
        </div>
      </div>
    </div>
  );
}

const screens = [
  { id: "goals", node: <GoalsScreen /> },
  { id: "add", node: <AddGoalScreen /> },
  { id: "map", node: <MapScreen /> },
  { id: "path", node: <PathwaysScreen /> },
  { id: "pause", node: <PausedScreen /> },
];

function StatusIcons() {
  return (
    <svg width="50" height="12" viewBox="0 0 56 12" fill="none" aria-hidden>
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
      <rect x="43.3" y="2.5" width="8.2" height="5.4" rx="1" fill="#2ec4b6" />
      <rect x="55.2" y="3.6" width="1.4" height="3.2" rx="0.5" fill="#2E0F3D" />
    </svg>
  );
}

export default function PhonePreview() {
  const [index, setIndex] = useState(0);

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
      className="relative mx-auto w-full max-w-[850px] px-4 pt-10 pb-6 mt-6"
    >
      {/* Background Soft Pink Radial Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-75"
        style={{ background: "rgba(217, 28, 104, 0.25)" }}
        aria-hidden
      />

      {/* ================= FLOATING TRANSACTION/NOTIFICATION PILLS (NIMBUS STYLE) ================= */}

      {/* 1. Left Floating Pill */}
      <div className="hidden sm:flex items-center gap-3 absolute left-2 md:left-0 top-1/3 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-pink-200 shadow-slate-900/10 transition-all hover:scale-103">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
          alt="Sarah"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-pink-100"
        />
        <div className="text-left">
          <p className="text-sm font-play text-[#2E0F3D]">Sarah Jenkins</p>
          <p className="text-xs font-dm text-slate-400">Haircut Goal Fund</p>
        </div>
        <span className="ml-2 text-sm font-play text-[#2ec4b6] bg-teal-50 px-2.5 py-1 rounded-full">
          +$50.00
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-3 absolute left-2 md:left-0 top-[60%] z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-pink-200 shadow-slate-900/10 transition-all hover:scale-103">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
          alt="Sarah"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-pink-100"
        />
        <div className="text-left">
          <p className="text-sm font-play text-[#2E0F3D]">Sarah Jenkins</p>
          <p className="text-xs font-dm text-slate-400">Haircut Goal Fund</p>
        </div>
        <span className="ml-2 text-sm font-play text-[#c01763] bg-teal-50 px-2.5 py-1 rounded-full">
          +$50.00
        </span>
      </div>

      {/* 2. Top-Right Floating Pill */}
      <div className="hidden sm:flex items-center gap-3 absolute right-2 md:-right-6 top-20 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-pink-200 shadow-slate-900/10 transition-all hover:scale-103">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
          alt="Daniel"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-pink-100"
        />
        <div className="text-left">
          <p className="text-sm font-play text-[#2E0F3D]">Daniel Parker</p>
          <p className="text-xs font-dm text-slate-400">Auto Pathway Fund</p>
        </div>
        <span className="ml-2 text-sm text-[#c01763] bg-pink-50 px-2.5 py-1 rounded-full font-play">
          +$1,250.00
        </span>
      </div>

      {/* 3. Bottom-Right Floating Pill */}
      <div className="hidden sm:flex items-center gap-3 absolute right-4 md:-right-0 bottom-14 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-pink-200 shadow-slate-900/10 transition-all hover:scale-103">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80"
          alt="Maya"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-pink-100"
        />
        <div className="text-left">
          <p className="text-sm font-play text-[#2E0F3D]">Maya Lin</p>
          <p className="text-xs font-dm text-slate-400">Emergency Fund</p>
        </div>
        <span className="ml-2 text-sm font-play text-[#2ec4b6] bg-teal-50 px-2.5 py-1 rounded-full">
          +$300.00
        </span>
      </div>

      {/* ================= BIGGER PHONE DEVICE ================= */}
      <div className="relative mx-auto w-[320px] sm:w-[360px] md:w-[350px]">
        {/* Hardware side buttons */}
        <span className="absolute -left-[3px] top-[100px] h-[32px] w-[3px] rounded-l-sm bg-[#4a2444]" />
        <span className="absolute -left-[3px] top-[140px] h-[55px] w-[3px] rounded-l-sm bg-[#4a2444]" />
        <span className="absolute -right-[3px] top-[130px] h-[65px] w-[3px] rounded-r-sm bg-[#4a2444]" />

        {/* Outer Titanium Frame */}
        <div
          className="relative overflow-hidden rounded-[50px] border border-white/20 bg-[#2E0F3D] p-[10px]"

        >
          {/* Screen Inner Frame */}
          <div className="relative overflow-hidden rounded-[40px] bg-white">
            {/* Status Bar */}
            <div className="relative z-10 flex h-[40px] items-end justify-between px-6 pb-1 bg-white">
              <span className="text-[12px] font-dm tracking-tight text-[#2E0F3D]">
                9:41
              </span>
              <span className="absolute left-1/2 top-[10px] h-[20px] w-[90px] -translate-x-1/2 rounded-full bg-[#0b050c]" />
              <StatusIcons />
            </div>

            {/* Dynamic Screen Area with Smooth Keyframe Fade */}
            <div className="relative h-[480px] overflow-hidden bg-white">
              <div
                key={screens[index].id}
                className="h-full animate-screen-fade"
              >
                {screens[index].node}
              </div>
            </div>

            {/* Home Bar */}
            <div className="flex justify-center bg-white pb-2.5 pt-1">
              <span className="h-[4.5px] w-[115px] rounded-full bg-[#2E0F3D]/20" />
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  );
}

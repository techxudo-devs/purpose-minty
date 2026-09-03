"use client";

import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import { HiLightningBolt, HiOutlineHeart } from "react-icons/hi";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useCycleIndex(count: number, intervalMs = 2800) {
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || count <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs, reducedMotion]);

  return active;
}

function useSmoothRange(
  fillRef: React.RefObject<HTMLDivElement | null>,
  {
    min,
    max,
    durationMs,
    phaseMs = 0,
    onValue,
  }: {
    min: number;
    max: number;
    durationMs: number;
    phaseMs?: number;
    onValue?: (value: number) => void;
  },
) {
  const reducedMotion = usePrefersReducedMotion();
  const onValueRef = useRef(onValue);
  onValueRef.current = onValue;

  useEffect(() => {
    const apply = (value: number) => {
      if (fillRef.current) fillRef.current.style.width = `${value}%`;
      onValueRef.current?.(value);
    };

    const mid = min + (max - min) / 2;
    if (reducedMotion) {
      apply(mid);
      return;
    }

    let frameId = 0;
    const start = performance.now() - phaseMs;

    const tick = (now: number) => {
      const progress = ((now - start) % durationMs) / durationMs;
      const wave = (1 - Math.cos(progress * Math.PI * 2)) / 2;
      apply(min + (max - min) * wave);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [fillRef, min, max, durationMs, phaseMs, reducedMotion]);
}

function CyclingPillGroup({
  options,
  active,
}: {
  options: string[];
  active: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const pills = container.querySelectorAll<HTMLElement>("[data-cycle-pill]");
    const pill = pills[active];
    if (!pill) return;
    setIndicator({
      left: pill.offsetLeft,
      width: pill.offsetWidth,
    });
  }, [active]);

  useEffect(() => {
    updateIndicator();
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);
    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/90 p-1"
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full bg-[#2E0F3D] transition-[left,width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {options.map((option, i) => (
        <span
          key={option}
          data-cycle-pill
          className={`relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 font-dm text-[11px] font-medium transition-colors duration-500 ${
            i === active ? "text-white" : "text-slate-600"
          }`}
        >
          {option}
        </span>
      ))}
    </div>
  );
}

function SmoothMetricBar({
  label,
  min,
  max,
  durationMs,
  phaseMs = 0,
  colorClass,
}: {
  label: string;
  min: number;
  max: number;
  durationMs: number;
  phaseMs?: number;
  colorClass: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useSmoothRange(fillRef, {
    min,
    max,
    durationMs,
    phaseMs,
    onValue: (value) => {
      if (percentRef.current) percentRef.current.textContent = `${Math.round(value)}%`;
    },
  });

  return (
    <div>
      <div className="mb-1 flex justify-between font-dm text-[11px] font-medium text-slate-700">
        <span>{label}</span>
        <span ref={percentRef} className="text-[#c01763]">
          {Math.round(min)}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          ref={fillRef}
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          style={{ width: `${min}%` }}
        />
      </div>
    </div>
  );
}

function GoalProgressPreview({
  min,
  max,
  durationMs,
  goalTotal = 500,
  phaseMs = 0,
}: {
  min: number;
  max: number;
  durationMs: number;
  goalTotal?: number;
  phaseMs?: number;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const amountRef = useRef<HTMLSpanElement>(null);

  useSmoothRange(fillRef, {
    min,
    max,
    durationMs,
    phaseMs,
    onValue: (value) => {
      if (percentRef.current) percentRef.current.textContent = `${Math.round(value)}%`;
      if (amountRef.current) amountRef.current.textContent = `$${Math.round((goalTotal * value) / 100)}`;
    },
  });

  return (
    <div className="space-y-3 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">This week</p>
      <p className="font-play text-xl font-bold text-slate-900">
        <span ref={amountRef}>${Math.round((goalTotal * min) / 100)}</span>{" "}
        <span className="text-sm font-dm font-medium text-slate-400">of ${goalTotal}</span>
      </p>
      <div>
        <div className="mb-1 flex justify-end font-dm text-[11px] font-semibold text-[#c01763]">
          <span ref={percentRef}>{Math.round(min)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            ref={fillRef}
            className="h-full rounded-full bg-gradient-to-r from-[#c01763] to-[#8d0543]"
            style={{ width: `${min}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureHubHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: "features" | "benefits";
  onTabChange: (tab: "features" | "benefits") => void;
}) {
  return (
    <div className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-12">
      <span className="font-dm text-xs uppercase tracking-wider text-pink-700">
        What makes us different
      </span>

      <h2 className="mt-4 font-play text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        Features & Benefits
      </h2>

      <p className="mt-4 max-w-lg font-dm text-sm text-slate-600 sm:text-base">
        Choose your goal, set the friction, and grow a cushion you can actually keep.
      </p>

      <div className="mt-6 inline-flex w-fit flex-row items-center gap-0 rounded-full border border-slate-200/80 bg-white/90 p-1">
        <button
          type="button"
          onClick={() => onTabChange("features")}
          className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-dm text-sm ${
            activeTab === "features"
              ? "bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <HiLightningBolt className="h-4 w-4" />
          Features
        </button>
        <button
          type="button"
          onClick={() => onTabChange("benefits")}
          className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-dm text-sm ${
            activeTab === "benefits"
              ? "bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <HiOutlineHeart className="h-4 w-4" />
          Benefits
        </button>
      </div>
    </div>
  );
}

type HubCard = {
  id: string;
  title: string;
  description: string;
  preview: HubCardPreview;
};

type HubCardPreview =
  | "withdrawal"
  | "purposemap"
  | "habit"
  | "cushion"
  | "voice"
  | "bonus"
  | "pause"
  | "paycycle"
  | "adjustgoals"
  | "nudges"
  | "support"
  | "people"
  | "monthlyrecap"
  | "moneyfeels";

const featureTopCards: HubCard[] = [
  {
    id: "card-1",
    title: "Block My Own Withdrawals",
    description:
      "You choose the delay, the cooling-off period, or the approval step that keeps your savings out of reach when you're tempted to spend it.",
    preview: "withdrawal",
  },
  {
    id: "card-2",
    title: "PurposeMap™",
    description:
      "Name the goal in your own words — next $500, gas cushion, kids' school week — and watch every deposit move you toward it.",
    preview: "purposemap",
  },
  {
    id: "card-3",
    title: "Habit Builder",
    description:
      "Stack small, doable actions each week so saving becomes something you do — not something you feel guilty about skipping.",
    preview: "habit",
  },
];

const featureBottomCards: HubCard[] = [
  {
    id: "card-4",
    title: "Cushion Dashboard",
    description:
      "See your buffer grow deposit by deposit, with plain-language milestones instead of charts you have to decode.",
    preview: "cushion",
  },
  {
    id: "card-5",
    title: "Quick Voice Check-ins",
    description:
      "Tap and talk for 20 seconds — no journaling, no long surveys, no lectures. Your words, your pace.",
    preview: "voice",
  },
  {
    id: "card-6",
    title: "$10 Welcome Bonus",
    description:
      "Open your PurposeMint-linked FDIC-insured savings account and unlock $10 when you save your first $25.",
    preview: "bonus",
  },
];

const benefitsTopCards: HubCard[] = [
  {
    id: "benefit-1",
    title: "Paused, Not Failed",
    description:
      "Hit a hard week? Pause your plan without penalty, without a nagging notification, and pick back up when you're ready.",
    preview: "pause",
  },
  {
    id: "benefit-2",
    title: "Save on Your Pay Cycle",
    description:
      "Choose amounts and days that match how you actually get paid — weekly, biweekly, or whenever the money lands.",
    preview: "paycycle",
  },
  {
    id: "benefit-3",
    title: "Adjust Goals in a Tap",
    description:
      "Life shifts. Bump your goal up after a refund, ease it down after a rough month — no punishment, no reset.",
    preview: "adjustgoals",
  },
  {
    id: "benefit-4",
    title: "No-Judgment Nudges",
    description:
      "Reminders that read like a friend, not a scold. We name the win, not the miss.",
    preview: "nudges",
  },
];

const benefitsBottomCards: HubCard[] = [
  {
    id: "benefit-5",
    title: "Responsive Human Support",
    description:
      "Real people answer your messages. When you need help, you talk to a person — not a maze.",
    preview: "support",
  },
  {
    id: "benefit-6",
    title: "Save With Your People",
    description:
      "Opt into small group rituals — Transfer Tuesday, No-Spend Saturday, first-$500 challenges — and build alongside others.",
    preview: "people",
  },
  {
    id: "benefit-7",
    title: "Monthly Wins Recap",
    description:
      "One tap logs how the month felt. We hand back a plain, honest summary of what you built.",
    preview: "monthlyrecap",
  },
  {
    id: "benefit-8",
    title: "Track How Money Feels",
    description:
      "Log the stress, the relief, the calm. See how your relationship with money shifts as your cushion grows.",
    preview: "moneyfeels",
  },
];

function PausePreview() {
  return (
    <div className="space-y-3 text-left">
      <div className="animate-pulse rounded-xl border border-violet-100 bg-violet-50/80 px-3 py-2.5 font-dm text-[11px] font-medium text-[#2E0F3D]">
        Resting this week
      </div>
      <p className="font-dm text-[11px] font-medium text-[#c01763]">Resume when you&apos;re ready 💜</p>
    </div>
  );
}

function PaycyclePreview() {
  const options = ["Weekly", "Biweekly", "Payday"];
  const active = useCycleIndex(options.length, 2800);

  return (
    <div className="space-y-3 text-left">
      <CyclingPillGroup options={options} active={active} />
    </div>
  );
}

function AdjustGoalsPreview() {
  return <GoalProgressPreview min={68} max={92} durationMs={3600} phaseMs={400} />;
}

function NudgesPreview() {
  const messages = [
    { title: "Still here 💜", body: "A pause is allowed. Your cushion is still yours." },
    { title: "Small win today ✨", body: "You kept $12 in — that counts more than you think." },
    { title: "No lecture here", body: "We name the win, not the miss." },
  ];
  const active = useCycleIndex(messages.length, 2800);
  const message = messages[active];

  return (
    <div className="space-y-2.5 text-left">
      <div
        key={message.title}
        className="rounded-xl border border-pink-100 bg-[#fff5f8] px-3 py-2.5 font-dm text-[11px] font-semibold text-[#c01763] transition-all duration-500"
      >
        {message.title}
      </div>
      <p className="font-dm text-[11px] leading-relaxed text-slate-600 transition-opacity duration-500">
        {message.body}
      </p>
    </div>
  );
}

function SupportPreview() {
  const messages = [
    "Hey — real person here. How can we help today?",
    "Got it. Let me look at your account with you.",
    "You're not alone in this — we'll figure it out together.",
  ];
  const active = useCycleIndex(messages.length, 3000);

  return (
    <div className="space-y-2.5 text-left">
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
        <p className="font-dm text-[10px] font-medium text-slate-400">PurposeMint Support</p>
        <p
          key={active}
          className="mt-1 font-dm text-[11px] text-slate-700 transition-opacity duration-500"
        >
          {messages[active]}
        </p>
      </div>
      <p className="font-dm text-[11px] font-medium text-[#c01763]">Reply in minutes, not days</p>
    </div>
  );
}

function PeoplePreview() {
  const rituals = ["🔥 Transfer Tuesday", "✨ First-$500 challenge", "💜 No-Spend Saturday"];
  const active = useCycleIndex(rituals.length, 2400);

  return (
    <div className="space-y-2.5 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">This week</p>
      {rituals.map((ritual, i) => (
        <div
          key={ritual}
          className={`rounded-lg px-3 py-2 font-dm text-[11px] font-medium transition-all duration-500 ${
            i === active
              ? "scale-[1.02] border border-pink-200 bg-[#fff5f8] text-slate-800 shadow-sm"
              : i === 1
                ? "border border-purple-100 bg-purple-50/80 text-slate-700"
                : "border border-pink-100 bg-[#fff5f8] text-slate-700"
          }`}
        >
          {ritual}
        </div>
      ))}
    </div>
  );
}

function MonthlyRecapPreview() {
  const summaries = [
    "More calm than last week",
    "Saved on 3 of 4 planned days",
    "Your cushion grew by $48",
  ];
  const active = useCycleIndex(summaries.length, 2600);

  return (
    <div className="space-y-3 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">This month</p>
      <p
        key={active}
        className="font-dm text-[12px] font-semibold leading-relaxed text-[#2E0F3D] transition-opacity duration-500"
      >
        {summaries[active]}
      </p>
    </div>
  );
}

function MoneyFeelsPreview() {
  const moods = ["😔", "😐", "🙂", "😄", "⭐"];
  const active = useCycleIndex(moods.length, 2000);
  const feelings = [
    "This week: less stress than last",
    "Relief after the transfer landed",
    "Calmer about money than before",
  ];
  const feeling = feelings[Math.floor(active / 2)];

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between gap-1">
        {moods.map((emoji, i) => (
          <span
            key={emoji}
            className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm transition-all duration-500 ${
              i === active
                ? "scale-110 bg-[#fff5f8] ring-2 ring-[#c01763]/40"
                : "bg-slate-50"
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p
        key={feeling}
        className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-center font-dm text-[11px] font-medium text-slate-600 transition-opacity duration-500"
      >
        {feeling}
      </p>
    </div>
  );
}

function WithdrawalPreview() {
  const options = ["24 hours", "3 days", "Ask a friend"];
  const lockMessages = [
    "Locked for 24 hours ✨",
    "Locked until Friday ✨",
    "Friend approval required ✨",
  ];
  const active = useCycleIndex(options.length, 2800);

  return (
    <div className="space-y-3 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">Your delay</p>
      <CyclingPillGroup options={options} active={active} />
      <div className="relative min-h-[42px] rounded-xl border border-pink-100 bg-[#fff5f8]">
        {lockMessages.map((message, i) => (
          <p
            key={message}
            className={`absolute inset-x-0 top-0 px-3 py-2.5 font-dm text-[11px] font-medium text-[#c01763] transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}

function PurposeMapPreview() {
  return (
    <div className="space-y-3 text-left">
      <SmoothMetricBar
        label="Money"
        min={48}
        max={86}
        durationMs={3600}
        colorClass="from-[#c01763] to-[#8d0543]"
      />
      <SmoothMetricBar
        label="Mindset"
        min={22}
        max={38}
        durationMs={4200}
        phaseMs={600}
        colorClass="from-violet-400 to-violet-600"
      />
      <SmoothMetricBar
        label="Motivation"
        min={45}
        max={72}
        durationMs={3800}
        phaseMs={1200}
        colorClass="from-fuchsia-400 to-purple-600"
      />
    </div>
  );
}

function HabitPreview() {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const active = useCycleIndex(dayLabels.length, 1800);
  const streak = Math.min(dayLabels.length, active + 1);

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between gap-1">
        {dayLabels.map((label, i) => {
          const done = i <= active;
          return (
            <div
              key={`${label}-${i}`}
              className={`flex h-8 w-8 items-center justify-center rounded-lg font-dm text-[11px] font-semibold transition-all duration-500 ${
                done
                  ? "scale-105 bg-[#2E0F3D] text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-400"
              }`}
            >
              {done ? "✓" : label}
            </div>
          );
        })}
      </div>
      <p className="font-dm text-[11px] font-semibold text-[#c01763] transition-all duration-500">
        {streak}-day streak
      </p>
    </div>
  );
}

function CushionPreview() {
  return <GoalProgressPreview min={78} max={96} durationMs={3600} phaseMs={800} />;
}

function VoicePreview() {
  const messages = [
    "🗣️ Hey, it's been a good week.",
    "🎙️ Tap. Talk. Done.",
    "✅ Logged: save $20 from lunch",
  ];
  const active = useCycleIndex(messages.length, 2600);

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff5f8] text-base ring-2 ring-[#c01763]/30">
          🎙️
        </span>
        <div className="flex h-9 flex-1 items-center justify-center gap-[3px] rounded-xl border border-pink-100 bg-[#fff5f8] px-3">
          {[22, 36, 26, 44, 30, 50, 34, 24, 40, 28, 48, 32].map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full bg-gradient-to-t from-[#c01763] to-[#7c3aed] transition-all duration-500 ${
                i === active ? "scale-y-110 opacity-100" : "opacity-40"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 font-dm text-[11px] font-medium text-slate-600">
        <span className="relative z-10">20-second check-in</span>
        <span className="animate-voice-scan absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#c01763]/10 to-transparent" />
      </div>
      <p
        key={active}
        className="font-dm text-[11px] font-medium text-[#c01763] transition-opacity duration-500"
      >
        {messages[active]}
      </p>
    </div>
  );
}

function BonusPreview() {
  return (
    <div className="space-y-3 text-left">
      <div className="animate-pulse rounded-xl bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-4 py-3 text-center">
        <p className="font-play text-sm font-bold text-white">You unlocked $10 🎁</p>
      </div>
      <p className="font-dm text-[11px] leading-relaxed text-slate-600">
        First $25 saved in your FDIC-insured account
      </p>
    </div>
  );
}

function CardPreview({ type }: { type: HubCard["preview"] }) {
  switch (type) {
    case "withdrawal":
      return <WithdrawalPreview />;
    case "purposemap":
      return <PurposeMapPreview />;
    case "habit":
      return <HabitPreview />;
    case "cushion":
      return <CushionPreview />;
    case "voice":
      return <VoicePreview />;
    case "bonus":
      return <BonusPreview />;
    case "pause":
      return <PausePreview />;
    case "paycycle":
      return <PaycyclePreview />;
    case "adjustgoals":
      return <AdjustGoalsPreview />;
    case "nudges":
      return <NudgesPreview />;
    case "support":
      return <SupportPreview />;
    case "people":
      return <PeoplePreview />;
    case "monthlyrecap":
      return <MonthlyRecapPreview />;
    case "moneyfeels":
      return <MoneyFeelsPreview />;
  }
}

const HubCardItem = forwardRef<
  HTMLElement,
  { card: HubCard; compact?: boolean }
>(function HubCardItem({ card, compact }, ref) {
  return (
    <article
      ref={ref}
      className={`relative z-10 flex flex-col rounded-[20px] border border-pink-100/80 bg-[#fdf5f9] text-center ${
        compact
          ? "min-h-[240px] p-4 sm:min-h-[280px] md:min-h-[300px] sm:p-5"
          : "min-h-[280px] p-4 sm:min-h-[340px] sm:p-5 md:min-h-[360px] md:p-6"
      }`}
    >
      <h3
        className={`font-play font-bold text-slate-900 ${
          compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        }`}
      >
        {card.title}
      </h3>
      <p
        className={`mt-2 font-dm leading-relaxed text-slate-600 ${
          compact ? "text-xs sm:text-[13px]" : "text-sm"
        }`}
      >
        {card.description}
      </p>
      <div className={`mt-4 flex flex-1 flex-col rounded-2xl border border-white/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] ${compact ? "p-3" : "p-4"}`}>
        <CardPreview type={card.preview} />
      </div>
    </article>
  );
});

function buildConnectorPath(
  hubX: number,
  hubY: number,
  cardX: number,
  cardY: number,
) {
  const ctrlY = hubY + (cardY - hubY) * 0.55;
  return `M ${hubX} ${hubY} C ${hubX} ${ctrlY}, ${cardX} ${ctrlY}, ${cardX} ${cardY}`;
}

function HubConnectors({
  layoutRef,
  hubRef,
  cardRefs,
  topCardCount,
  cardCount,
  columns,
}: {
  layoutRef: React.RefObject<HTMLDivElement | null>;
  hubRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
  topCardCount: number;
  cardCount: number;
  columns: 3 | 4;
}) {
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updatePaths = useCallback(() => {
    const layout = layoutRef.current;
    const hub = hubRef.current;
    if (!layout || !hub) return;

    const layoutRect = layout.getBoundingClientRect();
    setSize({ width: layoutRect.width, height: layoutRect.height });

    const hubRect = hub.getBoundingClientRect();
    const hubX = hubRect.left + hubRect.width / 2 - layoutRect.left;
    const hubY = hubRect.top + hubRect.height / 2 - layoutRect.top;

    const nextPaths: string[] = [];

    for (let i = 0; i < cardCount; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      const cardRect = cardEl.getBoundingClientRect();
      const cardX = cardRect.left + cardRect.width / 2 - layoutRect.left;
      const isTop = i < topCardCount;
      const cardY = isTop
        ? cardRect.bottom - layoutRect.top
        : cardRect.top - layoutRect.top;

      nextPaths.push(buildConnectorPath(hubX, hubY, cardX, cardY));
    }

    setPaths(nextPaths);
  }, [layoutRef, hubRef, cardRefs, topCardCount, cardCount]);

  useEffect(() => {
    updatePaths();

    const layout = layoutRef.current;
    if (!layout) return;

    const observer = new ResizeObserver(updatePaths);
    observer.observe(layout);

    window.addEventListener("resize", updatePaths);
    const fontTimer = window.setTimeout(updatePaths, 150);
    const loadTimer = window.setTimeout(updatePaths, 600);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePaths);
      window.clearTimeout(fontTimer);
      window.clearTimeout(loadTimer);
    };
  }, [layoutRef, updatePaths]);

  if (size.width === 0 || paths.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      width={size.width}
      height={size.height}
      fill="none"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#cbd5e1"
          strokeDasharray="7 7"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function PurposeMintHub({ hubRef }: { hubRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative z-10 my-4 flex w-full items-center justify-center py-6 sm:my-5 sm:py-8">
      <div ref={hubRef} className="relative inline-flex items-center justify-center px-4">
        {/* Soft glow — no mask, no box, purely blurred gradients */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div
            className="absolute left-1/2 top-1/2 h-[90px] w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 blur-[52px] sm:h-[110px] sm:blur-[62px] md:w-[760px]"
            style={{
              background:
                "radial-gradient(ellipse 100% 72% at center, rgba(244, 114, 182, 0.55) 0%, rgba(192, 23, 99, 0.38) 38%, rgba(168, 85, 247, 0.22) 62%, transparent 84%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[70px] w-[min(78vw,560px)] -translate-x-1/2 -translate-y-1/2 blur-[38px] sm:h-[85px] sm:blur-[46px] md:w-[620px]"
            style={{
              background:
                "radial-gradient(ellipse 100% 68% at center, rgba(192, 132, 252, 0.32) 0%, rgba(192, 23, 99, 0.28) 48%, transparent 78%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[50px] w-[min(62vw,420px)] -translate-x-1/2 -translate-y-1/2 blur-[26px] sm:h-[60px] md:w-[480px]"
            style={{
              background:
                "radial-gradient(ellipse 100% 62% at center, rgba(192, 23, 99, 0.35) 0%, rgba(176, 15, 87, 0.18) 52%, transparent 84%)",
            }}
          />
        </div>

        <h2 className="relative z-10 whitespace-nowrap text-center font-play text-[clamp(2.25rem,11vw,8.25rem)] font-bold leading-none tracking-[-0.02em] text-slate-950">
          PurposeMint
        </h2>
      </div>
    </div>
  );
}

function HubCardsLayout({
  topCards,
  bottomCards,
  layoutRef,
  hubRef,
  cardRefs,
  columns,
  compact,
}: {
  topCards: HubCard[];
  bottomCards: HubCard[];
  layoutRef: React.RefObject<HTMLDivElement | null>;
  hubRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
  columns: 3 | 4;
  compact?: boolean;
}) {
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const cardCount = topCards.length + bottomCards.length;

  return (
    <>
      <HubConnectors
        layoutRef={layoutRef}
        hubRef={hubRef}
        cardRefs={cardRefs}
        topCardCount={topCards.length}
        cardCount={cardCount}
        columns={columns}
      />

      <div className={`relative z-10 grid gap-4 pb-2 ${gridClass} lg:gap-5`}>
        {topCards.map((card, i) => (
          <HubCardItem key={card.id} ref={(el) => { cardRefs.current[i] = el; }} card={card} compact={compact} />
        ))}
      </div>

      <PurposeMintHub hubRef={hubRef} />

      <div className={`relative z-10 grid gap-4 pt-2 ${gridClass} lg:gap-5`}>
        {bottomCards.map((card, i) => (
          <HubCardItem
            key={card.id}
            ref={(el) => { cardRefs.current[topCards.length + i] = el; }}
            card={card}
            compact={compact}
          />
        ))}
      </div>
    </>
  );
}

export default function FeatureHubSection() {
  const featuresLayoutRef = useRef<HTMLDivElement>(null);
  const benefitsLayoutRef = useRef<HTMLDivElement>(null);
  const featuresHubRef = useRef<HTMLDivElement>(null);
  const benefitsHubRef = useRef<HTMLDivElement>(null);
  const featuresCardRefs = useRef<(HTMLElement | null)[]>([]);
  const benefitsCardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<"features" | "benefits">("features");

  const handleTabChange = (tab: "features" | "benefits") => {
    setActiveTab(tab);
    featuresCardRefs.current = [];
    benefitsCardRefs.current = [];
  };

  return (
    <section id="feature-hub" className="relative overflow-hidden bg-[#fdfbf7] py-10 sm:py-14 md:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FeatureHubHeader activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "features" && (
          <div key="features" ref={featuresLayoutRef} className="relative">
            <HubCardsLayout
              topCards={featureTopCards}
              bottomCards={featureBottomCards}
              layoutRef={featuresLayoutRef}
              hubRef={featuresHubRef}
              cardRefs={featuresCardRefs}
              columns={3}
            />
          </div>
        )}
      </div>

      {activeTab === "benefits" && (
        <div key="benefits" className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div ref={benefitsLayoutRef} className="relative">
            <HubCardsLayout
              topCards={benefitsTopCards}
              bottomCards={benefitsBottomCards}
              layoutRef={benefitsLayoutRef}
              hubRef={benefitsHubRef}
              cardRefs={benefitsCardRefs}
              columns={4}
              compact
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, forwardRef } from "react";

type HubCard = {
  id: string;
  title: string;
  description: string;
  preview: "withdrawal" | "purposemap" | "habit" | "cushion" | "voice" | "bonus";
};

const topCards: HubCard[] = [
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

const bottomCards: HubCard[] = [
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

function WithdrawalPreview() {
  const options = ["24 hours", "3 days", "Ask a friend"];
  return (
    <div className="space-y-3 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">Your delay</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => (
          <span
            key={option}
            className={`rounded-full px-3 py-1.5 font-dm text-[11px] font-medium ${
              i === 1
                ? "bg-[#2E0F3D] text-white"
                : "border border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {option}
          </span>
        ))}
      </div>
      <div className="rounded-xl border border-pink-100 bg-[#fff5f8] px-3 py-2.5 font-dm text-[11px] font-medium text-[#c01763]">
        Locked until Friday ✨
      </div>
    </div>
  );
}

function PurposeMapPreview() {
  const metrics = [
    { label: "Money", value: 72, color: "from-[#c01763] to-[#8d0543]" },
    { label: "Mindset", value: 29, color: "from-violet-400 to-violet-600" },
    { label: "Motivation", value: 58, color: "from-amber-400 to-orange-500" },
  ];
  return (
    <div className="space-y-3 text-left">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="mb-1 flex justify-between font-dm text-[11px] font-medium text-slate-700">
            <span>{metric.label}</span>
            <span className="text-[#c01763]">{metric.value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HabitPreview() {
  const days = [
    { label: "✓", done: true },
    { label: "✓", done: true },
    { label: "✓", done: true },
    { label: "T", done: false },
    { label: "F", done: false },
    { label: "S", done: false },
    { label: "✓", done: true },
  ];
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between gap-1">
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-lg font-dm text-[11px] font-semibold ${
              day.done
                ? "bg-[#2E0F3D] text-white"
                : "border border-slate-200 bg-slate-50 text-slate-400"
            }`}
          >
            {day.label}
          </div>
        ))}
      </div>
      <p className="font-dm text-[11px] font-semibold text-[#c01763]">4-day streak</p>
    </div>
  );
}

function CushionPreview() {
  return (
    <div className="space-y-3 text-left">
      <p className="font-dm text-[11px] font-medium text-slate-500">This week</p>
      <p className="font-play text-xl font-bold text-slate-900">
        $480 <span className="text-sm font-dm font-medium text-slate-400">of $500</span>
      </p>
      <div>
        <div className="mb-1 flex justify-end font-dm text-[11px] font-semibold text-[#c01763]">
          96%
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#c01763] to-[#8d0543]"
            style={{ width: "96%" }}
          />
        </div>
      </div>
    </div>
  );
}

function VoicePreview() {
  const moods = ["😔", "😐", "🙂", "😄", "⭐"];
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between gap-1">
        {moods.map((emoji, i) => (
          <button
            key={emoji}
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-base transition-colors ${
              i === 3
                ? "bg-[#fff5f8] ring-2 ring-[#c01763]/40"
                : "bg-slate-50 hover:bg-slate-100"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-center font-dm text-[11px] font-medium text-slate-600">
        20-second check-in
      </div>
    </div>
  );
}

function BonusPreview() {
  return (
    <div className="space-y-3 text-left">
      <div className="rounded-xl bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-4 py-3 text-center">
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
  }
}

const HubCardItem = forwardRef<HTMLElement, { card: HubCard }>(function HubCardItem(
  { card },
  ref,
) {
  return (
    <article
      ref={ref}
      className="relative z-10 flex min-h-[340px] flex-col rounded-[22px] border border-violet-100/80 bg-[#f0f4ff] p-6 text-center sm:min-h-[360px] sm:p-7"
    >
      <h3 className="font-play text-lg font-bold text-slate-900 sm:text-xl">{card.title}</h3>
      <p className="mt-2 font-dm text-sm leading-relaxed text-slate-600">{card.description}</p>
      <div className="mt-5 flex flex-1 flex-col rounded-2xl border border-white/80 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
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
}: {
  layoutRef: React.RefObject<HTMLDivElement | null>;
  hubRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
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

    const totalCards = topCards.length + bottomCards.length;
    const nextPaths: string[] = [];

    for (let i = 0; i < totalCards; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      const cardRect = cardEl.getBoundingClientRect();
      const cardX = cardRect.left + cardRect.width / 2 - layoutRect.left;
      const isTop = i < topCards.length;
      const cardY = isTop
        ? cardRect.bottom - layoutRect.top
        : cardRect.top - layoutRect.top;

      nextPaths.push(buildConnectorPath(hubX, hubY, cardX, cardY));
    }

    setPaths(nextPaths);
  }, [layoutRef, hubRef, cardRefs]);

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
                "radial-gradient(ellipse 100% 72% at center, rgba(244, 114, 182, 0.55) 0%, rgba(251, 146, 60, 0.38) 38%, rgba(253, 224, 71, 0.22) 62%, transparent 84%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[70px] w-[min(78vw,560px)] -translate-x-1/2 -translate-y-1/2 blur-[38px] sm:h-[85px] sm:blur-[46px] md:w-[620px]"
            style={{
              background:
                "radial-gradient(ellipse 100% 68% at center, rgba(253, 224, 71, 0.32) 0%, rgba(192, 23, 99, 0.28) 48%, transparent 78%)",
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

        <h2 className="relative z-10 whitespace-nowrap text-center font-play text-[64px] font-bold leading-none tracking-[-0.02em] text-slate-950 sm:text-[84px] md:text-[108px] lg:text-[132px]">
          PurposeMint
        </h2>
      </div>
    </div>
  );
}

export default function FeatureHubSection() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const setCardRef = (index: number) => (el: HTMLElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <section id="feature-hub" className="relative overflow-hidden bg-[#fbfcfd] py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div ref={layoutRef} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HubConnectors layoutRef={layoutRef} hubRef={hubRef} cardRefs={cardRefs} />

        <div className="relative z-10 grid grid-cols-1 gap-5 pb-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {topCards.map((card, i) => (
            <HubCardItem key={card.id} ref={setCardRef(i)} card={card} />
          ))}
        </div>

        <PurposeMintHub hubRef={hubRef} />

        <div className="relative z-10 grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {bottomCards.map((card, i) => (
            <HubCardItem key={card.id} ref={setCardRef(topCards.length + i)} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

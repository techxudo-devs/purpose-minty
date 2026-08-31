"use client";

import {
  Heart,
  MessageCircle,
  PauseCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const items: {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    title: "A surprise bill",
    description:
      "You get a separate buffer for surprises, so one bad week doesn't wipe out your goal.",
    icon: ShieldCheck,
    accent: "from-[#c084fc]/90 via-[#7c3aed]/90 to-[#52005c]/90",
  },
  {
    title: "Confusing money apps",
    description: "No jargon, no rigid rules. Plain language and one clear next step.",
    icon: MessageCircle,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#8d0543]/90",
  },
  {
    title: "Feeling unseen",
    description: "Money you send home, your tithe, your people — all of it counts here.",
    icon: Heart,
    accent: "from-[#c01763]/90 via-[#b00f57]/90 to-[#52005c]/90",
  },
  {
    title: "Falling behind",
    description: "Miss a week? Paused, not failed. Pick up where you left off.",
    icon: PauseCircle,
    accent: "from-[#f472b6]/90 via-[#c01763]/90 to-[#7c3aed]/90",
  },
];

function OptionPill({
  title,
  description,
  icon: Icon,
  accent,
}: (typeof items)[number]) {
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
        <div className="option-pill-shimmer pointer-events-none absolute inset-0" aria-hidden />

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

export default function BetterOptionsSection() {
  return (
    <section id="features" className="relative w-full overflow-hidden bg-[#fdfbf7] py-10 sm:py-12 md:py-14">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-play text-2xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            You&apos;re not bad with money.<br/>{" "}
            <span className="text-[#c01763]">You&apos;ve just been handed bad options.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:text-base">
            When something breaks, the fastest option nearby is usually a payday loan.
            PurposeMint gives you a better one — before you need it.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {items.map((item) => (
            <OptionPill key={item.title} {...item} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes optionPillShimmer {
          0% {
            transform: translateX(-130%) skewX(-14deg);
          }
          100% {
            transform: translateX(230%) skewX(-14deg);
          }
        }
        .option-pill-shimmer {
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 70%
          );
          animation: optionPillShimmer 5.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .option-pill-shimmer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

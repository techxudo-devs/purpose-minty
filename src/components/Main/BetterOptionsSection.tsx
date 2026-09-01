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

function OptionPoint({
  title,
  description,
  icon: Icon,
  accent,
}: (typeof items)[number]) {
  return (
    <div className="mx-auto flex w-full max-w-[280px] flex-col items-center px-2 text-center sm:max-w-none sm:px-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br sm:h-11 sm:w-11 ${accent}`}
      >
        <Icon
          className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]"
          strokeWidth={2.25}
          aria-hidden
        />
      </div>
      <h3 className="mt-3 font-play text-[14px] leading-snug text-[#2E0F3D] sm:mt-4 sm:text-[15px] md:text-[16px]">
        {title}
      </h3>
      <p className="mt-1.5 font-dm text-[12px] leading-relaxed text-slate-600 sm:mt-2 sm:text-[13px] md:text-[14px]">
        {description}
      </p>
    </div>
  );
}

export default function BetterOptionsSection() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden bg-[#fdfbf7] py-10 sm:py-10 md:py-10 lg:py-10"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-play text-[1.65rem] leading-[1.15] tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-5xl">
            You&apos;re not bad with money.{" "}
            <span className="text-[#c01763]">You&apos;ve just been handed bad options.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-dm text-[13px] leading-relaxed text-slate-600 sm:mt-4 sm:text-sm md:text-base">
            When something breaks, the fastest option nearby is usually a payday loan.
            PurposeMint gives you a better one — before you need it.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-6xl sm:mt-10 md:mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {items.map((item) => (
              <OptionPoint key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

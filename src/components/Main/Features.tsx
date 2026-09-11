"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import { HiShieldCheck, HiChat, HiHeart, HiPause } from "react-icons/hi";
import { links } from "./site";

const PERSON_IMAGE = "/images/threepersons.png";

const featureCards = [
  {
    id: "surprise-bill",
    title: "A surprise bill",
    description:
      "You get a separate buffer for surprises, so one bad week doesn't wipe out your goal.",
    Icon: HiShieldCheck,
    position: "left-[4%] top-[5%] -rotate-[4deg] lg:left-[6%] lg:top-[4%]",
  },
  {
    id: "confusing-apps",
    title: "Confusing money apps",
    description: "No jargon, no rigid rules. Plain language and one clear next step.",
    Icon: HiChat,
    position: "right-[4%] top-[5%] rotate-[4deg] lg:right-[6%] lg:top-[4%]",
  },
  {
    id: "feeling-unseen",
    title: "Feeling unseen",
    description: "Money you send home, your tithe, your people — all of it counts here.",
    Icon: HiHeart,
    position: "left-[4%] bottom-[5%] -rotate-[3deg] lg:left-[6%] lg:bottom-[4%]",
  },
  {
    id: "falling-behind",
    title: "Falling behind",
    description: "Miss a week? Paused, not failed. Pick up where you left off.",
    Icon: HiPause,
    position: "right-[4%] bottom-[5%] rotate-[3deg] lg:right-[6%] lg:bottom-[4%]",
  },
];

function BrowserCard({
  title,
  description,
  Icon,
  className = "",
}: {
  title: string;
  description: string;
  Icon: IconType;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[260px] overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_18px_40px_-18px_rgba(46,15,61,0.28)] lg:max-w-[280px] xl:max-w-[300px] ${className}`}
    >
      <div className="px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fff5f8] text-[#c01763]">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <p className="font-dm text-[13px] font-semibold leading-tight text-slate-900">{title}</p>
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-slate-600 sm:text-[12px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative flex w-full flex-col items-center bg-[#fbfcfd] py-12 sm:py-14 md:py-16"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.18) 0%, rgba(192, 132, 252, 0.12) 45%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-dm text-[12px] font-medium text-slate-700 sm:text-[13px]"
            style={{
              background:
                "linear-gradient(#fbfcfd, #fbfcfd) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            Sound familiar? 👋
          </span>

          <h2 className="mt-4 font-play text-2xl tracking-tight text-slate-950 sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            You&apos;re not bad with money.{" "}
            <span className="text-[#c01763]">You&apos;ve just been handed bad options.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base">
            When something breaks, the fastest option nearby is usually a payday loan. PurposeMint
            gives you a better one — before you need it.
          </p>
        </div>

        {/* Desktop: floating cards + center image */}
        <div className="relative mx-auto mt-10 hidden h-[500px] w-full px-2 sm:px-4 lg:block xl:h-[540px]">
          {featureCards.map((card) => (
            <div key={card.id} className={`absolute z-20 ${card.position}`}>
              <BrowserCard title={card.title} description={card.description} Icon={card.Icon} />
            </div>
          ))}

          <div className="pointer-events-none absolute bottom-28 left-1/2 z-10 h-[330px] w-[310px] -translate-x-1/2 lg:h-[360px] lg:w-[350px] xl:bottom-36 xl:h-[400px] xl:w-[480px]">
            <Image
              src={PERSON_IMAGE}
              alt="People from the PurposeMint community"
              fill
              className="object-contain object-bottom mix-blend-screen"
              style={{ objectPosition: "center bottom" }}
              sizes="(min-width: 1280px) 480px, 350px"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 h-36"
              style={{
                background:
                  "linear-gradient(to top, #fbfcfd 8%, rgba(251,252,253,0.92) 45%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="relative mx-auto mt-8 max-w-md lg:hidden">
          <div className="relative mx-auto mb-6 h-[240px] w-[min(100%,340px)] sm:h-[280px] sm:w-[380px]">
            <Image
              src={PERSON_IMAGE}
              alt="People from the PurposeMint community"
              fill
              className="object-contain object-bottom mix-blend-screen"
              sizes="380px"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(to top, #fbfcfd 10%, rgba(251,252,253,0.9) 50%, transparent 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {featureCards.map((card, index) => (
              <BrowserCard
                key={card.id}
                title={card.title}
                description={card.description}
                Icon={card.Icon}
                className={`mx-auto ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-2xl text-center sm:mt-12">
          <a
            href={links.waitlist}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#2E0F3D] px-7 py-3 font-dm text-sm font-semibold text-white transition hover:bg-[#c01763] sm:px-8 sm:py-3.5"
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </section>
  );
}

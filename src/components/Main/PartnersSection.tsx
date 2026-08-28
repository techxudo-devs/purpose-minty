"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Building2, HeartHandshake, Route } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { links } from "./site";

const beats = [
  {
    id: "beat-1",
    label: "Beat 1",
    title: "Warmth, reclaimed.",
    body: "Community deposits are increasingly moving toward digital-first options that don't know a member's name. PurposeMint offers your institution a warm, trusted front door back into an audience you already have reach into but haven't fully activated — savers who want the relationship a real bank offers, not just an app.",
    icon: HeartHandshake,
    accent: "from-amber-500/20 via-orange-400/10 to-rose-500/20",
    bar: "from-[#f59e0b] via-[#f97316] to-[#c01763]",
    rotate: "-rotate-1",
    offset: "md:translate-y-6",
  },
  {
    id: "beat-2",
    label: "Beat 2",
    title: "A pipeline, not a cold start.",
    body: "PurposeMint gives you a pipeline of qualified, savings-ready customers — people who've already built a track record of consistent deposits — while lowering your customer acquisition cost. You get customers who are ready to bank with you before they ever walk in the door.",
    icon: Route,
    accent: "from-[#c01763]/25 via-[#b00f57]/15 to-[#52005c]/25",
    bar: "from-[#52005c] via-[#c01763] to-[#b00f57]",
    rotate: "rotate-0",
    offset: "md:-translate-y-4",
    featured: true,
  },
  {
    id: "beat-3",
    label: "Beat 3",
    title: "Built for CRA, not retrofitted.",
    body: "PurposeMint's community savings model aligns directly with CRA community development and service requirements — this isn't a side benefit, it's confirmed alignment with the guidelines your team already reports against. Partnering documents real, measurable outcomes in the exact communities your CRA obligations are built to serve.",
    icon: Building2,
    accent: "from-[#2E0F3D]/20 via-violet-900/10 to-slate-900/20",
    bar: "from-[#2E0F3D] via-[#52005c] to-[#0a0a0a]",
    rotate: "rotate-1",
    offset: "md:translate-y-6",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function BeatCard({
  beat,
  index,
}: {
  beat: (typeof beats)[number];
  index: number;
}) {
  const Icon = beat.icon;

  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-pink-200/80 ${beat.rotate} ${beat.offset}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${beat.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div
          className={`relative overflow-hidden bg-gradient-to-r ${beat.bar} px-6 py-5 sm:px-7`}
        >
          {beat.featured && (
            <>
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 14px)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
            </>
          )}

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/90 font-dm">
                {beat.label}
              </span>
              <h3 className="mt-3 font-play text-[22px] leading-tight text-white sm:text-[24px]">
                {beat.title}
              </h3>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <motion.span
            aria-hidden
            className="pointer-events-none absolute -bottom-3 right-4 select-none font-play text-[72px] leading-none text-white/10 sm:text-[88px]"
            initial={{ x: 20, opacity: 0.08 }}
            whileHover={{ x: 0, opacity: 0.16 }}
            transition={{ duration: 0.4 }}
          >
            {index + 1}
          </motion.span>
        </div>

        <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
          <p className="font-dm text-[14px] leading-[1.75] text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
            {beat.body}
          </p>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-all duration-300 group-hover:via-pink-200" />

          {/* <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#c01763] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8d0543] font-dm">
            Partner advantage
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div> */}
        </div>
      </div>
    </motion.article>
  );
}

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative w-full overflow-hidden bg-[#fdfbf7] py-10"
    >
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

      <div
        className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.35) 0%, rgba(251, 146, 60, 0.2) 45%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(253, 224, 71, 0.35) 0%, rgba(192, 23, 99, 0.18) 45%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-16">
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-[12px] font-medium text-slate-700 sm:text-[13px]"
            style={{
              background:
                "linear-gradient(#fdfbf7, #fdfbf7) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            For Banking & Credit Union Partners
          </span>

          <h2 className="mt-5 font-play text-3xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Bank the savers you haven&apos;t
            <br />
            reached yet.
          </h2>
          <p className="mt-4 max-w-2xl font-dm text-base leading-relaxed text-slate-600 sm:text-lg">
            PurposeMint prepares households before they ever apply — then hands you a relationship, not a lead.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
          }}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6"
        >
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#c01763]/25 to-transparent md:block" />

          {beats.map((beat, index) => (
            <BeatCard key={beat.id} beat={beat} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center text-center sm:mt-16"
        >
          <Link
            href={links.partner}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-9 py-4 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 active:scale-[0.98] font-dm"
          >
            Partner With Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <p className="mt-4 font-dm text-sm text-slate-500 sm:text-base">
            Or email{" "}
            <a
              href={links.email}
              className="cursor-pointer font-medium text-[#c01763] underline-offset-4 transition-colors hover:text-[#8d0543] hover:underline"
            >
              admin@minttoprosper.org
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

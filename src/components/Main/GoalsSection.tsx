"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, Sparkles } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROW = 88;
const VISIBLE = 3;
const INTERVAL_MS = 1700;

const goals = [
  { title: "Fresh haircut or protective style", hint: "Look ready for the week", icon: "💇" },
  { title: "'Just in case' gas money", hint: "Get where you need to go", icon: "⛽" },
  { title: "Ice cream for the kids", hint: "A small joy that counts", icon: "🍦" },
  { title: "Emergency takeout night", hint: "When cooking isn't possible", icon: "🥡" },
  { title: "Therapy or talk-it-out session", hint: "Care for your mind", icon: "💬" },
  { title: "New outfit for a job interview", hint: "Show up with confidence", icon: "👗" },
  { title: "Treat-yourself coffee run", hint: "A pause you can afford", icon: "☕" },
  { title: "Birthday or school surprise fund", hint: "Be ready for the moment", icon: "🎁" },
  { title: "Self-Care Sunday supplies", hint: "Rest is part of the plan", icon: "✨" },
  { title: "'Just in case' emergency stash", hint: "A cushion for the unexpected", icon: "🛡️" },
  { title: "Mental health day budget", hint: "Permission to pause", icon: "💜" },
  { title: "Your own custom goal", hint: "Save for what you need", icon: "➕" },
];

type Goal = (typeof goals)[number];

function MarkerUnderline({ children }: { children: ReactNode }) {
  return (
    <span
      className="box-decoration-clone px-1 pb-1"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(192, 23, 99, 0.22) 0%, rgba(244, 114, 182, 0.32) 45%, rgba(253, 224, 71, 0.28) 100%)",
      }}
    >
      {children}
    </span>
  );
}

function fillRow(el: HTMLElement, goal: Goal, index: number) {
  const icon = el.querySelector("[data-icon]");
  const title = el.querySelector("[data-title]");
  const hint = el.querySelector("[data-hint]");
  if (icon) icon.textContent = goal.icon;
  if (title) title.textContent = goal.title;
  if (hint) hint.textContent = goal.hint;
  el.dataset.index = String(index);
}

function GoalRow({ goal, index, featured }: { goal: Goal; index: number; featured?: boolean }) {
  return (
    <div
      className={`goal-ticker-row relative flex h-[88px] items-center gap-3.5 border-b border-slate-100/90 px-5 transition-colors duration-500 ${
        featured ? "bg-gradient-to-r from-[#fff5f8] via-white to-[#fdf8ff]" : "bg-white/80"
      }`}
      data-index={index}
    >
      <span
        data-icon
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 text-[20px] shadow-[0_8px_20px_-12px_rgba(192,23,99,0.35)]"
      >
        {goal.icon}
      </span>

      <div className="relative z-10 min-w-0 flex-1">
        <p
          data-title
          className="truncate font-dm text-[14px] font-semibold text-slate-900 sm:text-[15px]"
        >
          {goal.title}
        </p>
        <p data-hint className="mt-0.5 truncate font-dm text-[12px] font-medium text-slate-500">
          {goal.hint}
        </p>
      </div>

      <span className="relative z-10 shrink-0 rounded-full border border-[#c01763]/15 bg-[#fff5f8] px-2.5 py-1 font-dm text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c01763]">
        Goal
      </span>
    </div>
  );
}

export default function GoalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!section || !track || !viewport) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const headerEls = headerRef.current
        ? gsap.utils.toArray<HTMLElement>("[data-reveal]", headerRef.current)
        : [];
      const cardEl = cardRef.current;
      const quoteEl = quoteRef.current;

      if (!reducedMotion) {
        gsap.set([...headerEls, cardEl, quoteEl], { opacity: 0, y: 28 });

        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        entrance
          .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
          .to(cardEl, { opacity: 1, y: 0, duration: 0.75, scale: 1 }, "-=0.45")
          .to(quoteEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.35");
      }

      if (reducedMotion) return;

      const template = track.querySelector(".goal-ticker-row");
      if (!template) return;

      let next = VISIBLE;
      let busy = false;
      let loopId: number | null = null;

      const highlightTopRow = () => {
        track.querySelectorAll(".goal-ticker-row").forEach((row, i) => {
          const el = row as HTMLElement;
          if (i === 0) {
            gsap.to(el, {
              backgroundColor: "rgba(255, 245, 248, 0.95)",
              duration: 0.22,
              ease: "power2.out",
            });
          } else {
            gsap.to(el, { backgroundColor: "rgba(255,255,255,0.8)", duration: 0.22 });
          }
        });
      };

      const step = () => {
        if (busy) return;

        const node = template.cloneNode(true) as HTMLElement;
        fillRow(node, goals[next % goals.length], next);
        next += 1;

        gsap.set(node, { opacity: 0.65, scale: 0.985 });
        track.insertBefore(node, track.firstChild);
        busy = true;

        gsap.set(track, { y: -ROW });
        gsap.to(track, {
          y: 0,
          duration: 0.58,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            while (track.children.length > VISIBLE) {
              track.lastElementChild?.remove();
            }
            busy = false;
            highlightTopRow();
          },
        });

        gsap.to(node, {
          opacity: 1,
          scale: 1,
          duration: 0.58,
          ease: "power3.out",
        });

        const rows = track.querySelectorAll(".goal-ticker-row");
        if (rows.length > 1) {
          gsap.to(rows[rows.length - 1], {
            opacity: 0.45,
            duration: 0.32,
            ease: "power2.out",
          });
        }
      };

      const startLoop = () => {
        if (loopId) return;
        highlightTopRow();
        loopId = window.setInterval(step, INTERVAL_MS);
      };

      const stopLoop = () => {
        if (!loopId) return;
        window.clearInterval(loopId);
        loopId = null;
      };

      const tickerTrigger = ScrollTrigger.create({
        trigger: viewport,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: startLoop,
        onLeave: stopLoop,
        onEnterBack: startLoop,
        onLeaveBack: stopLoop,
      });

      return () => {
        stopLoop();
        tickerTrigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="goals"
      className="relative w-full overflow-hidden bg-[#fdfbf7] py-10 sm:py-10"
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
        className="pointer-events-none absolute -left-24 top-16 h-[380px] w-[380px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.35) 0%, rgba(251, 146, 60, 0.18) 45%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(253, 224, 71, 0.32) 0%, rgba(192, 23, 99, 0.16) 45%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-dm text-[12px] font-medium text-slate-700 sm:text-[13px]"
            style={{
              background:
                "linear-gradient(#fdfbf7, #fdfbf7) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#c01763]" />
            Real-life savings
          </span>

          <h2
            data-reveal
            className="mt-5 font-play text-3xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl"
          >
            Real Life Goals
          </h2>

          <p
            data-reveal
            className="mt-4 max-w-xl font-dm text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            Fun + survival-based savings — the moments that actually matter.
          </p>
        </div>

        <article
          ref={cardRef}
          className="relative mx-auto mt-10 w-full max-w-[500px] overflow-hidden rounded-2xl border border-pink-200/80 bg-white/90 backdrop-blur-sm sm:mt-12"
        >
          <div
            className="relative overflow-hidden px-6 pb-4 pt-5 sm:px-7"
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
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="text-left">
                <p className="font-play text-[20px] leading-tight text-white sm:text-[22px] ">
                  What you could save for
                </p>
                <p className="mt-1 font-dm text-[13px] text-pink-100/85">
                  {goals.length} real-life goals, cycling live
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              ref={viewportRef}
              className="relative overflow-hidden"
              style={{ height: ROW * VISIBLE }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-b from-transparent to-white"
                aria-hidden
              />

              <div ref={trackRef}>
                {goals.slice(0, VISIBLE).map((goal, index) => (
                  <GoalRow key={goal.title} goal={goal} index={index} featured={index === 0} />
                ))}
              </div>
            </div>
          </div>
        </article>

        <div ref={quoteRef} className="mx-auto mt-8 max-w-2xl text-center sm:mt-10">
          <p className="font-dm text-base font-medium italic text-slate-600 sm:text-lg">
            &ldquo;See what you could save for with PurposeMint.&rdquo;
          </p>

          <blockquote className="relative mx-auto mt-6 rounded-2xl border border-pink-100/80 bg-white/70 px-6 py-5 backdrop-blur-sm sm:px-8 sm:py-6">
            <Quote
              className="pointer-events-none absolute -left-1 -top-3 h-8 w-8 text-[#c01763] sm:-left-2"
              aria-hidden
            />
            <p className="font-dm text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              &ldquo;Not everyone is saving for a vacation—some of us just need clean shoes for school
              or a break from survival mode.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

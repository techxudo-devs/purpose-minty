"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ROW = 86;
const VISIBLE = 3;

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
    <span className="box-decoration-clone bg-[linear-gradient(120deg,rgba(244,114,182,0.35)_0%,rgba(253,224,71,0.45)_100%)] px-1 pb-1">
      {children}
    </span>
  );
}

function borderClass(index: number) {
  const turn = index % 4;
  if (turn === 0) return "is-lined";
  if (turn === 2) return "is-lined-dark";
  return "";
}

function applyBorder(el: HTMLElement, index: number) {
  el.classList.remove("is-lined", "is-lined-dark");
  const extra = borderClass(index);
  if (extra) el.classList.add(extra);
}

function fillRow(el: HTMLElement, goal: Goal, index: number) {
  const icon = el.querySelector("[data-icon]");
  const title = el.querySelector("[data-title]");
  const hint = el.querySelector("[data-hint]");
  if (icon) icon.textContent = goal.icon;
  if (title) title.textContent = goal.title;
  if (hint) hint.textContent = goal.hint;
  applyBorder(el, index);
}

function GoalRow({ goal, index }: { goal: Goal; index: number }) {
  const extra = borderClass(index);
  return (
    <div className={`goal-ticker-row ${extra}`}>
      <span data-icon className="goal-ticker-icon">
        {goal.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p data-title className="truncate text-[14px] font-extrabold text-[var(--plum)]">
          {goal.title}
        </p>
        <p data-hint className="truncate text-[12px] font-medium text-[var(--text-muted)]">
          {goal.hint}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-[var(--blush-2)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[var(--brand)]">
        Goal
      </span>
    </div>
  );
}

export default function GoalsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const track = trackRef.current;
      if (!track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const template = track.querySelector(".goal-ticker-row");
      if (!template) return;

      let next = VISIBLE;
      let busy = false;

      const step = contextSafe
        ? contextSafe(() => {
            if (busy) return;
            const node = template.cloneNode(true) as HTMLElement;
            fillRow(node, goals[next % goals.length], next);
            next += 1;
            gsap.set(node, { clearProps: "transform" });
            track.insertBefore(node, track.firstChild);
            busy = true;
            gsap.set(track, { y: -ROW });
            gsap.to(track, {
              y: 0,
              duration: 0.65,
              ease: "power2.inOut",
              overwrite: true,
              onComplete: () => {
                while (track.children.length > VISIBLE) {
                  track.lastElementChild?.remove();
                }
                busy = false;
              },
            });
          })
        : undefined;
      if (!step) return;

      const loop = window.setInterval(step, 2000);
      return () => window.clearInterval(loop);
    },
    { scope: viewportRef },
  );

  return (
    <section id="goals" className="section overflow-x-hidden pt-4">
      <div className="shell text-center">
        <h2 className="tight-heading">
          Real Life <MarkerUnderline>Goals</MarkerUnderline>
        </h2>
        <p className="mt-3 text-[16px] font-medium text-[var(--text-muted)]">(Fun + Survival-Based Savings)</p>

        <article className="goal-ticker-card relative mx-auto mt-10 w-full max-w-[420px]">
          <div className="px-6 pb-3 pt-5">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand)]">
              What you could save for
            </p>
            <p className="mt-1 text-[15px] font-semibold text-[var(--text-secondary)]">
              {goals.length} real-life goals, cycling live
            </p>
          </div>
          <div ref={viewportRef} className="relative overflow-hidden pb-2" style={{ height: ROW * VISIBLE }}>
            <div ref={trackRef}>
              {goals.slice(0, VISIBLE).map((goal, index) => (
                <GoalRow key={goal.title} goal={goal} index={index} />
              ))}
            </div>
          </div>
        </article>

        <p className="mt-8 text-[16px] font-medium italic text-[var(--text-secondary)]">
          &ldquo;See what you could save for with PurposeMint.&rdquo;
        </p>
        <blockquote className="mx-auto mt-5 max-w-[640px] text-[18px] font-medium leading-relaxed text-[var(--text-secondary)] sm:text-[20px]">
          &ldquo;Not everyone is saving for a vacation—some of us just need clean shoes for school or a break from
          survival mode.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
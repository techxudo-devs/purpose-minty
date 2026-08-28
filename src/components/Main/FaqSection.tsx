"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

// Safe fallback for links
const links = {
  waitlist: "https://minttoprosper.org/purposemint",
  email: "admin@minttoprosper.org",
};

type FaqItem = {
  q: string;
  a: string;
  kind?: "contact";
};

const topics = ["Partnership", "Support", "Waitlist", "Press"] as const;

const faqs: FaqItem[] = [
  {
    kind: "contact",
    q: "How do I contact PurposeMint?",
    a: "Email admin@minttoprosper.org for partnerships, support, waitlist, or press.",
  },
  {
    q: "What makes PurposeMint different from other savings apps?",
    a: "We keep real distance between you and your money — lock tools you control, coaching in plain language, and a pathway after your next $500. Not a payday loan. Not another chart you have to decode.",
  },
  {
    q: "Is my information and money actually secure?",
    a: "Yes. Savings sit in an FDIC-insured account with a partner bank. PurposeMint is the coaching and habit layer — your dollars stay with a regulated institution.",
  },
  {
    q: "What happens if I miss a week?",
    a: "Paused, not failed. Life happens. Pick up where you left off — no punishment, no reset, no lecture.",
  },
  {
    q: "What if an unexpected bill wipes out my savings?",
    a: "You get a separate buffer for surprises, so one bad week doesn’t wipe out your goal. That’s the cushion Level 2 is built to protect.",
  },
  {
    q: "Do I have to stop sending money home or giving my tithe?",
    a: "No. Money you send home, your tithe, your people — all of it counts here. PurposeMint is built around real life, not a rigid budget that pretends those things don’t exist.",
  },
  {
    q: "How do nudges and check-ins work?",
    a: "Gentle, encouraging reminders — plus optional 20-second voice check-ins. No journaling, no long surveys, no lectures. Your words, your pace.",
  },
  {
    q: "Can I set my own Real-Life Goals?",
    a: "Yes. Fresh haircut, gas money, ice cream for the kids, interview outfit, or your own custom goal. Name it in your words and watch every deposit move you toward it.",
  },
  {
    q: "Is there a free plan?",
    a: "Starter is free: first savings goal, PurposeMap™, gentle nudges, and one monthly community challenge. Momentum and Elevation add the FDIC-insured account, automation, and rewards.",
  },
  {
    q: "How do I get started?",
    a: "Join the waitlist or try the demo. Start at zero. Your first real goal isn’t $10,000 — it’s $500, and we’ll prove it’s possible.",
  },
  {
    q: "What is Block My Own Withdrawals?",
    a: "You choose the delay, cooling-off period, or approval step that keeps savings out of reach when you’re tempted to spend. The friction is yours to set — not ours to police.",
  },
  {
    q: "How does the $10 Welcome Bonus work?",
    a: "Open your PurposeMint-linked FDIC-insured savings account and unlock $10 when you save your first $25. A small win to prove the habit can start today.",
  },
  {
    q: "What are Pathways?",
    a: "Unlocked at Level 5. Your savings become proof you’re ready — then we match you with fair lenders and partners for a car, housing, childcare, or training. Real down payment, fair rate. No $500/month trap.",
  },
  {
    q: "Who are the banking partners?",
    a: "Deposits go to regulated, FDIC-insured partner banks and credit unions. PurposeMint prepares households; partners get a relationship, not a cold lead — including CRA-aligned community outcomes.",
  },
  {
    q: "What’s included in Momentum vs Elevation?",
    a: "Momentum ($19/mo) adds the FDIC-insured account, automatic transfers, unlimited goals, and the community board. Elevation ($49/mo) adds rewards, partner discounts, streak tracking, and deeper behavior insights.",
  },
  {
    q: "Is PurposeMint only for adults?",
    a: "The core product serves families and asset-limited households. Mint To Prosper also supports youth financial literacy — so the next generation isn’t handed payday loans as the default option.",
  },
];

const GAP = 20;

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {dir === "left" ? (
        <path
          d="M11.5 4.5 6.5 9l5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6.5 4.5 11.5 9l-5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 4 3.5 10.8l7.2 1.6L21 4ZM10.7 12.4 9.2 20 13 14.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactForm() {
  const [topic, setTopic] = useState<"" | (typeof topics)[number]>("");
  const [email, setEmail] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !topic) return;
    if (topic === "Waitlist") {
      window.open(links.waitlist, "_blank", "noopener,noreferrer");
      return;
    }
    const subject = encodeURIComponent(`[PurposeMint] ${topic}`);
    const body = encodeURIComponent(`From: ${trimmed}\nTopic: ${topic}\n\n`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="flex h-full flex-col justify-between" onClick={(event) => event.stopPropagation()} onSubmit={onSubmit}>
      <div>
        <span className="inline-flex w-fit rounded-full border border-[#facc15] bg-[#facc15]/10 px-3.5 py-1 text-xs font-dm font-medium tracking-wider text-[#facc15]">
          CONTACT US
        </span>
        <h3 className="mt-3.5 font-play text-[18px] leading-none text-white sm:text-[20px]">
          How do I contact PurposeMint?
        </h3>

        <label className="mt-4 flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white/90 focus-within:border-pink-300">
          <EnvelopeIcon />
          <span className="sr-only">Your email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="w-full bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/50"
          />
        </label>

        <div className="relative mt-3">
          <select
            required
            value={topic}
            onChange={(event) => setTopic(event.target.value as (typeof topics)[number])}
            className="w-full appearance-none rounded-full border border-white/20 bg-[#2E0F3D] px-4 py-2.5 pr-9 text-[13px] font-medium text-white outline-none focus:border-pink-300"
          >
            <option value="" disabled className="bg-[#2E0F3D] text-white">
              Select topic
            </option>
            {topics.map((item) => (
              <option key={item} value={item} className="bg-[#2E0F3D] text-white">
                {item}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 4.2 6 8l3.5-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] py-3 text-[12px] font-medium font-dm tracking-wide text-white transition hover:opacity-95 cursor-pointer hover:scale-97 duration-300"
      >
        <PlaneIcon />
        SUBMIT
      </button>
    </form>
  );
}

export default function FaqSection() {
  const count = faqs.length;
  const looped = [...faqs, ...faqs, ...faqs];
  const viewportRef = useRef<HTMLDivElement>(null);

  // Center offset is always 2 (represents 3rd card in the 5-card layout)
  const center = 2;

  // Divisor for step size calculation (3.6 gives wider cards on desktop)
  const [visible, setVisible] = useState(3.6);
  const [index, setIndex] = useState(count - center);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const [peek, setPeek] = useState(0);

  useEffect(() => {
    function measureVisible() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisible(3.6); // 1st Half, 2nd Full, 3rd MAIN, 4th Full, 5th Half (Wider cards)
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setVisible(2.4);
      } else {
        setVisible(1.25);
      }
    }
    measureVisible();
    window.addEventListener("resize", measureVisible);
    return () => window.removeEventListener("resize", measureVisible);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => {
      const containerWidth = el.clientWidth;
      const cardStep = containerWidth / visible;
      const cardWidth = cardStep - GAP;
      setStep(cardStep);
      // Math to keep Card #3 precisely centered with half-peeking edge cards on left & right
      setPeek((containerWidth - cardWidth) / 2 - center * cardStep);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Navigate 1 card per click
  function go(delta: number) {
    setAnimate(true);
    setIndex((value) => value + delta);
  }

  function onTrackEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (index >= count * 2 - center) {
      setAnimate(false);
      setIndex(index - count);
    } else if (index < count - center) {
      setAnimate(false);
      setIndex(index + count);
    }
  }

  useEffect(() => {
    if (animate) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setAnimate(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [animate, index]);

  const cardWidth = Math.max(step - GAP, 0);

  function activateCard(i: number) {
    setAnimate(true);
    setIndex(i - center);
  }

  function onCardKey(event: KeyboardEvent<HTMLDivElement>, i: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateCard(i);
    }
  }

  return (
    <section id="faq" className="relative overflow-hidden bg-[#fdfbf7] py-8 text-slate-950 sm:py-14">
      
      {/* Title */}
      <div className="relative z-10 mb-4 px-4 text-center sm:mb-6">
        <span className="mb-3 inline-block rounded-full border border-pink-200/70 bg-pink-100/80 px-3 py-1 text-xs font-medium font-dm text-[#c01763] sm:px-4 sm:py-1.5 sm:text-sm">
          Got Questions?
        </span>
        <h2 className="font-play text-2xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Carousel Track Area */}
      <div ref={viewportRef} className="relative z-10 overflow-hidden py-6 sm:py-8 md:py-12">
        <div
          className="flex items-start"
          style={{
            gap: GAP,
            transform: step ? `translate3d(${-index * step + peek}px, 0, 0)` : undefined,
            transition: animate ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
          onTransitionEnd={onTrackEnd}
        >
          {looped.map((item, i) => {
            const isActive = i === index + center;
            const isContact = item.kind === "contact";
            const isForm = isActive && isContact;
            const lowered = i % 2 === 0;
            return (
              <div
                key={`${item.q}-${i}`}
                role={isForm ? undefined : "button"}
                tabIndex={isForm ? undefined : 0}
                onClick={isForm ? undefined : () => activateCard(i)}
                onKeyDown={isForm ? undefined : (event) => onCardKey(event, i)}
                className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-4 pb-12 text-left transition-all duration-300 sm:p-5 sm:pb-14 ${
                  isForm ? "" : "cursor-pointer"
                } ${
                  isActive
                    ? "z-20 scale-100 border border-pink-500/30 bg-[#2E0F3D] text-white ring-1 ring-pink-500/20"
                    : "z-10 scale-95 border border-pink-200/80 bg-white/90 text-[#2E0F3D] opacity-85 backdrop-blur-md hover:bg-white"
                }`}
                style={{
                  width: cardWidth || undefined,
                  flexBasis: cardWidth || undefined,
                  minHeight: "300px",
                  transform: lowered ? "translateY(20px)" : "translateY(0)",
                }}
              >
                {isActive && isContact ? (
                  <ContactForm />
                ) : isActive ? (
                  <div key={item.q} className="pr-2">
                    <span className="inline-flex w-fit rounded-full border border-[#facc15] bg-[#facc15]/10 px-3.5 py-1 text-xs font-dm tracking-wider text-[#facc15]">
                      FAQ
                    </span>
                    <h3 className="mt-3.5 font-play text-[19px] leading-snug text-white sm:text-[20px]">
                      {item.q}
                    </h3>
                    <p className="mt-3 text-sm font-dm font-normal leading-[1.6] text-pink-100/90">
                      {item.a}
                    </p>
                  </div>
                ) : (
                  <h3 className="max-w-[95%] font-play text-[18px] leading-snug text-[#2E0F3D] sm:text-[20px]">
                    {item.q}
                  </h3>
                )}

                {/* Floating Question Badge inside Card */}
                <span
                  className={`absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full text-[16px] transition-all ${
                    isActive
                      ? "bg-[#facc15] text-slate-950"
                      : "bg-[#2E0F3D] text-white"
                  }`}
                >
                  ?
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 mt-2 flex justify-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Previous FAQ"
          onClick={() => go(-1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-pink-200 bg-white/90 text-[#2E0F3D] shadow-sm transition hover:bg-white active:scale-95 sm:h-14 sm:w-14"
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next FAQ"
          onClick={() => go(1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-pink-200 bg-white/90 text-[#2E0F3D] shadow-sm transition hover:bg-white active:scale-95 sm:h-14 sm:w-14"
        >
          <Arrow dir="right" />
        </button>
      </div>

    </section>
  );
}
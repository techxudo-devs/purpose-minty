"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { HiOutlineUser, HiOutlineSparkles } from "react-icons/hi";
import { FaBuilding } from "react-icons/fa";
import { links } from "./site";

function MarkerUnderline({ children }: { children: ReactNode }) {
  return (
    <span
      className="box-decoration-clone px-1 pb-1"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(192, 23, 99, 0.22) 0%, rgba(244, 114, 182, 0.32) 45%, rgba(192, 132, 252, 0.28) 100%)",
      }}
    >
      {children}
    </span>
  );
}

const demoOptions = [
  { id: "very-intuitive", label: "Very intuitive", emoji: "✨" },
  { id: "easy-to-follow", label: "Easy to follow", emoji: "👍" },
  { id: "somewhat-confusing", label: "Somewhat confusing", emoji: "🤔" },
  { id: "needs-improvement", label: "Needs improvement", emoji: "📝" },
];

const featureOptions = [
  { id: "purposemap", label: "PurposeMap™ (goal tracking)", emoji: "🗺️" },
  { id: "habit-builder", label: "Habit Builder", emoji: "🔁" },
  { id: "pause-plan", label: "Pause My Plan feature", emoji: "⏸️" },
  { id: "community-challenges", label: "Community Challenges", emoji: "🏆" },
  { id: "mood-tracking", label: "Mood & Reflection tracking", emoji: "💭" },
  { id: "fdic-savings", label: "FDIC-insured savings", emoji: "🛡️" },
];

const cultureOptions = [
  { id: "very-relatable", label: "Very relatable to my life", emoji: "💯" },
  { id: "somewhat-relatable", label: "Somewhat relatable", emoji: "👌" },
  { id: "neutral", label: "Neutral", emoji: "😐" },
  { id: "not-relatable", label: "Doesn't feel like me", emoji: "🤷" },
];

const motivationOptions = [
  { id: "gentle-nudges", label: "Gentle, encouraging nudges", emoji: "💬" },
  { id: "direct-reminders", label: "Direct, no-nonsense reminders", emoji: "📣" },
  { id: "celebration-focused", label: "Celebration of small wins", emoji: "🎉" },
  { id: "community-accountability", label: "Community accountability", emoji: "🤝" },
  { id: "visual-progress", label: "Visual progress tracking", emoji: "📈" },
];

const likelihoodOptions = [
  { id: "definitely", label: "Definitely would use it", emoji: "🙌" },
  { id: "likely", label: "Likely to try it", emoji: "👍" },
  { id: "maybe", label: "Maybe, need to see more", emoji: "🤔" },
  { id: "unlikely", label: "Probably not for me", emoji: "😕" },
];

const partnerTypes = [
  { id: "credit-union", label: "Credit Union", emoji: "🏦" },
  { id: "cdfi", label: "CDFI", emoji: "💚" },
  { id: "nonprofit", label: "Nonprofit Organization", emoji: "💜" },
  { id: "employer", label: "Employer/HR Benefits", emoji: "🏢" },
  { id: "faith-based", label: "Faith-Based Organization", emoji: "🙏" },
  { id: "government", label: "Government Agency", emoji: "🏛️" },
  { id: "other", label: "Other", emoji: "✏️" },
];

const communities = [
  { id: "low-income", label: "Low-income households", emoji: "🏠" },
  { id: "subsidized-housing", label: "Subsidized housing residents", emoji: "🏘️" },
  { id: "single-parents", label: "Single parents", emoji: "👨‍👧" },
  { id: "unbanked", label: "Unbanked/underbanked", emoji: "💳" },
  { id: "bipoc", label: "BIPOC communities", emoji: "🌍" },
  { id: "youth", label: "Youth & young adults", emoji: "🎓" },
  { id: "general", label: "General population", emoji: "👥" },
];

const partnerInterests = [
  { id: "savings-challenges", label: "Hosting savings challenges", emoji: "🏆" },
  { id: "financial-literacy", label: "Financial literacy integration", emoji: "📚" },
  { id: "employee-benefits", label: "Employee financial wellness", emoji: "💼" },
  { id: "community-programs", label: "Community program integration", emoji: "🌱" },
  { id: "lending-pipeline", label: "Building a healthier lending pipeline", emoji: "🔗" },
  { id: "grant-funded", label: "Grant-funded initiatives", emoji: "💰" },
];

const cardClass =
  "rounded-[22px] border border-slate-200/80 bg-white/90 p-4 backdrop-blur-sm sm:rounded-[28px] sm:p-6 md:p-8";

const field =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-dm text-[14px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#c01763] focus:ring-2 focus:ring-[#c01763]/20";

const choiceGroupClass =
  "flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3";

const choiceGridClass = "grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3";

function Choice({
  selected,
  onClick,
  emoji,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  emoji?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`motion-btn w-full cursor-pointer rounded-full border px-3 py-2.5 text-center font-dm text-[12px] md:w-auto md:px-4 md:text-left md:text-[13px] ${
        selected
          ? "border-[#c01763] bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:bg-[#fff5f8] hover:text-slate-900"
      }`}
    >
      {emoji ? <span className="mr-1.5">{emoji}</span> : null}
      {children}
    </button>
  );
}

function FieldLabel({
  emoji,
  children,
  as = "p",
}: {
  emoji: string;
  children: ReactNode;
  as?: "p" | "label";
}) {
  const className =
    "mb-3 flex items-start gap-2 font-dm text-[14px] text-slate-700";
  const content = (
    <>
      <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden>
        {emoji}
      </span>
      <span>{children}</span>
    </>
  );

  if (as === "label") {
    return <label className={className}>{content}</label>;
  }

  return <p className={className}>{content}</p>;
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export default function SurveySection() {
  const [tab, setTab] = useState<"user" | "partner">("user");
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [demo, setDemo] = useState("");
  const [featuresPicked, setFeaturesPicked] = useState<string[]>([]);
  const [missing, setMissing] = useState("");
  const [culture, setCulture] = useState("");
  const [motivation, setMotivation] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const [likelihood, setLikelihood] = useState("");

  const [org, setOrg] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [served, setServed] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [vision, setVision] = useState("");
  const [challenges, setChallenges] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    const label = (id: string, options: { id: string; label: string }[]) =>
      options.find((item) => item.id === id)?.label || id;
    const labels = (ids: string[], options: { id: string; label: string }[]) =>
      ids.map((id) => label(id, options)).join(", ") || "—";

    const body =
      tab === "user"
        ? [
            `Survey: User`,
            `Email: ${trimmed}`,
            `Demo experience: ${label(demo, demoOptions) || "—"}`,
            `Features resonated: ${labels(featuresPicked, featureOptions)}`,
            `Wish I saw: ${missing || "—"}`,
            `Cultural relevance: ${label(culture, cultureOptions) || "—"}`,
            `Motivation: ${labels(motivation, motivationOptions)}`,
            `Suggestions: ${suggestion || "—"}`,
            `Likelihood: ${label(likelihood, likelihoodOptions) || "—"}`,
          ].join("\n")
        : [
            `Survey: Partner`,
            `Email: ${trimmed}`,
            `Organization: ${org || "—"}`,
            `Type: ${label(partnerType, partnerTypes) || "—"}`,
            `Communities: ${labels(served, communities)}`,
            `Interests: ${labels(interests, partnerInterests)}`,
            `Vision: ${vision || "—"}`,
            `Challenges: ${challenges || "—"}`,
          ].join("\n");

    window.location.href = `${links.email}?subject=${encodeURIComponent(
      `[PurposeMint] ${tab === "user" ? "User" : "Partner"} survey`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="survey" className="relative overflow-hidden bg-[#fdfbf7] py-10 sm:py-14 md:py-16">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-[380px] w-[380px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.35) 0%, rgba(192, 23, 99, 0.18) 45%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(192, 132, 252, 0.32) 0%, rgba(192, 23, 99, 0.16) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[780px] px-3 sm:px-6">
        <div className="text-center">
          <span
            className="inline-flex rounded-full px-4 py-1.5 font-dm text-[12px] text-slate-700 sm:text-[13px]"
            style={{
              background:
                "linear-gradient(#fdfbf7, #fdfbf7) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            Your voice matters
          </span>

          <h2 className="mt-4 font-play text-2xl font-normal tracking-tight text-slate-950 sm:mt-5 sm:text-4xl md:text-5xl">
            Share Your Experience
          </h2>

          <p className="mx-auto mt-4 max-w-[540px] font-dm text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Help us build something that truly serves you. Your feedback shapes the future of PurposeMint.
          </p>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <div className="inline-flex w-fit flex-row items-center gap-0 rounded-full border border-slate-200/80 bg-white/90 p-1">
            <button
              type="button"
              onClick={() => setTab("user")}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-dm text-sm ${
                tab === "user"
                  ? "bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <HiOutlineUser className="h-4 w-4" />
              User Survey
            </button>
            <button
              type="button"
              onClick={() => setTab("partner")}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-dm text-sm ${
                tab === "partner"
                  ? "bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <FaBuilding className="h-4 w-4" />
              Partner Survey
            </button>
          </div>
        </div>

        {sent ? (
          <div className={`${cardClass} mt-10 text-center`}>
            <p className="font-play text-[22px] text-slate-950 sm:text-[24px]">
              {tab === "user" ? "Thank you for your feedback! 💜" : "Thank you for your interest in partnering! 🤝"}
            </p>
            <p className="mt-3 font-dm text-[14px] text-slate-600">
              {tab === "user"
                ? "Your insights will help shape PurposeMint."
                : "We'll be in touch soon to discuss partnership opportunities."}
            </p>
          </div>
        ) : (
          <form className="mt-10 space-y-6" onSubmit={onSubmit}>
            {tab === "user" ? (
              <>
                <div className={cardClass}>
                  <h3 className="mb-6 flex items-center gap-2 font-play text-[16px] text-slate-900 sm:text-[18px]">
                    <HiOutlineSparkles className="h-5 w-5 text-[#c01763]" />
                    Demo &amp; UX Experience
                  </h3>
                  <FieldLabel emoji="📱">
                    How would you describe your experience with the PurposeMint demo?
                  </FieldLabel>
                  <div className={`mb-8 ${choiceGroupClass}`}>
                    {demoOptions.map((item) => (
                      <Choice
                        key={item.id}
                        selected={demo === item.id}
                        onClick={() => setDemo(item.id)}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="⭐">
                    Which features resonated with you? (Select all that apply)
                  </FieldLabel>
                  <div className={`mb-8 ${choiceGridClass}`}>
                    {featureOptions.map((item) => (
                      <Choice
                        key={item.id}
                        selected={featuresPicked.includes(item.id)}
                        onClick={() => setFeaturesPicked((value) => toggle(value, item.id))}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="💡" as="label">
                    What&apos;s one feature you wish you saw in the demo?
                  </FieldLabel>
                  <input
                    value={missing}
                    onChange={(event) => setMissing(event.target.value)}
                    placeholder="Tell us what would make PurposeMint even better..."
                    maxLength={500}
                    className={field}
                  />
                </div>

                <div className={cardClass}>
                  <h3 className="mb-6 flex items-center gap-2 font-play text-[16px] text-slate-900 sm:text-[18px]">
                    <HiOutlineSparkles className="h-5 w-5 text-[#c01763]" />
                    Cultural Relevance &amp; Motivation
                  </h3>
                  <FieldLabel emoji="🪞">
                    How well did the language and examples in PurposeMint reflect your real-life experiences?
                  </FieldLabel>
                  <div className={`mb-8 ${choiceGroupClass}`}>
                    {cultureOptions.map((item) => (
                      <Choice
                        key={item.id}
                        selected={culture === item.id}
                        onClick={() => setCulture(item.id)}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="🎯">
                    What type of motivation keeps you on track financially? (Select all that apply)
                  </FieldLabel>
                  <div className={`mb-8 ${choiceGridClass}`}>
                    {motivationOptions.map((item) => (
                      <Choice
                        key={item.id}
                        selected={motivation.includes(item.id)}
                        onClick={() => setMotivation((value) => toggle(value, item.id))}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="✨" as="label">
                    Any suggestions to make PurposeMint feel more &ldquo;you&rdquo;?
                  </FieldLabel>
                  <textarea
                    value={suggestion}
                    onChange={(event) => setSuggestion(event.target.value)}
                    placeholder="Share your thoughts on language, tone, features, or anything else..."
                    maxLength={1000}
                    rows={3}
                    className={`${field} resize-none`}
                  />
                </div>

                <div className={cardClass}>
                  <h3 className="mb-6 flex items-center gap-2 font-play text-[16px] text-slate-900 sm:text-[18px]">
                    <HiOutlineSparkles className="h-5 w-5 text-[#c01763]" />
                    Overall Impression
                  </h3>
                  <FieldLabel emoji="🚀">
                    Based on what you&apos;ve seen, how likely are you to use PurposeMint when it launches?
                  </FieldLabel>
                  <div className={choiceGroupClass}>
                    {likelihoodOptions.map((item) => (
                      <Choice
                        key={item.id}
                        selected={likelihood === item.id}
                        onClick={() => setLikelihood(item.id)}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={cardClass}>
                  <h3 className="mb-6 flex items-center gap-2 font-play text-[16px] text-slate-900 sm:text-[18px]">
                    <FaBuilding className="h-5 w-5 text-[#c01763]" />
                    About Your Organization
                  </h3>
                  <FieldLabel emoji="🏢" as="label">
                    Organization Name
                  </FieldLabel>
                  <input
                    value={org}
                    onChange={(event) => setOrg(event.target.value)}
                    placeholder="Your organization's name"
                    maxLength={200}
                    className={`${field} mb-8`}
                  />
                  <FieldLabel emoji="🏷️">What type of organization are you?</FieldLabel>
                  <div className={`mb-8 ${choiceGridClass}`}>
                    {partnerTypes.map((item) => (
                      <Choice
                        key={item.id}
                        selected={partnerType === item.id}
                        onClick={() => setPartnerType(item.id)}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="👥">
                    Which communities do you primarily serve? (Select all that apply)
                  </FieldLabel>
                  <div className={choiceGridClass}>
                    {communities.map((item) => (
                      <Choice
                        key={item.id}
                        selected={served.includes(item.id)}
                        onClick={() => setServed((value) => toggle(value, item.id))}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                </div>

                <div className={cardClass}>
                  <h3 className="mb-6 flex items-center gap-2 font-play text-[16px] text-slate-900 sm:text-[18px]">
                    <HiOutlineSparkles className="h-5 w-5 text-[#c01763]" />
                    Partnership Vision
                  </h3>
                  <FieldLabel emoji="🤝">
                    What partnership opportunities interest you most? (Select all that apply)
                  </FieldLabel>
                  <div className={`mb-8 ${choiceGridClass}`}>
                    {partnerInterests.map((item) => (
                      <Choice
                        key={item.id}
                        selected={interests.includes(item.id)}
                        onClick={() => setInterests((value) => toggle(value, item.id))}
                        emoji={item.emoji}
                      >
                        {item.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldLabel emoji="🔭" as="label">
                    What would a successful partnership with PurposeMint look like for your organization?
                  </FieldLabel>
                  <textarea
                    value={vision}
                    onChange={(event) => setVision(event.target.value)}
                    placeholder="Describe your ideal partnership outcomes..."
                    maxLength={1000}
                    rows={3}
                    className={`${field} mb-8 resize-none`}
                  />
                  <FieldLabel emoji="🧗" as="label">
                    What challenges do you face in helping your community build financial stability?
                  </FieldLabel>
                  <textarea
                    value={challenges}
                    onChange={(event) => setChallenges(event.target.value)}
                    placeholder="Share the barriers your community faces..."
                    maxLength={1000}
                    rows={3}
                    className={`${field} resize-none`}
                  />
                </div>
              </>
            )}

            <div className="rounded-[22px] border border-pink-100/80 bg-gradient-to-b from-[#fff5f8] to-white p-4 text-center sm:rounded-[28px] sm:p-6 md:p-10">
              <h3 className="font-play text-lg text-slate-950 sm:text-[20px] md:text-[24px]">
                {tab === "user" ? "Ready to Share Your Voice?" : "Ready to Explore Partnership?"}
              </h3>
              <p className="mt-2 font-dm text-[14px] text-slate-600">
                {tab === "user"
                  ? "Enter your email to stay updated on PurposeMint's launch"
                  : "Enter your email and we'll reach out to discuss partnership opportunities"}
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <FieldLabel emoji="✉️" as="label">
                  Email address
                </FieldLabel>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  maxLength={255}
                  className={field}
                />
                {error ? <p className="mt-2 text-left font-dm text-[12px] text-[#c01763]">{error}</p> : null}
                <button
                  type="submit"
                  className="motion-btn mt-4 w-full cursor-pointer rounded-full bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-6 py-3.5 font-dm text-sm text-white hover:opacity-95"
                >
                  Submit Feedback
                </button>
              </div>
              <p className="mt-5 font-dm text-[13px] text-slate-600">
                {tab === "user"
                  ? "Your insights help us build something that truly serves you 💜"
                  : "Together, we can create pathways to financial stability 🤝"}
              </p>
              <p className="mt-3 font-dm text-[11px] text-slate-500">
                By submitting, you consent to our collection of your email, IP address, and browser information to
                prevent abuse and improve our services.{" "}
                <a
                  href={links.privacy}
                  className="cursor-pointer text-[#c01763] underline-offset-4 transition-colors hover:text-[#8d0543] hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

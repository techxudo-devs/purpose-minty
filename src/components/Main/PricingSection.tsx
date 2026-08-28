type Plan = {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  priceLabel?: string;
  cta: string;
  features: string[];
  featured?: boolean;
  headerClass: string;
  headerStyle?: React.CSSProperties;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Build the habit, track it yourself",
    monthlyPrice: 0,
    priceLabel: "Free",
    cta: "Get started free",
    features: [
      "Set your savings goal",
      "Log what you save manually (no linked account)",
      "Track habits that impact your money",
      "Visualize your progress with PurposeMap™",
      "Gentle nudges to stay consistent",
    ],
    headerClass: "relative overflow-hidden",
    headerStyle: {
      background: "linear-gradient(180deg, #3a3a3a 0%, #1c1c1c 55%, #0f0f0f 100%)",
    },
  },
  {
    id: "momentum",
    name: "Momentum",
    badge: "Core Plan",
    description: "Open your account and save automatically",
    monthlyPrice: 19,
    cta: "Start with Momentum",
    featured: true,
    features: [
      "Opens your PurposeMint savings account at our partner bank",
      "Smart automatic transfers based on your habits",
      "Unlimited savings goals (rent, emergencies, life moments)",
      "Weekly habit + emotion tracking",
      "Community challenge board — you're not doing this alone",
    ],
    headerClass: "relative overflow-hidden",
    headerStyle: {
      background:
        "linear-gradient(135deg, #52005c 0%, #2E0F3D 28%, #c01763 58%, #b00f57 78%, #8d0543 100%)",
    },
  },
  {
    id: "elevation",
    name: "Elevation",
    description: "Unlock Level 5 Pathways",
    monthlyPrice: 49,
    cta: "Upgrade to Elevation",
    features: [
      "Everything in Momentum, plus:",
      "Level 5: Pathways access + partner matching",
      "Savings rewards + milestone bonuses",
      "Partner discounts that grow over time",
      "Savings streak tracking + gamification",
    ],
    headerClass: "bg-[#0a0a0a]",
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <path
        d="M3.5 8.2 6.4 11.1 12.5 5"
        stroke="#c01763"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(price: number) {
  return `$${price}`;
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative w-full bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-14">
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-[13px] font-medium text-slate-700"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(90deg, #c084fc, #f472b6, #fb7185) border-box",
              border: "1.5px solid transparent",
            }}
          >
            For Families
          </span>

          <h2 className="mt-5 font-play text-3xl tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Who is this for ?
          </h2>
          <p className="mt-4 max-w-xl font-dm text-base leading-relaxed text-slate-600 sm:text-lg">
            Two ways in — one for families building a cushion, one for the institutions that want to back them.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:gap-5">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`group flex flex-col overflow-hidden rounded-[22px] border border-slate-100 bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:border-slate-200 ${
                plan.featured ? "hover:-translate-y-3" : ""
              }`}
            >
              {/* Colored header */}
              <div
                className={`px-6 pb-6 pt-7 transition-all duration-300 group-hover:brightness-110 sm:px-7 sm:pt-8 ${plan.headerClass}`}
                style={plan.headerStyle}
              >
                {plan.featured && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 14px)",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
                  </>
                )}

                <div className="relative z-10">
                  {plan.badge && (
                    <span className="mb-2 inline-flex rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 font-dm">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-play text-[22px] text-white sm:text-[24px]">
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 max-w-[260px] text-[13px] leading-relaxed sm:text-[14px] font-dm ${
                      plan.featured ? "text-pink-100/90" : "text-white/65"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-end gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="font-play text-[42px] leading-none text-white transition-transform duration-300 group-hover:scale-[1.03] sm:text-[46px]">
                      {plan.priceLabel ?? formatPrice(plan.monthlyPrice)}
                    </span>
                    {!plan.priceLabel && (
                      <span
                        className={`mb-1 text-[14px] font-medium font-dm ${
                          plan.featured ? "text-pink-200/80" : "text-white/55"
                        }`}
                      >
                        /month
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`mt-6 w-full cursor-pointer rounded-xl bg-white py-3 text-[14px] font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                      plan.featured
                        ? "hover:bg-pink-50 hover:text-[#8d0543]"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-1 flex-col gap-3.5 px-6 py-7 transition-colors duration-300 group-hover:bg-slate-50/60 sm:px-7 sm:py-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 transition-all duration-200 group-hover:translate-x-0.5"
                  >
                    <CheckIcon />
                    <span className="font-dm text-[14px] leading-snug text-slate-700 transition-colors duration-200 group-hover:text-slate-900">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

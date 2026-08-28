"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { links } from "@/components/Main/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const exploreLinks = [
  { label: "App Preview", href: "#preview" },
  { label: "Partners", href: "#partners" },
  { label: "Feature Hub", href: "#feature-hub" },
  { label: "Join Waitlist", href: links.waitlist, external: true },
  { label: "Book a Demo", href: links.demo, external: true },
];

const resourceLinks = [
  { label: "Partner With Us", href: links.partner, external: true },
  { label: "Privacy Policy", href: links.privacy, external: true },
  { label: "Terms & Conditions", href: links.terms, external: true },
  { label: "Contact", href: links.email },
];

function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "cursor-pointer font-dm text-sm text-slate-600 transition-colors hover:text-[#c01763]";

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const onNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.open(links.waitlist, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="relative border-t border-pink-100 bg-[#fdfbf7] text-[#2E0F3D]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(192, 23, 99, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(192, 23, 99, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:gap-5">
          {/* Brand & contact */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/purposeLogo.png"
                alt="PurposeMint Logo"
                width={140}
                height={36}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-xs font-dm text-sm text-slate-600">
              PurposeMint helps you save a little at a time, safely — and turns those
              savings into a way forward.
            </p>

            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={links.email}
                  className="inline-flex items-center gap-2.5 font-dm text-sm text-slate-700 transition-colors hover:text-[#c01763]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-100 bg-[#fff5f8] text-[#c01763]">
                    <HiOutlineMail className="h-4 w-4" />
                  </span>
                  admin@minttoprosper.org
                </a>
              </li>
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-dm text-sm text-slate-700 transition-colors hover:text-[#c01763]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-100 bg-[#fff5f8] text-[#c01763]">
                    <FaLinkedinIn className="h-4 w-4" />
                  </span>
                  PurposeMint on LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-play text-lg text-[#2E0F3D]">Quick Links</h3>
            <ul className="mt-2.5 space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="font-play text-lg text-[#2E0F3D]">Explore</h3>
            <ul className="mt-2.5 space-y-1.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-play text-lg text-[#2E0F3D]">Resources</h3>
            <ul className="mt-2.5 space-y-1.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="font-play text-lg text-[#2E0F3D]">
              Join Our Newsletter
            </h3>
            <form onSubmit={onNewsletterSubmit} className="mt-2.5 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-pink-200 bg-white px-3 py-2 font-dm text-sm text-slate-800 outline-none transition focus:border-[#c01763] focus:ring-2 focus:ring-pink-100"
              />
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#c01763] via-[#b00f57] to-[#8d0543] px-3 py-3 hover:scale-98 font-dm text-xs font-medium text-white transition hover:opacity-95 active:scale-[0.98]"
              >
                Join Now
              </button>
            </form>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PurposeMint on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-[#fff5f8] text-[#c01763] transition hover:bg-[#c01763] hover:text-white"
              >
                <FaLinkedinIn className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-pink-100/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 font-dm text-[11px] text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>Copyright © PurposeMint. All Rights Reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://minttoprosper.org/purposemint"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#c01763] underline-offset-2 transition-colors hover:text-[#8d0543] hover:underline"
            >
              Mint to Prosper
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

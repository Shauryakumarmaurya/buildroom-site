"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const founders = [
  {
    initials: "sk",
    name: "Shaurya Kumar",
    college: "IIT Delhi",
    avatarClass: "bg-[#EEEDFE] text-[#3C3489]",
    linkedin: "https://linkedin.com/company/buildroom-in",
  },
  {
    initials: "ng",
    name: "Nishlesh Goel",
    college: "IIT Bombay",
    avatarClass: "bg-[#E1F5EE] text-[#085041]",
    linkedin: "https://linkedin.com/company/buildroom-in",
  },
];

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.83v2.19h.05c.53-1 1.84-2.19 3.79-2.19 4.06 0 4.81 2.67 4.81 6.14V24h-4v-7.4c0-1.77-.03-4.04-2.46-4.04-2.46 0-2.84 1.92-2.84 3.91V24h-4V8z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="founders" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="why we built this" title="we lived this problem." />

        <p className="mt-5 max-w-2xl text-[15px] sm:text-base text-ink/60 leading-relaxed">
          buildroom didn&apos;t start as a program. it started as two founders who couldn&apos;t find each other.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 bg-white border-hairline-all rounded-2xl p-6 sm:p-8"
        >
          <blockquote className="text-lg sm:text-xl italic text-ink/80 leading-relaxed max-w-3xl">
            we were both building separately at our colleges — one with an idea but no technical co-founder, the other with skills but no vision to attach them to. we found each other by accident.{" "}
            <span className="not-italic font-medium text-brand">
              hundreds of others aren&apos;t that lucky.
            </span>{" "}
            that&apos;s buildroom.
          </blockquote>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {founders.map((f) => (
              <div
                key={f.name}
                className="bg-white border-hairline-all rounded-xl p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium uppercase tracking-tightish ${f.avatarClass}`}
                  >
                    {f.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-ink font-medium">{f.name}</div>
                    <div className="text-xs text-ink/55">{f.college}</div>
                  </div>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on linkedin`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/40 hover:text-brand hover:bg-brand/5 transition-colors"
                  >
                    <LinkedInIcon />
                  </a>
                </div>

                <span className="mt-3 inline-flex items-center rounded-full bg-[#EEEDFE] text-[#3C3489] text-[11px] px-2.5 py-[3px]">
                  co-founder, buildroom
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

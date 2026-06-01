"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const yes = [
  "you've built projects before",
  "you're ambitious",
  "you want to start a company",
  "you want startup-minded friends",
  "you care more about building than talking",
];

const no = [
  "you're only looking for certificates",
  "you're looking for another course",
  "you're not willing to commit time",
  "you want passive networking",
];

export function WhoShouldApply() {
  return (
    <section id="apply-criteria" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="who should apply?" title="this is for you if..." />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-7 sm:p-9"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#085041]">
              this is for you
            </p>
            <ul className="mt-6 space-y-4">
              {yes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] sm:text-base text-ink/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E1F5EE] text-[11px] text-[#085041]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="bg-white p-7 sm:p-9"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-ink/40">
              this isn&apos;t
            </p>
            <ul className="mt-6 space-y-4">
              {no.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] sm:text-base text-ink/50"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[11px] text-ink/40">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

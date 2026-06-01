"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "30", label: "founders", desc: "hand-picked builders per cohort" },
  { value: "8", label: "weeks", desc: "of focused building, start to launch" },
  { value: "50+", label: "colleges", desc: "across india, fully remote" },
];

export function CohortStats() {
  return (
    <section id="cohort" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="cohort 01" title="small by design." />

        <p className="mt-5 max-w-2xl text-[15px] sm:text-base text-ink/60 leading-relaxed">
          we're not building a community. we're curating a room. small enough that everyone knows each other, big enough to find the right fit.
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="rounded-2xl bg-paper border-hairline-all p-7 sm:p-8 flex flex-col items-start"
            >
              <div className="text-[56px] sm:text-[64px] leading-none font-bold tracking-tighter2 text-ink tabular-nums">
                {s.value}
              </div>
              <div className="mt-4 text-base font-medium text-ink">{s.label}</div>
              <div className="mt-1 text-sm text-ink/50 leading-snug">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "30", label: "founders" },
  { value: "8", label: "weeks" },
  { value: "50+", label: "colleges" },
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

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="bg-white p-6 sm:p-8 flex flex-col items-start"
            >
              <div className="text-4xl sm:text-5xl tracking-tighter2 text-ink font-medium tabular-nums">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-ink/55">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

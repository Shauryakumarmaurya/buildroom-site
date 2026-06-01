"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    title: "get selected",
    body: "we look for proof of work, ambition, and execution. not grades. not resumes.",
  },
  {
    title: "meet exceptional builders",
    body: "you'll meet engineers, designers, marketers, operators, and founders from top colleges across india.",
  },
  {
    title: "form teams",
    body: "find people whose skills complement yours. not networking — actual collaboration.",
  },
  {
    title: "build",
    body: "ship real products with support from your cohort. weekly accountability, weekly strategy reviews, continuous feedback.",
  },
  {
    title: "launch",
    body: "every team launches publicly before the cohort ends.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="how it works" title="from application to launch, in one room." />

        <div className="mt-12 sm:mt-16 max-w-3xl">
          <ol className="relative">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06,
                }}
                className="relative flex gap-5 sm:gap-8 py-6 sm:py-8"
                style={{
                  borderTop: i === 0 ? "0.5px solid var(--hairline)" : "none",
                  borderBottom: "0.5px solid var(--hairline)",
                }}
              >
                <div className="shrink-0 pt-0.5">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white border-hairline-all text-sm tabular-nums text-brand font-medium">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl tracking-tightish text-ink font-medium">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-ink/60 max-w-2xl">
                    {s.body}
                  </p>
                </div>
                <div className="hidden sm:flex items-center text-xs text-ink/35 tabular-nums">
                  step {i + 1}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

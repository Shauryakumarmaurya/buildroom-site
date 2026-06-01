"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const pains = [
  {
    title: "your campus is too small",
    body: "the right co-founder probably isn't sitting in your hostel. builders are scattered across colleges and you can't find them.",
  },
  {
    title: "no shared ambition",
    body: "your friends want placements. you want to build. you need people whose default mode is shipping, not preparing for interviews.",
  },
  {
    title: "random connections don't work",
    body: "cold linkedin dms and twitter replies give quantity, not quality. you need a room where everyone is already serious.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="the problem"
          title="finding a co-founder is harder than building."
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.06,
              }}
              whileHover={{ y: -2 }}
              className="group bg-white p-6 sm:p-8 transition-colors hover:bg-paper"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-hairline-all text-[11px] text-ink/55 font-medium tabular-nums">
                  0{i + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-ink/20 group-hover:bg-brand transition-colors" />
              </div>
              <h3 className="mt-8 text-xl tracking-tightish text-ink font-medium">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

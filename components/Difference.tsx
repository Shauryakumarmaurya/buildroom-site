"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const rows = [
  ["passive networking", "team formation"],
  ["startup discussions", "product building"],
  ["motivation", "accountability"],
  ["learning entrepreneurship", "practicing entrepreneurship"],
  ["consuming content", "shipping products"],
];

export function Difference() {
  return (
    <section id="difference" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="the buildroom difference"
          title="most communities talk about startups. buildroom builds them."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 overflow-hidden rounded-2xl border-hairline-all"
        >
          <div className="grid grid-cols-2">
            <div className="bg-paper px-6 sm:px-8 py-5 text-xs uppercase tracking-[0.18em] text-ink/45 border-b-hairline">
              typical community
            </div>
            <div className="bg-brand-600 px-6 sm:px-8 py-5 text-xs uppercase tracking-[0.18em] text-white/80 border-b-hairline">
              buildroom
            </div>
          </div>

          {rows.map(([left, right], i) => (
            <motion.div
              key={left}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid grid-cols-2"
              style={{
                borderTop: "0.5px solid var(--hairline)",
              }}
            >
              <div className="bg-white px-6 sm:px-8 py-5 flex items-center gap-3 text-[15px] sm:text-base text-ink/55">
                <span className="text-ink/30">✕</span>
                {left}
              </div>
              <div className="bg-brand-50 px-6 sm:px-8 py-5 flex items-center gap-3 text-[15px] sm:text-base text-ink font-medium">
                <span className="text-brand">✓</span>
                {right}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

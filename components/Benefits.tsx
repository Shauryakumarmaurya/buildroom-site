"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const benefits = [
  {
    title: "find cofounders",
    body: "meet people you'd never otherwise cross paths with.",
    span: "md:col-span-2",
  },
  {
    title: "build faster",
    body: "leverage the experience and insights of 29 other builders.",
    span: "",
  },
  {
    title: "weekly accountability",
    body: "deadlines create momentum. momentum creates startups.",
    span: "",
  },
  {
    title: "strategic feedback",
    body: "bring your hardest problems to the room. get perspectives from founders, operators, marketers, and builders.",
    span: "md:col-span-2",
  },
  {
    title: "lifetime network",
    body: "the cohort ends. the relationships don't.",
    span: "md:col-span-3",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="what you get"
          title="everything we wish we had in college."
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className={`group bg-white p-7 sm:p-9 transition-colors hover:bg-paper ${b.span}`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                <span className="text-xs uppercase tracking-[0.18em] text-ink/45 tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl sm:text-2xl tracking-tightish text-ink font-medium">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60 max-w-md">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

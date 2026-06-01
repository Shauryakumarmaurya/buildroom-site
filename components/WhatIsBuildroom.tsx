"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const categories = [
  {
    tag: "builders",
    intro: "students already working on startups who want",
    items: ["cofounders", "early team members", "feedback", "accountability"],
    accent: "bg-[#EEEDFE] text-[#3C3489]",
  },
  {
    tag: "operators",
    intro: "students with strong skills who want",
    items: [
      "to join ambitious startups",
      "build alongside founders",
      "become future cofounders",
    ],
    accent: "bg-[#E1F5EE] text-[#085041]",
  },
];

const backgrounds = ["engineering", "business", "design", "growth", "product"];

export function WhatIsBuildroom() {
  return (
    <section id="what" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="what is buildroom?"
          title="a curated startup-building cohort for ambitious students."
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-[15px] sm:text-base text-ink/60 leading-relaxed">
            every cohort brings together a small, hand-picked group of
            exceptional students from across disciplines — and, for cohort 01,
            from anywhere in india. it&apos;s fully remote.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {backgrounds.map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border-hairline-all bg-white px-3 py-1 text-[13px] text-ink/65"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border-hairline-all min-h-[260px] lg:min-h-full"
          >
            <img
              src="/images/builders-room.jpg"
              alt="two builders reviewing code together while others work nearby"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-white text-lg sm:text-xl tracking-tightish font-medium leading-snug">
              builders and operators, building in the same room.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
          {categories.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="bg-white p-7 sm:p-9"
            >
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tightish ${c.accent}`}
              >
                {c.tag}
              </span>
              <p className="mt-5 text-[15px] text-ink/60 leading-relaxed">
                {c.intro}:
              </p>
              <ul className="mt-4 space-y-3">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15px] sm:text-base text-ink/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-center text-xl sm:text-2xl tracking-tighter2 text-ink font-medium"
        >
          together, they form teams and build.
        </motion.p>
      </div>
    </section>
  );
}

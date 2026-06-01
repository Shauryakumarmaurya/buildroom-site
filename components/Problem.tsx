"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const teamSettings = [
  "school projects",
  "competitions",
  "internships",
  "research groups",
];

const struggles = [
  "nobody around them wants to build.",
  "they can't find complementary teammates.",
  "they consume startup content but rarely ship.",
  "they have ideas, but no environment that pushes execution.",
];

export function Problem() {
  return (
    <section id="problem" className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="the problem"
          title="you're not lacking talent. you're lacking the right environment."
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-lg sm:text-xl text-ink/70 leading-relaxed">
              for most of our lives, we&apos;ve learned in teams.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {teamSettings.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border-hairline-all bg-white px-3 py-1 text-[13px] text-ink/65"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[15px] sm:text-base text-ink/60 leading-relaxed max-w-md">
              but when it comes to building a startup, we&apos;re suddenly expected
              to do it alone. we know, because we&apos;ve lived it ourselves.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
              most ambitious students face the same problems
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--hairline)] border-hairline-all rounded-2xl overflow-hidden">
              {struggles.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.06,
                  }}
                  className="group bg-white p-6 transition-colors hover:bg-paper"
                >
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-hairline-all text-[11px] text-ink/55 font-medium tabular-nums">
                    0{i + 1}
                  </span>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                    {s}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 rounded-2xl bg-paper border-hairline-all p-8 sm:p-10 text-center"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
            the result
          </p>
          <p className="mt-4 text-2xl sm:text-3xl tracking-tighter2 text-ink font-medium">
            years of thinking.{" "}
            <span className="text-brand">very little building.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useApply } from "./ApplyProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i },
  }),
};

export function Hero() {
  const { openApply } = useApply();

  return (
    <section className="relative overflow-hidden">
      <BackgroundGrid />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-32 relative">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border-hairline-all px-3 py-1 text-xs text-ink/70 bg-white"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            cohort 01 — applications open
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-6 sm:mt-8 text-5xl sm:text-7xl lg:text-[88px] leading-[1.02] tracking-tighter2 text-ink font-medium"
          >
            <span className="block">find your co-founder.</span>
            <span className="block text-brand">build something real.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-xl text-ink/60 leading-relaxed"
          >
            buildroom is a curated cohort for serious founders from indian colleges — people who are done talking and ready to build.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3"
          >
            <button
              type="button"
              onClick={openApply}
              className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-3 hover:bg-ink/90 transition-colors group"
            >
              apply to cohort 01
              <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border-hairline-all bg-white text-sm text-ink px-5 py-3 hover:border-ink/30 transition-colors"
            >
              learn more
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-10 sm:mt-14 flex items-center gap-3 text-xs text-ink/50"
          >
            <span className="h-px w-8 bg-ink/15" />
            connecting builders across 50+ colleges in india
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(44,44,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,44,42,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
      }}
    />
  );
}

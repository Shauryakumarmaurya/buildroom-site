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
            className="mt-6 sm:mt-8 text-5xl sm:text-7xl lg:text-[84px] leading-[1.02] tracking-tighter2 text-ink font-medium"
          >
            <span className="block">where ambitious students</span>
            <span className="block text-brand">become founders.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-xl text-ink/60 leading-relaxed"
          >
            buildroom brings together exceptional student builders, operators, marketers, and designers to form startup teams, ship products, and build alongside people who are just as ambitious as they are.
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
              apply for cohort 01
              <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border-hairline-all bg-white text-sm text-ink px-5 py-3 hover:border-ink/30 transition-colors"
            >
              how it works
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink/55"
          >
            {["30 builders", "8 weeks", "applications open"].map((item, i) => (
              <span key={item} className="inline-flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-ink/25" />}
                <span className="tracking-tightish">{item}</span>
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-14 sm:mt-20 relative overflow-hidden rounded-3xl border-hairline-all"
        >
          <img
            src="/images/hero-build.jpg"
            alt="students building a startup together around a table of laptops"
            className="w-full h-[280px] sm:h-[440px] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 flex items-center gap-2.5 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5 text-xs text-ink/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            find cofounders. build products. launch startups.
          </div>
        </motion.div>
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

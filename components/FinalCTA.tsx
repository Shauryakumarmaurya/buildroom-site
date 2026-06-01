"use client";

import { motion } from "framer-motion";
import { useApply } from "./ApplyProvider";

export function FinalCTA() {
  const { openApply } = useApply();

  return (
    <section className="relative">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border-hairline-all px-3 py-1 text-xs text-ink/65 bg-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            cohort 01 — applications open
          </div>

          <h2 className="mt-6 max-w-3xl mx-auto text-4xl sm:text-6xl tracking-tighter2 leading-[1.05] text-ink font-medium">
            the people around you shape what you build.
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-ink/60 leading-relaxed">
            join a room full of ambitious students who refuse to wait until
            graduation to start.
          </p>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={openApply}
              className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-6 py-3.5 hover:bg-ink/90 transition-colors group"
            >
              apply for cohort 01
              <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-ink/55">
            {["a small cohort", "8 weeks", "fully remote"].map((item, i) => (
              <span key={item} className="inline-flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-ink/25" />}
                <span className="tracking-tightish">{item}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

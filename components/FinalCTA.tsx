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
            early deadline — 10 june
          </div>

          <h2 className="mt-6 text-4xl sm:text-6xl tracking-tighter2 leading-[1.05] text-ink font-medium">
            ready to build?
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-ink/60 leading-relaxed">
            applications take five minutes. the rest is up to you.
          </p>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={openApply}
              className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-6 py-3.5 hover:bg-ink/90 transition-colors group"
            >
              apply to buildroom
              <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApply } from "./ApplyProvider";

export function StickyMobileCTA() {
  const { openApply } = useApply();
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const show = pastHero && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed inset-x-0 bottom-0 z-[90] p-3"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2 rounded-full bg-brand pl-5 pr-2 py-2 shadow-[0_4px_24px_rgba(83,58,183,0.35)]">
            <button
              type="button"
              onClick={openApply}
              className="flex-1 text-left text-sm font-medium text-white"
            >
              apply to cohort 01 →
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="dismiss"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

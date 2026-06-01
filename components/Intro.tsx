"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Intro() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
          aria-hidden
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item} className="mb-6">
              <Gate />
            </motion.div>

            <motion.span
              variants={item}
              className="text-3xl sm:text-4xl tracking-tighter2 text-ink font-medium"
            >
              buildroom
            </motion.span>

            <motion.span
              variants={item}
              className="mt-3 text-sm text-ink/50"
            >
              find your co-founder. build something real.
            </motion.span>

            <motion.div
              variants={item}
              className="mt-7 h-px w-28 overflow-hidden bg-ink/10"
            >
              <motion.div
                className="h-full bg-brand"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Gate() {
  return (
    <div className="flex flex-col items-center">
      {/* perspective wrapper gives the door real 3D depth */}
      <div style={{ perspective: "420px" }}>
        <div className="relative h-14 w-12" style={{ transformStyle: "preserve-3d" }}>
          {/* the room behind the door */}
          <div className="absolute inset-0 rounded-[4px] bg-brand" />
          <motion.div
            className="absolute inset-y-0 left-1/2 w-px bg-white/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />

          {/* the door, hinged on its left edge */}
          <motion.div
            className="absolute inset-0 rounded-[4px] bg-paper border border-ink/20"
            style={{
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -60 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            {/* handle on the free edge */}
            <span className="absolute right-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-ink/30" />
          </motion.div>

          {/* doorway frame sits in front of the opening */}
          <div className="absolute -inset-[1.5px] rounded-[6px] border-[1.5px] border-ink/25 pointer-events-none" />
        </div>
      </div>

      {/* floor line */}
      <span className="mt-2 block h-px w-16 bg-ink/15" />
    </div>
  );
}

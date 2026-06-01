"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const rooms = [
  "ambitious people challenge each other,",
  "builders collaborate naturally,",
  "ideas become products,",
  "and shipping becomes the default.",
];

export function Insight() {
  return (
    <section id="insight" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          label="the insight"
          title="startups aren't built by individuals. they're built by environments."
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
              the best founders rarely succeed because they are the smartest
              person in the room.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-ink/60 leading-relaxed max-w-md">
              they succeed because they spend time in rooms where the right
              things happen by default. buildroom exists to create that room.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
              rooms where
            </p>
            <ul className="mt-5">
              {rooms.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.06,
                  }}
                  className="flex items-center gap-4 py-4"
                  style={{
                    borderTop: i === 0 ? "0.5px solid var(--hairline)" : "none",
                    borderBottom: "0.5px solid var(--hairline)",
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-lg sm:text-xl tracking-tightish text-ink/80">
                    {r}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

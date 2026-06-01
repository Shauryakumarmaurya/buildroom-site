"use client";

import { motion } from "framer-motion";

const lines = [
  "a room where ambitious people meet.",
  "a room where ideas become products.",
  "a room where future founders find each other.",
];

export function Vision() {
  return (
    <section id="vision" className="relative bg-ink text-white overflow-hidden">
      <img
        src="/images/shipping.jpg"
        alt="a room full of people building on laptops"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            the vision
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl sm:text-6xl tracking-tighter2 leading-[1.05] font-medium">
            we&apos;re building india&apos;s founder room.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/55 leading-relaxed">
            every great startup ecosystem starts with a room.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-14 mx-auto max-w-lg">
          {lines.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.08,
              }}
              className="flex items-center justify-center gap-3 py-4"
              style={{
                borderTop: i === 0 ? "0.5px solid rgba(255,255,255,0.12)" : "none",
                borderBottom: "0.5px solid rgba(255,255,255,0.12)",
              }}
            >
              <span className="text-base sm:text-lg text-white/75">{l}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mx-auto max-w-xl text-[15px] sm:text-base text-white/45 leading-relaxed"
        >
          buildroom is our attempt to create that room for the next generation of
          indian entrepreneurs.
        </motion.p>
      </div>
    </section>
  );
}

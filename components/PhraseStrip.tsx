"use client";

import { motion } from "framer-motion";

export function PhraseStrip({
  phrase,
  variant = "light",
}: {
  phrase: string;
  variant?: "light" | "brand";
}) {
  const isBrand = variant === "brand";
  return (
    <section
      className={`relative ${isBrand ? "bg-brand-600 text-white" : "bg-ink text-white"}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl tracking-tighter2 leading-[1.05] font-medium"
        >
          {phrase}
        </motion.p>
      </div>
    </section>
  );
}

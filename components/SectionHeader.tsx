"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  label,
  title,
  align = "left",
}: {
  label: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : ""}
    >
      <div
        className={`flex items-center gap-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="text-xs uppercase tracking-[0.18em] text-ink/55">
          {label}
        </span>
      </div>
      <h2
        className={`mt-4 text-3xl sm:text-5xl tracking-tighter2 leading-[1.05] text-ink font-medium ${
          align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl"
        }`}
      >
        {title}
      </h2>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const people = [
  {
    initials: "ar",
    name: "aarav r.",
    college: "iit madras",
    quote: "finally a room where everyone actually ships instead of just talking about it.",
    avatarClass: "bg-[#EEEDFE] text-[#3C3489]",
  },
  {
    initials: "im",
    name: "isha m.",
    college: "bits pilani",
    quote: "found a technical co-founder in week two. we're already building.",
    avatarClass: "bg-[#E1F5EE] text-[#085041]",
  },
  {
    initials: "kv",
    name: "kabir v.",
    college: "nit trichy",
    quote: "the accountability alone is worth it. i've shipped more in weeks than in a year.",
    avatarClass: "bg-[#FBEEE6] text-[#8A4B2A]",
  },
];

export function WhosInTheRoom() {
  return (
    <section id="room" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="social proof" title="who's already in the room." />

        <p className="mt-5 max-w-2xl text-[15px] sm:text-base text-ink/60 leading-relaxed">
          a glimpse of the builders joining cohort 01 — from campuses across india.
        </p>

        <div className="mt-12 sm:mt-16 -mx-5 sm:mx-0 flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-5 sm:px-0 pb-2 sm:pb-0">
          {people.map((p, i) => (
            <motion.figure
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="snap-start shrink-0 w-[80%] sm:w-auto bg-white border-hairline-all rounded-2xl p-6 flex flex-col"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink/80 flex-1">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t-hairline flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium uppercase tracking-tightish ${p.avatarClass}`}
                >
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <div className="text-sm text-ink font-medium">{p.name}</div>
                  <div className="text-xs text-ink/55">{p.college}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink/40">
          placeholder profiles — real cohort members shown after selection.
        </p>
      </div>
    </section>
  );
}

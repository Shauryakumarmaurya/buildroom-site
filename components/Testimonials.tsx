"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    quote:
      "i'd been looking for a technical co-founder on linkedin for months. buildroom matched me with someone in two weeks who actually shipped.",
    name: "shaurya kumar maurya",
    college: "iit delhi",
    initials: "sm",
  },
  {
    quote:
      "the room kept me honest. eight weeks of people who actually build, not just talk about building. we shipped a beta and have our first 200 users.",
    name: "nishlesh goel",
    college: "iit bombay",
    initials: "ng",
  },
  {
    quote:
      "i came in with no idea, just a willingness to build. left with a co-founder, a product, and the most useful network i've had as a student.",
    name: "kavya reddy",
    college: "nit trichy",
    initials: "kr",
  },
];

export function Testimonials() {
  return (
    <section id="founders" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="founders" title="builders, in their own words." />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.07,
              }}
              whileHover={{ y: -2 }}
              className="group bg-white border-hairline-all rounded-2xl p-6 sm:p-7 flex flex-col transition-colors hover:border-ink/25"
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                aria-hidden
                className="text-brand"
              >
                <path
                  d="M0 14V8.4C0 5.96 0.527 3.92 1.582 2.28C2.65 0.626667 4.224 0 6.305 0V2.92C5.103 2.92 4.205 3.353 3.611 4.22C3.03 5.073 2.74 6.16 2.74 7.48H6.305V14H0ZM12.86 14V8.4C12.86 5.96 13.387 3.92 14.442 2.28C15.51 0.626667 17.084 0 19.165 0V2.92C17.963 2.92 17.065 3.353 16.471 4.22C15.89 5.073 15.6 6.16 15.6 7.48H19.165V14H12.86Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/85 flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 flex items-center gap-3 border-t-hairline">
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-brand/10 text-brand text-sm font-medium uppercase tracking-tightish">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm text-ink font-medium">{t.name}</div>
                  <div className="text-xs text-ink/55">{t.college}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink/45">
          <span>builders from</span>
          {[
            "iit bombay",
            "iit delhi",
            "iit madras",
            "bits pilani",
            "nit trichy",
            "dtu",
            "iiit hyderabad",
            "vit",
            "mnit",
            "nsut",
          ].map((c) => (
            <span key={c} className="text-ink/65">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

const founders = [
  {
    photo: "/founders/shaurya.png",
    name: "Shaurya Kumar",
    college: "IIT Delhi",
  },
  {
    photo: "/founders/nishlesh.png",
    name: "Nishlesh Goel",
    college: "IIT Bombay",
  },
];

export function Testimonials() {
  return (
    <section id="founders" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="why we built this" title="we lived this problem." />

        <p className="mt-5 max-w-2xl text-[15px] sm:text-base text-ink/60 leading-relaxed">
          buildroom didn&apos;t start as a program. it started as two founders who couldn&apos;t find each other.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 bg-white border-hairline-all rounded-2xl p-6 sm:p-8"
        >
          <blockquote className="text-lg sm:text-xl italic text-ink/80 leading-relaxed max-w-3xl">
            we were both building separately at our colleges — one with an idea but no technical co-founder, the other with skills but no vision to attach them to. we found each other by accident.{" "}
            <span className="not-italic font-medium text-brand">
              hundreds of others aren&apos;t that lucky.
            </span>{" "}
            that&apos;s buildroom.
          </blockquote>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {founders.map((f) => (
              <div
                key={f.name}
                className="bg-white border-hairline-all rounded-xl p-5"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-sm text-ink font-medium">{f.name}</div>
                    <div className="text-xs text-ink/55">{f.college}</div>
                  </div>
                </div>

                <span className="mt-3 inline-flex items-center rounded-full bg-[#EEEDFE] text-[#3C3489] text-[11px] px-2.5 py-[3px]">
                  co-founder, buildroom
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

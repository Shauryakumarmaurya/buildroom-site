"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { SectionHeader } from "./SectionHeader";
import indiaGeo from "@/lib/indiaGeo.json";

// ---- map geometry ----------------------------------------------------------
const W = 600;
const H = 650;
const PAD = 26;

type City = {
  name: string;
  coords: [number, number]; // [lon, lat]
  label?: boolean;
  side?: "left" | "right";
};

const CITIES: City[] = [
  { name: "delhi", coords: [77.21, 28.61], label: true, side: "right" },
  { name: "jaipur", coords: [75.79, 26.91] },
  { name: "ahmedabad", coords: [72.57, 23.03], label: true, side: "left" },
  { name: "mumbai", coords: [72.88, 19.08], label: true, side: "left" },
  { name: "pune", coords: [73.86, 18.52] },
  { name: "hyderabad", coords: [78.49, 17.39], label: true, side: "right" },
  { name: "bengaluru", coords: [77.59, 12.97], label: true, side: "left" },
  { name: "chennai", coords: [80.27, 13.08], label: true, side: "right" },
  { name: "kolkata", coords: [88.36, 22.57], label: true, side: "right" },
];

function useIndiaMap() {
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geo = indiaGeo as any;
    const projection = geoMercator().fitExtent(
      [
        [PAD, PAD],
        [W - PAD, H - PAD],
      ],
      geo
    );
    const path = geoPath(projection);
    const indiaPath = path(geo) ?? "";

    const delhi = projection(CITIES[0].coords) ?? [W / 2, H / 2];
    const points = CITIES.map((city) => {
      const [x, y] = projection(city.coords) ?? [W / 2, H / 2];
      return { ...city, x, y };
    });

    return { indiaPath, points, delhi };
  }, []);
}

export function BuiltForIndia() {
  return (
    <section id="india" className="relative bg-paper">
      <div className="border-t-hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader label="built in india" title="made for india's founders." />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg sm:text-xl text-ink/70 leading-relaxed">
              buildroom brings together the most ambitious student builders from
              across the country — delhi to bengaluru, mumbai to kolkata.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-ink/60 leading-relaxed max-w-md">
              engineers, designers, marketers, operators, and founders from top
              colleges in every major indian city. one room for all of them.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-ink/70 leading-relaxed max-w-md">
              cohort 01 is{" "}
              <span className="text-ink font-medium">fully remote</span> — join
              from anywhere in india. no relocation, no need to be in person.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { v: "12+", l: "cities" },
                { v: "50+", l: "colleges" },
                { v: "1", l: "founder room" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl sm:text-4xl tracking-tighter2 text-ink font-medium tabular-nums">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/50">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-brand font-medium tracking-tightish">
              we&apos;re building india&apos;s founder room.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-ink p-4 sm:p-6"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <IndiaMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndiaMap() {
  const { indiaPath, points, delhi } = useIndiaMap();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="relative w-full h-auto"
      role="img"
      aria-label="map of india highlighting major startup cities"
    >
      <defs>
        <radialGradient id="india-ambient" cx="48%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#8F7BDB" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#533AB7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#533AB7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="india-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A86E8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#533AB7" stopOpacity="0.14" />
        </linearGradient>
        <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="map-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient glow behind the landmass */}
      <ellipse cx={W * 0.46} cy={H * 0.46} rx={W * 0.5} ry={H * 0.52} fill="url(#india-ambient)" />

      {/* soft halo copy of the map */}
      <path d={indiaPath} fill="#8F7BDB" opacity="0.22" filter="url(#map-glow)" />

      {/* the landmass — official boundary */}
      <path
        d={indiaPath}
        fill="url(#india-fill)"
        stroke="#B6A8EC"
        strokeOpacity="0.6"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* connections fanning out from delhi */}
      <g stroke="#8F7BDB" strokeOpacity="0.2" strokeWidth={1}>
        {points
          .filter((p) => p.name !== "delhi")
          .map((p) => (
            <line key={`l-${p.name}`} x1={delhi[0]} y1={delhi[1]} x2={p.x} y2={p.y} />
          ))}
      </g>

      {/* city nodes */}
      {points.map((p, i) => (
        <g key={p.name}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={6}
            fill="#8F7BDB"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.8, 1] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.22,
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          <circle cx={p.x} cy={p.y} r={5} fill="#C8BDED" filter="url(#dot-glow)" />
          <circle cx={p.x} cy={p.y} r={3} fill="#ffffff" />
          {p.label && (
            <text
              x={p.side === "left" ? p.x - 11 : p.x + 11}
              y={p.y}
              fill="#E4DEF6"
              fontSize="15"
              fontWeight={500}
              textAnchor={p.side === "left" ? "end" : "start"}
              dominantBaseline="middle"
              style={{ letterSpacing: "-0.02em" }}
            >
              {p.name}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { SectionHeader } from "./SectionHeader";
import indiaGeo from "@/lib/indiaGeo.json";

// ---- globe geometry --------------------------------------------------------
const SIZE = 640;
const C = SIZE / 2;
const R = 300; // globe radius
// orthographic projection centred on India, so the country faces the viewer.
const CENTER: [number, number] = [82, 22.2];

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

function useGlobe() {
  return useMemo(() => {
    const projection = geoOrthographic()
      .scale(R)
      .translate([C, C])
      .rotate([-CENTER[0], -CENTER[1], 0])
      .clipAngle(90);

    const path = geoPath(projection);
    const graticulePath = path(geoGraticule10()) ?? "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const indiaPath = path(indiaGeo as any) ?? "";

    const delhi = projection(CITIES[0].coords) ?? [C, C];

    const points = CITIES.map((city) => {
      const p = projection(city.coords);
      const [x, y] = p ?? [C, C];
      return { ...city, x, y };
    });

    return { graticulePath, indiaPath, points, delhi };
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
            className="relative flex items-center justify-center rounded-3xl bg-ink p-4 sm:p-8"
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Globe() {
  const { graticulePath, indiaPath, points, delhi } = useGlobe();

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="relative w-full h-auto max-w-[440px]"
      role="img"
      aria-label="globe centred on india highlighting major startup cities"
    >
      <defs>
        <radialGradient id="globe-ocean" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#2B2456" />
          <stop offset="55%" stopColor="#16122F" />
          <stop offset="100%" stopColor="#0A0817" />
        </radialGradient>
        <radialGradient id="globe-atmos" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="#8F7BDB" stopOpacity="0" />
          <stop offset="92%" stopColor="#8F7BDB" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#8F7BDB" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="india-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A593F0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#5B40C0" stopOpacity="0.9" />
        </linearGradient>
        <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="india-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="globe-clip">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>

      {/* atmospheric halo around the limb */}
      <circle cx={C} cy={C} r={R + 26} fill="url(#globe-atmos)" />

      {/* the sphere */}
      <circle cx={C} cy={C} r={R} fill="url(#globe-ocean)" />

      {/* everything painted on the surface is clipped to the disc */}
      <g clipPath="url(#globe-clip)">
        {/* lat / long grid */}
        <path
          d={graticulePath}
          fill="none"
          stroke="#9C8DE0"
          strokeOpacity="0.14"
          strokeWidth={0.8}
        />

        {/* faint glow seated under india */}
        <path d={indiaPath} fill="#8F7BDB" opacity="0.25" filter="url(#india-glow)" />

        {/* india landmass — official boundary */}
        <path
          d={indiaPath}
          fill="url(#india-fill)"
          stroke="#CDBFF6"
          strokeOpacity="0.7"
          strokeWidth={1.1}
        />

        {/* connections fanning out from delhi */}
        <g stroke="#C8BDED" strokeOpacity="0.22" strokeWidth={0.9}>
          {points
            .filter((p) => p.name !== "delhi")
            .map((p) => (
              <line key={`l-${p.name}`} x1={delhi[0]} y1={delhi[1]} x2={p.x} y2={p.y} />
            ))}
        </g>
      </g>

      {/* limb highlight */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#B6A8EC"
        strokeOpacity="0.35"
        strokeWidth={1.2}
      />

      {/* city nodes */}
      {points.map((p, i) => (
        <g key={p.name}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#A593F0"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 3, 1] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.22,
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          <circle cx={p.x} cy={p.y} r={3.4} fill="#D7CCF7" filter="url(#dot-glow)" />
          <circle cx={p.x} cy={p.y} r={2} fill="#ffffff" />
          {p.label && (
            <text
              x={p.side === "left" ? p.x - 9 : p.x + 9}
              y={p.y}
              fill="#E4DEF6"
              fontSize="13"
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

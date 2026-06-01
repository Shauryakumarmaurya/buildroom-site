"use client";

import { useEffect, useState } from "react";

// cohort 01 early application deadline
const CLOSE_DATE = new Date("2026-06-10T23:59:59+05:30");

function daysLeft(): number {
  const ms = CLOSE_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function CohortCountdown({ className = "" }: { className?: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysLeft());
    const id = setInterval(() => setDays(daysLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-hairline-all px-3 py-1 text-xs text-ink/70 bg-white ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      early deadline june 10
      {days !== null && (
        <>
          <span className="h-3 w-px bg-ink/15" />
          <span className="text-brand font-medium tabular-nums">
            {days} {days === 1 ? "day" : "days"} left
          </span>
        </>
      )}
    </span>
  );
}

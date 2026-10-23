"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useReducedMotion } from "./use-reduced-motion";

type LiveValueProps = {
  start: number;
  /** Largest change per tick, as a fraction of the value. */
  drift: number;
  every: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// Decorative ticker for the phone mockup: nudges a number every few seconds
// and flashes it lime so the screen feels live.
export function LiveValue({
  start,
  drift,
  every,
  decimals,
  prefix = "",
  suffix = "",
  className,
}: LiveValueProps) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(start);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      // Bias slightly upward so the balance trends like a good day.
      setValue((v) => v * (1 + (Math.random() - 0.4) * drift));
      setTick((n) => n + 1);
    }, every);
    return () => clearInterval(id);
  }, [reduced, drift, every]);

  return (
    <span key={tick} className={cn("tabular-nums", tick > 0 && "animate-flash", className)} dir="ltr">
      {prefix}
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";

const target = 168;
const duration = 1600;

// Counts the realtime-users figure up from zero once on load.
export function UsersCount() {
  const t = useTranslations("Hero");
  const reduced = useReducedMotion();
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <span className="text-xl font-semibold tabular-nums" dir="ltr">
      {t("users", { count })}
    </span>
  );
}

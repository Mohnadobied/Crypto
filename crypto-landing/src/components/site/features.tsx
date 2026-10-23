"use client";

import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";

const featureKeys = ["expertise", "practices", "insurance"] as const;

export function Features() {
  const t = useTranslations("Features");
  // The middle card is raised by default, as in the design.
  const [active, setActive] = useState(1);

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-10 md:px-8 md:py-20">
      <ul className="grid gap-3 md:grid-cols-3 md:gap-0 md:rounded-xl md:border md:border-line md:bg-glass">
        {featureKeys.map((key, i) => {
          const isActive = i === active;
          return (
            <li
              key={key}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "flex flex-col rounded-xl border p-6 transition-[background-color,color,margin] duration-300 md:min-h-56 md:border-0 md:p-8",
                isActive
                  ? "z-10 border-lime bg-lime text-ink md:-my-8 md:py-10"
                  : "border-line bg-glass text-chalk md:bg-transparent",
              )}
            >
              <span className="text-lg font-semibold" dir="ltr">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <h3 className="mt-5 max-w-[14rem] text-base leading-snug font-semibold">
                {t(`items.${key}.title`)}
              </h3>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 max-md:grid-rows-[1fr]",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "mt-4 max-w-xs text-sm leading-relaxed",
                      isActive ? "text-ink/70" : "text-smoke",
                    )}
                  >
                    {t(`items.${key}.body`)}
                  </p>
                  <a
                    href="#platform"
                    className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                  >
                    {t("learnMore")}
                    <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

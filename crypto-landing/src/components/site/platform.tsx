import { ArrowRightIcon, StarIcon, TrendingUpIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AskQuestionDialog } from "./ask-question-dialog";
import { Reveal } from "./reveal";
import { tones } from "./tones";

// Points on the price curve, in viewBox units (600 × 300).
const coins = [
  { symbol: "₿", x: 110, y: 226 },
  { symbol: "Ł", x: 236, y: 124 },
  { symbol: "P", x: 336, y: 176 },
];

function StatCard({
  value,
  caption,
  className,
  style,
}: {
  value: string;
  caption: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-lg border border-line bg-white/[0.04] p-4 backdrop-blur-sm sm:w-56",
        className,
      )}
      style={style}
    >
      <p className="border-s-2 border-lime ps-2.5 font-semibold text-lime">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-smoke">{caption}</p>
    </div>
  );
}

export async function Platform() {
  const t = await getTranslations("Platform");

  return (
    <section
      id="platform"
      className="mx-auto grid max-w-6xl scroll-mt-8 items-center gap-12 px-4 pt-10 pb-24 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20"
    >
      <Reveal>
      <figure className="relative flex flex-col gap-4 sm:block sm:h-[460px]">
        <figcaption className="sr-only">{t("chartLabel")}</figcaption>

        <div className="relative h-[220px] sm:absolute sm:inset-x-0 sm:top-[60px] sm:-ms-8 sm:h-[300px] lg:-ms-24">
          <svg
            viewBox="0 0 600 300"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full rtl:-scale-x-100"
            fill="none"
            aria-hidden
          >
            <path
              className="reveal-line"
              pathLength={1}
              d="M0 200 C40 200 70 228 110 226 C160 224 196 126 236 124 C276 122 296 178 336 176 C406 172 470 80 600 60"
              stroke="var(--lime)"
              strokeOpacity=".75"
              strokeWidth="1.5"
            />
          </svg>
          {coins.map((c, i) => (
            <span
              key={c.symbol}
              aria-hidden
              className="reveal-pop absolute grid size-9 -translate-y-1/2 place-items-center rounded-full bg-lime text-sm font-bold text-ink shadow-[0_0_0_6px_rgb(198_244_50/0.12)] ltr:-translate-x-1/2 rtl:translate-x-1/2"
              style={{
                insetInlineStart: `${(c.x / 600) * 100}%`,
                top: `${(c.y / 300) * 100}%`,
                ["--delay" as string]: `${0.5 + i * 0.35}s`,
              }}
            >
              {c.symbol}
            </span>
          ))}
        </div>

        <StatCard
          value={t("deposit")}
          caption={t("depositCaption")}
          className="reveal-rise sm:absolute sm:start-[6%] sm:top-0"
          style={{ ["--delay" as string]: "0.2s" }}
        />
        <StatCard
          value={t("btc")}
          caption={t("btcCaption")}
          className="reveal-rise sm:absolute sm:start-[44%] sm:top-[316px]"
          style={{ ["--delay" as string]: "1.2s" }}
        />

        <div
          className="reveal-rise w-full rounded-lg border border-line bg-ink-raised/80 p-4 backdrop-blur-sm sm:absolute sm:start-0 sm:top-[340px] sm:w-52"
          style={{ ["--delay" as string]: "0.9s" }}
        >
          <p className="text-xs text-smoke">{t("avgLabel")}</p>
          <p className="mt-1 font-semibold text-lime">{t("avgValue")}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-chalk/80" dir="ltr">
            <TrendingUpIcon className="size-3.5" />
            {t("avgChange")}
          </p>
          <div className="relative mt-3">
            <svg viewBox="0 0 180 50" className="w-full" fill="none" aria-hidden>
              <defs>
                <linearGradient id="avg-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--lime)" stopOpacity=".3" />
                  <stop offset="1" stopColor="var(--lime)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 44 C30 42 46 30 70 34 S110 40 130 22 160 18 180 26 V50 H0Z" fill="url(#avg-fill)" />
              <path d="M0 44 C30 42 46 30 70 34 S110 40 130 22 160 18 180 26" stroke="var(--lime)" strokeWidth="1.5" />
              <circle cx="130" cy="22" r="3" fill="var(--lime)" />
            </svg>
            <span className="absolute -top-3 end-6 rounded-full bg-lime px-2 py-0.5 text-[10px] font-medium text-ink">
              {t("avgDate")}
            </span>
          </div>
        </div>
      </figure>
      </Reveal>

      <div>
        <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.18] font-semibold tracking-[-0.01em]">
          {t.rich("title", tones)}
        </h2>
        <div className="mt-5 flex gap-2 text-chalk" role="img" aria-label={t("rating")}>
          {Array.from({ length: 4 }, (_, i) => (
            <StarIcon key={i} className="size-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">{t.rich("p1", tones)}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">{t.rich("p2", tones)}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a href="#services" className={cn(buttonVariants(), "h-11 gap-2 rounded-md px-6 font-medium")}>
            {t("cta")}
            <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
          </a>
          <AskQuestionDialog trigger={t("ask")} />
        </div>
      </div>
    </section>
  );
}

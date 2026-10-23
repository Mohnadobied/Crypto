import { ChevronLeftIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { LiveValue } from "./live-value";

function Phone({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-[2.6rem] bg-gradient-to-b from-[#45463f] via-[#24251f] to-[#141511] p-[7px] shadow-[0_50px_80px_-30px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.14)]",
        className,
      )}
      style={style}
    >
      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-[#121310]">
        <div className="absolute top-2.5 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

function EthMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 5 12.2 12 16l7-3.8L12 2Z" fill="currentColor" opacity=".85" />
      <path d="M12 17.4 5 13.6 12 22l7-8.4-7 3.8Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export async function HeroPhones({ ghost }: { ghost: string }) {
  const t = await getTranslations("Phone");

  return (
    <div
      aria-hidden
      className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[540px] lg:h-[580px]"
    >
      {/* Oversized word behind the phones. */}
      <span className="pointer-events-none absolute -end-24 top-8 text-[9rem] leading-none font-bold tracking-tight text-white/[0.045] select-none sm:text-[11rem]">
        {ghost}
      </span>

      {/* Soft floor light under the phones. */}
      <div className="absolute inset-x-[10%] bottom-6 h-24 rounded-[50%] bg-white/[0.06] blur-3xl" />

      {/* Orbit behind the phones. */}
      <svg
        viewBox="0 0 560 580"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        <ellipse
          cx="300"
          cy="200"
          rx="230"
          ry="74"
          transform="rotate(-8 300 200)"
          pathLength={1}
          strokeDasharray="1"
          className="animate-orbit stroke-lime"
          strokeWidth="1.5"
        />
        <circle cx="72" cy="120" r="5" className="fill-lime" />
        {/* A spark that keeps circling the orbit, passing behind the phones. */}
        <g transform="rotate(-8 300 200)" className="motion-reduce:hidden">
          <circle r="4" className="fill-lime" style={{ filter: "drop-shadow(0 0 6px var(--lime))" }}>
            <animateMotion
              dur="7s"
              begin="2.2s"
              repeatCount="indefinite"
              path="M70 200 a230 74 0 1 0 460 0 a230 74 0 1 0 -460 0"
            />
          </circle>
        </g>
      </svg>

      {/* Back phone: wallet balance. */}
      <Phone
        className="start-[6%] top-0 h-[380px] w-[190px] animate-phone-back sm:start-[14%] sm:h-[420px] sm:w-[210px]"
        style={{
          transform:
            "perspective(1400px) rotateX(10deg) rotateY(-16deg) rotateZ(-14deg)",
        }}
      >
        <div className="flex h-full flex-col px-4 pt-9 pb-4 text-[10px] text-chalk">
          <div className="flex items-center gap-1 text-smoke">
            <ChevronLeftIcon className="size-3.5 rtl:-scale-x-100" />
            <span className="mx-auto pe-4">{t("coin")}</span>
          </div>
          <div className="mx-auto mt-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink">
            <EthMark className="size-5" />
          </div>
          <p className="mt-2 text-center text-base font-semibold">
            <LiveValue start={9.872098} drift={0.0006} every={2400} decimals={6} suffix=" ETH" />
          </p>
          <div className="mt-2 flex justify-center gap-1.5">
            <span className="rounded bg-lime px-2 py-0.5 text-ink">{t("today")}</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-smoke">{t("week")}</span>
          </div>
          <svg viewBox="0 0 160 70" className="mt-3 w-full" fill="none">
            <defs>
              <linearGradient id="eth-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--lime)" stopOpacity=".35" />
                <stop offset="1" stopColor="var(--lime)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 58 C14 54 18 40 30 44 S48 60 60 46 76 22 90 30 104 50 116 34 136 8 160 14 V70 H0Z"
              fill="url(#eth-fill)"
            />
            <path
              d="M0 58 C14 54 18 40 30 44 S48 60 60 46 76 22 90 30 104 50 116 34 136 8 160 14"
              stroke="var(--lime)"
              strokeWidth="1.6"
            />
            <circle cx="116" cy="34" r="3" fill="var(--lime)" />
          </svg>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span className="rounded-md bg-lime py-2 text-center font-medium text-ink">
              {t("deposit")}
            </span>
            <span className="rounded-md bg-lime/90 py-2 text-center font-medium text-ink">
              {t("withdraw")}
            </span>
          </div>
          <p className="mt-3 border-b border-white/10 pb-2 text-smoke">{t("history")}</p>
          <div className="mt-auto flex items-end justify-between">
            <div>
              <p className="text-smoke">{t("earnings")}</p>
              <p className="text-sm font-semibold">
                <LiveValue start={1123456} drift={0.002} every={3100} decimals={0} prefix="$ " />
              </p>
            </div>
            <span className="rounded bg-lime/15 px-1.5 py-0.5 text-lime" dir="ltr">
              +24%
            </span>
          </div>
        </div>
      </Phone>

      {/* Front phone: sign-up screen. */}
      <Phone
        className="end-[2%] top-[150px] h-[350px] w-[178px] animate-phone-front sm:end-[6%] sm:top-[170px] sm:h-[390px] sm:w-[196px]"
        style={{
          transform:
            "perspective(1400px) rotateX(14deg) rotateY(-10deg) rotateZ(22deg)",
        }}
      >
        <div className="flex h-full flex-col px-4 pt-10 pb-5 text-chalk">
          <svg viewBox="0 0 160 60" className="w-full" fill="none">
            <polyline
              points="0,50 22,40 36,48 58,18 74,34 96,6 112,30 130,22 160,38"
              stroke="var(--lime)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-2 flex gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-lime/20 text-sm font-bold text-lime">
              ₿
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-lime/20 text-sm font-bold text-lime">
              Ł
            </span>
          </div>
          <p className="mt-4 text-[1.1rem] leading-[1.15] font-semibold">{t("join")}</p>
          <p className="mt-2 text-[9px] leading-relaxed text-smoke">{t("joinBody")}</p>
          <span className="mt-auto rounded-md bg-lime py-2 text-center text-[11px] font-medium text-ink">
            {t("signIn")}
          </span>
          <span className="mt-2 text-center text-[9px] text-smoke">{t("createAccount")}</span>
        </div>
      </Phone>

      {/* Orbit in front of the phones. */}
      <svg
        viewBox="0 0 560 580"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        <path
          d="M150 360 C 90 420 160 470 300 452 S 540 380 520 300"
          pathLength={1}
          strokeDasharray="1"
          className="animate-orbit stroke-lime"
          strokeWidth="1.5"
        />
        <circle cx="150" cy="360" r="5" className="fill-lime" />
      </svg>
    </div>
  );
}

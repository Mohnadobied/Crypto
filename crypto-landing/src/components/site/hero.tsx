import { ArrowUpRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { UsersCount } from "./count-up";
import { HeroPhones } from "./hero-phones";
import { tones } from "./tones";

// Placeholder faces until real customer photos go in /public/avatars.
const avatars = [
  { initials: "AK", bg: "#f5c842" },
  { initials: "MS", bg: "#5ba8f5" },
  { initials: "LN", bg: "#b07cf0" },
  { initials: "RO", bg: "#f27ba6" },
  { initials: "JT", bg: "#f59a42" },
  { initials: "HE", bg: "#4fd1c5" },
];

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-16 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-16"
    >
      <div className="relative z-10">
        <p className="animate-rise text-xs font-medium tracking-[0.14em] text-chalk/85 uppercase">
          {t("eyebrow")} <span className="text-lime">!</span>
        </p>

        <h1 className="mt-5 animate-rise [animation-delay:120ms] text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.12] lg:whitespace-nowrap font-semibold tracking-[-0.015em]">
          {t.rich("title", tones)}
        </h1>

        <div className="mt-8 flex animate-rise [animation-delay:260ms] items-center gap-5 border-t border-line pt-8 md:max-w-md">
          <ul className="flex" aria-hidden>
            {avatars.map((a) => (
              <li
                key={a.initials}
                className="-ms-2 grid size-10 place-items-center rounded-full text-xs font-semibold text-ink ring-2 ring-ink first:ms-0"
                style={{ backgroundColor: a.bg }}
              >
                {a.initials}
              </li>
            ))}
          </ul>
          <p className="flex flex-col">
            <UsersCount />
            <span className="text-xs text-smoke">{t("usersLabel")}</span>
          </p>
        </div>

        <div className="mt-10 flex animate-rise [animation-delay:380ms] items-start gap-6">
          <a
            href="#services"
            aria-label={t("howItWorks")}
            className="group relative flex shrink-0 items-center focus-visible:outline-none"
          >
            {/* The hollow ring trailing the solid disc, as in the design. */}
            <span className="size-12 rounded-full border border-lime" />
            <span className="-ms-6 grid size-12 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:translate-x-1 group-focus-visible:ring-2 group-focus-visible:ring-chalk group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink rtl:group-hover:-translate-x-1">
              <ArrowUpRightIcon className="size-5 rtl:-scale-x-100" />
            </span>
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-smoke">
            {t("body")}
          </p>
        </div>
      </div>

      <HeroPhones ghost={t("ghost")} />
    </section>
  );
}

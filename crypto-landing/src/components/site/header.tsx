import { getLocale, getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { rtlLocales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { MobileNav } from "./mobile-nav";

export const navItems = [
  { key: "home", href: "#top" },
  { key: "services", href: "#services" },
  { key: "about", href: "#about" },
  { key: "news", href: "#platform" },
] as const;

export async function Header() {
  const t = await getTranslations("Nav");
  const locale = await getLocale();
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-6 md:px-8">
      <a
        href="#top"
        className="text-lg font-semibold tracking-[0.06em] text-lime"
        dir="ltr"
      >
        CRYPTO.
      </a>

      <nav aria-label={t("primary")} className="hidden md:block">
        <ul className="flex items-center gap-10 text-sm text-chalk/80">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className="rounded-sm transition-colors hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          locale={otherLocale}
          aria-label={t("switchLanguageLabel")}
          className="rounded-sm px-1 text-sm text-smoke transition-colors hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
        >
          {t("switchLanguage")}
        </Link>
        <a
          href="#services"
          className={cn(
            buttonVariants(),
            "hidden h-10 rounded-md px-5 font-medium sm:inline-flex",
          )}
        >
          {t("cta")}
        </a>
        <MobileNav
          side={rtlLocales.has(locale) ? "left" : "right"}
          labels={{
            open: t("openMenu"),
            cta: t("cta"),
            items: navItems.map((item) => ({
              href: item.href,
              label: t(item.key),
            })),
          }}
        />
      </div>
    </header>
  );
}

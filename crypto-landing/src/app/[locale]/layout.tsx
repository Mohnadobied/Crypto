import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { env } from "@/env";
import { routing, rtlLocales } from "@/i18n/routing";

import "../globals.css";

// Readex Pro covers Latin and Arabic with the same wide geometric shapes
// as the headline face in the design.
const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={rtlLocales.has(locale) ? "rtl" : "ltr"}
      className={`${readex.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

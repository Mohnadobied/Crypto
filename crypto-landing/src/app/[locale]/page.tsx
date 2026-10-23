import { setRequestLocale } from "next-intl/server";

import { Features } from "@/components/site/features";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Partner } from "@/components/site/partner";
import { Platform } from "@/components/site/platform";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as "en" | "ar");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partner />
        <Features />
        <Platform />
      </main>
    </>
  );
}

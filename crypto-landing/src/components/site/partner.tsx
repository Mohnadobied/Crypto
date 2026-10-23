import { getTranslations } from "next-intl/server";

import { tones } from "./tones";

export async function Partner() {
  const t = await getTranslations("Partner");

  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl scroll-mt-8 gap-6 px-4 py-16 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16"
    >
      <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.18] font-semibold tracking-[-0.01em]">
        {t.rich("title", tones)}
      </h2>
      <p className="max-w-sm text-sm leading-relaxed text-smoke lg:pt-2">
        {t("body")}
      </p>
    </section>
  );
}

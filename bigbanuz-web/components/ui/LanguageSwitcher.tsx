"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  function switchLocale() {
    const next = locale === "en" ? "he" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-small font-medium rounded-full border border-gray-200 dark:border-white/20 hover:bg-ocean/10 transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-ocean"
      aria-label={t("switchLanguage")}
    >
      <span className={locale === "en" ? "font-bold" : "opacity-60"}>{t("en")}</span>
      <span className="opacity-40">|</span>
      <span className={locale === "he" ? "font-bold" : "opacity-60"}>{t("he")}</span>
    </button>
  );
}

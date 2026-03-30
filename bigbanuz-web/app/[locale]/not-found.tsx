import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/utils/constants";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const tNav = useTranslations("Nav");

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-golden text-white shadow-card mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h1 className="text-h1 font-heading font-bold text-black mb-3">
          {t("title")}
        </h1>
        <p className="text-body text-ink-muted mb-8">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            {t("backHome")}
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            {t("getInTouch")}
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-small text-ink-muted">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-golden transition-colors">
              {tNav(link.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

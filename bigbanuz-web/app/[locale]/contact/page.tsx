import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WHATSAPP_PHONE, INSTAGRAM_URL, EMAIL_ADDRESS } from "@/lib/utils/constants";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      languages: { en: "/en/contact", he: "/he/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}`;

  return (
    <>
      {/* Hero — WhatsApp-first */}
      <section className="bg-sand pt-32 pb-12">
        <div className="mx-auto max-w-content px-4 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-h1 font-bold text-ink mb-3">
              {t("heroTitle")}
            </h1>
            <p className="text-body text-ink-muted mb-10">
              {t("heroSubtitle")}
            </p>

            {/* Giant WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md bg-ocean px-10 py-5 text-h3 font-semibold text-white transition-colors hover:bg-ocean-dark"
            >
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.828-6.328-2.212l-.442-.362-3.26 1.093 1.093-3.26-.362-.442A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {t("whatsapp")}
            </a>
            <p className="mt-3 text-small text-ink-muted">
              {t("whatsappDesc")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Secondary contact cards */}
      <section className="bg-sand pb-section">
        <div className="mx-auto max-w-content px-4">
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Instagram card */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-lg bg-sand-dark p-8 text-center transition-colors hover:bg-ocean/5"
              >
                <svg className="mb-3 h-8 w-8 text-ocean" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <h2 className="font-heading text-h3 font-bold text-ink mb-1">
                  {t("instagram")}
                </h2>
                <p className="text-small text-ink-muted">
                  {t("instagramDesc")}
                </p>
              </a>

              {/* Email card */}
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group flex flex-col items-center rounded-lg bg-sand-dark p-8 text-center transition-colors hover:bg-ocean/5"
              >
                <svg className="mb-3 h-8 w-8 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="font-heading text-h3 font-bold text-ink mb-1">
                  {t("email")}
                </h2>
                <p className="text-small text-ink-muted">
                  {EMAIL_ADDRESS}
                </p>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-section">
        <div className="mx-auto max-w-text px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-h2 font-bold text-ink text-center mb-8">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

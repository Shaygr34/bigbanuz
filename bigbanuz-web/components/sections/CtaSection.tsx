import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { INSTAGRAM_URL } from "@/lib/utils/constants";

interface CtaSectionProps {
  headline?: string;
  whatsappLabel?: string;
  emailLabel?: string;
  emailHref?: string;
  instagramLabel?: string;
  instagramHref?: string;
}

export default function CtaSection({
  headline = "Ready to work together?",
  whatsappLabel = "WhatsApp Me",
  emailLabel,
  emailHref = "/contact",
  instagramLabel,
  instagramHref = INSTAGRAM_URL,
}: CtaSectionProps) {
  return (
    <section className="py-section bg-deep">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-white mb-8">
            {headline}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={buildWhatsAppUrlSimple()} variant="primary" size="lg">
              {whatsappLabel}
            </Button>
            {emailLabel && (
              <Button href={emailHref} variant="secondary" size="lg">
                {emailLabel}
              </Button>
            )}
            {instagramLabel && (
              <Button href={instagramHref} variant="outline" size="lg">
                {instagramLabel}
              </Button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

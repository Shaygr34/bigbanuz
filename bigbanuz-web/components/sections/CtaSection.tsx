import Button from "@/components/ui/Button";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";

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
  instagramHref = "https://instagram.com/bigbanuz",
}: CtaSectionProps) {
  return (
    <section className="py-section bg-sky-light">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-h2 font-heading font-bold text-ocean-deep mb-8">
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
      </div>
    </section>
  );
}

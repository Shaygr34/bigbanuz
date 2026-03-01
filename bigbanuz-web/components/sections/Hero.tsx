import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroProps {
  imageUrl: string;
  imageAlt: string;
  blurDataURL?: string;
  headline: string;
  subline?: string;
  ctas?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  }>;
  overlay?: boolean;
}

export default function Hero({
  imageUrl,
  imageAlt,
  blurDataURL,
  headline,
  subline,
  ctas,
  overlay = true,
}: HeroProps) {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
        />
      ) : (
        <div className="absolute inset-0 bg-ocean-deep" />
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="text-hero font-heading font-bold text-white max-w-3xl">
            {headline}
          </h1>
          {subline && (
            <p className="mt-4 text-h3 text-white/90 max-w-2xl font-normal">
              {subline}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant || "primary"}
                  size="lg"
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

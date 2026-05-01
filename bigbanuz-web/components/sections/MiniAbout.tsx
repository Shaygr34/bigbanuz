import Image from "next/image";
import Link from "next/link";

interface MiniAboutProps {
  imageUrl: string;
  text: string;
  moreLabel: string;
  moreHref: string;
}

export default function MiniAbout({ imageUrl, text, moreLabel, moreHref }: MiniAboutProps) {
  return (
    <section className="bg-sand-dark py-section">
      <div className="mx-auto max-w-content px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Photo */}
          {imageUrl && (
            <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={imageUrl}
                alt="Amit Banuz"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          )}

          {/* Text */}
          <div className={`flex-1 text-center ${imageUrl ? "md:text-start" : ""}`}>
            {text && (
              <p className="text-body text-ink-muted leading-relaxed max-w-text">{text}</p>
            )}

            <Link
              href={moreHref}
              className="mt-6 inline-block text-small font-medium text-ocean hover:text-ocean-dark transition-colors"
            >
              {moreLabel} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PressFeature {
  title: string;
  author: string;
  date: string;
  url: string;
  image: string;
  excerpt?: string;
}

const PRESS_FEATURES: PressFeature[] = [
  {
    title: "Fleeting Waves and Lasting Impressions: Amit Banuz on the Magic of Unscripted Encounters",
    author: "Nicola Morgan",
    date: "Jan 2025",
    url: "https://vampiresurfclub.com/blogs/news/fleeting-waves-and-lasting-impressions-amit-banuz-on-the-magic-of-unscripted-encounters",
    image: "https://cdn.shopify.com/s/files/1/0574/0760/2769/files/Yenien_VampireSurfClub_hoodedRashguard_Siargao_AmitBanuz_2048x2048.jpg?v=1735154819",
    excerpt:
      "Sometimes, the ocean introduces us to more than waves — it reveals the faces that linger long after the lens is put down.",
  },
];

interface PressSectionProps {
  title?: string;
  readArticleLabel?: string;
}

export default function PressSection({ title = "Features & Collaborations", readArticleLabel = "Read More" }: PressSectionProps) {
  if (PRESS_FEATURES.length === 0) return null;

  const isSingle = PRESS_FEATURES.length === 1;

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-black text-center mb-12">
            {title}
          </h2>
        </ScrollReveal>

        {isSingle ? (
          <ScrollReveal delay={100}>
            <SingleFeatureCard feature={PRESS_FEATURES[0]} readArticleLabel={readArticleLabel} />
          </ScrollReveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRESS_FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.url + i} delay={i * 100}>
                <GridFeatureCard feature={feature} readArticleLabel={readArticleLabel} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SingleFeatureCard({ feature, readArticleLabel = "Read Article" }: { feature: PressFeature; readArticleLabel?: string }) {
  return (
    <a
      href={feature.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row rounded-xl shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-normal bg-white-pure"
    >
      <div className="relative md:w-1/2 aspect-[16/9] md:aspect-auto">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
        <p className="text-caption text-gray-mid uppercase tracking-wider mb-2">
          {feature.date} · {feature.author}
        </p>
        <h3 className="text-h3 font-heading font-bold text-black group-hover:text-sun transition-colors duration-normal mb-3">
          {feature.title}
        </h3>
        {feature.excerpt && (
          <p className="text-body text-gray-mid mb-4 line-clamp-3">
            {feature.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-small font-semibold text-sun">
          {readArticleLabel}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-normal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

function GridFeatureCard({ feature, readArticleLabel = "Read More" }: { feature: PressFeature; readArticleLabel?: string }) {
  return (
    <a
      href={feature.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-normal bg-white-pure"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <p className="text-caption text-gray-mid uppercase tracking-wider mb-2">
          {feature.date} · {feature.author}
        </p>
        <h3 className="text-h3 font-heading font-bold text-black group-hover:text-sun transition-colors duration-normal mb-2">
          {feature.title}
        </h3>
        {feature.excerpt && (
          <p className="text-small text-gray-mid line-clamp-2">
            {feature.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-small font-semibold text-sun mt-3">
          {readArticleLabel}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-normal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

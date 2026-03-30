import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface StoryCardProps {
  title: string;
  slug: string;
  imageUrl?: string;
  blurDataURL?: string;
  shortDescription?: string;
  publishedAt?: string;
  location?: string;
  locale?: string;
}

export default function StoryCard({
  title,
  slug,
  imageUrl,
  blurDataURL,
  shortDescription,
  publishedAt,
  location,
  locale = "en",
}: StoryCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale === "he" ? "he-IL" : "en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/stories/${slug}`}
      className="group flex flex-col rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-normal bg-sand-light"
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {(location || formattedDate) && (
          <p className="text-caption text-ink-muted uppercase tracking-wider mb-2">
            {[location, formattedDate].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3 className="text-h3 font-heading font-bold text-black group-hover:text-golden transition-colors duration-normal mb-2">
          {title}
        </h3>
        {shortDescription && (
          <p className="text-small text-ink-muted line-clamp-3 flex-1">
            {shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}

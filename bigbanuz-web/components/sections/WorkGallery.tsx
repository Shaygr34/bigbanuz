"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

export interface WorkImage {
  url: string;
  alt: string;
  tags: string[];
  width: number;
  height: number;
}

interface WorkGalleryProps {
  images: WorkImage[];
  tagLabels: Record<string, string>;
}

const TAG_KEYS = [
  "all",
  "ocean",
  "golden-hour",
  "people",
  "energy",
  "travel",
  "events",
  "surf",
] as const;

export default function WorkGallery({ images, tagLabels }: WorkGalleryProps) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeTag === "all") return images;
    return images.filter((img) =>
      img.tags.some((t) => t.toLowerCase() === activeTag)
    );
  }, [activeTag, images]);

  // Convert to GalleryImage format for lightbox
  const lightboxImages: GalleryImage[] = filtered.map((img) => ({
    url: img.url,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));

  return (
    <section className="bg-sand pb-section">
      {/* Tag filter bar */}
      <div className="mx-auto max-w-content px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TAG_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTag(key)}
              className={`rounded-full px-4 py-1.5 text-small font-medium transition-colors ${
                activeTag === key
                  ? "bg-ocean text-white"
                  : "bg-sand-dark text-ink-muted hover:bg-ocean/10 hover:text-ocean"
              }`}
            >
              {tagLabels[key] || key}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry gallery */}
      <div className="mx-auto max-w-content px-4">
        {filtered.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-gallery" role="list">
            {filtered.map((img, i) => (
              <button
                key={`${img.url}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="relative mb-3 w-full overflow-hidden break-inside-avoid cursor-pointer group focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-inset rounded-md"
                role="listitem"
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-body text-ink-muted">No images found for this tag.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  location?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: "tight" | "normal";
}

export default function GalleryGrid({
  images,
  columns = 3,
  gap = "tight",
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  const gapSize = gap === "tight" ? "gap-[4px]" : "gap-4";

  return (
    <>
      <div className={`grid ${gridCols[columns]} ${gapSize}`} role="list">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-golden focus:ring-inset"
            role="listitem"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes={`(max-width: 768px) 50vw, ${Math.round(100 / columns)}vw`}
              loading="lazy"
              placeholder={img.blurDataURL ? "blur" : undefined}
              blurDataURL={img.blurDataURL}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

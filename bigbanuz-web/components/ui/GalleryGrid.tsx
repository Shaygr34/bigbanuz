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

  const colCount = {
    2: "columns-2",
    3: "columns-2 md:columns-3",
    4: "columns-2 md:columns-3 lg:columns-4",
  };

  const gapSize = gap === "tight" ? "gap-[4px]" : "gap-4";

  return (
    <>
      <div className={`${colCount[columns]} ${gapSize}`} role="list">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative w-full mb-1 overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-inset break-inside-avoid"
            role="listitem"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={img.width || 800}
              height={img.height || 600}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              sizes={`(max-width: 768px) 50vw, ${Math.round(100 / columns)}vw`}
              loading="lazy"
              placeholder={img.blurDataURL ? "blur" : undefined}
              blurDataURL={img.blurDataURL}
            />
            {/* Hover overlay with caption */}
            {(img.caption || img.location) && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                  {img.caption && (
                    <p className="text-small font-medium leading-tight">
                      {img.caption}
                    </p>
                  )}
                  {img.location && (
                    <p className="text-caption text-white/80 mt-0.5">
                      {img.location}
                    </p>
                  )}
                </div>
              </div>
            )}
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

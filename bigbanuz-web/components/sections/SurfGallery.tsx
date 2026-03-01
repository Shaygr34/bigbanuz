"use client";

import { useState } from "react";
import CategoryFilter from "@/components/ui/CategoryFilter";
import GalleryGrid from "@/components/ui/GalleryGrid";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Action", value: "action" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Destinations", value: "destinations" },
  { label: "Behind the Lens", value: "behind-the-lens" },
];

export interface SurfGalleryImage extends GalleryImage {
  category: string;
}

interface SurfGalleryProps {
  images: SurfGalleryImage[];
}

export default function SurfGallery({ images }: SurfGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-section">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-heading font-bold text-ocean-deep text-center mb-8">
          Portfolio
        </h2>

        <div className="mb-8">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <GalleryGrid
          images={filtered}
          columns={3}
          gap="tight"
        />
      </div>
    </section>
  );
}

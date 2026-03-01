"use client";

interface CategoryFilterProps {
  categories: Array<{ label: string; value: string }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2 justify-center"
      role="tablist"
      aria-label="Gallery categories"
    >
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          role="tab"
          aria-selected={activeCategory === cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-2 text-small font-medium rounded-full transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-golden ${
            activeCategory === cat.value
              ? "bg-ocean-deep text-white"
              : "bg-sky-light text-ocean-mid hover:bg-sand-warm"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

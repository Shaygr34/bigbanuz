import Image from "next/image";

interface Brand {
  _id: string;
  name: string;
  logoUrl: string;
  url?: string;
}

interface BrandsBarProps {
  brands: Brand[];
  title: string;
}

export default function BrandsBar({ brands, title }: BrandsBarProps) {
  if (brands.length === 0) return null;

  return (
    <section className="bg-sand-light py-section">
      <div className="mx-auto max-w-content px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <p className="text-h3 font-heading font-bold text-ink/70 whitespace-nowrap shrink-0">
            {title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {brands.map((brand) => {
              const img = (
                <Image
                  src={brand.logoUrl}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              );

              return brand.url ? (
                <a
                  key={brand._id}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={brand.name}
                >
                  {img}
                </a>
              ) : (
                <div key={brand._id} title={brand.name}>
                  {img}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

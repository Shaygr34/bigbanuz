import PackageCard from "@/components/ui/PackageCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Package {
  _id: string;
  title: string;
  priceDisplay: string;
  inclusions: string[];
  ctaText?: string;
  featured?: boolean;
}

interface PackagesSectionProps {
  packages: Package[];
}

export default function PackagesSection({ packages }: PackagesSectionProps) {
  if (!packages || packages.length === 0) return null;

  return (
    <section id="packages" className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-black text-center mb-4">
            Event Packages
          </h2>
          <p className="text-body text-gray-mid text-center max-w-text mx-auto mb-12">
            Choose the package that fits your event. Every package includes
            professional editing and fast delivery.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg._id} delay={i * 100}>
              <PackageCard
                title={pkg.title}
                priceDisplay={pkg.priceDisplay}
                inclusions={pkg.inclusions}
                ctaText={pkg.ctaText}
                featured={pkg.featured}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

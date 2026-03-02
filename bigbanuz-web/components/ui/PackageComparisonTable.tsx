"use client";

import Button from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";

interface Package {
  _id: string;
  title: string;
  priceDisplay: string;
  inclusions: string[];
  ctaText?: string;
  featured?: boolean;
}

interface PackageComparisonTableProps {
  packages: Package[];
}

export default function PackageComparisonTable({ packages }: PackageComparisonTableProps) {
  // Build union of all inclusion strings across packages
  const allFeatures: string[] = [];
  for (const pkg of packages) {
    for (const inclusion of pkg.inclusions) {
      if (!allFeatures.includes(inclusion)) {
        allFeatures.push(inclusion);
      }
    }
  }

  const handleClick = (title: string) => {
    analytics.packageClick(title.toLowerCase());
    analytics.whatsappClick("events");
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 text-small font-semibold text-gray-mid border-b border-gray-200">
              Features
            </th>
            {packages.map((pkg) => (
              <th
                key={pkg._id}
                className={`p-4 text-center border-b border-gray-200 ${
                  pkg.featured ? "bg-charcoal text-white rounded-t-lg" : ""
                }`}
              >
                <div className="text-h3 font-heading font-bold">{pkg.title}</div>
                <div className={`text-h2 font-mono font-bold mt-1 ${pkg.featured ? "text-white" : "text-black"}`}>
                  {pkg.priceDisplay}
                </div>
                {pkg.featured && (
                  <span className="inline-block mt-2 bg-accent text-accent-text text-caption font-bold px-3 py-0.5 rounded-full">
                    POPULAR
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, i) => (
            <tr key={feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="p-4 text-body text-gray-mid border-b border-gray-100">
                {feature}
              </td>
              {packages.map((pkg) => {
                const included = pkg.inclusions.includes(feature);
                return (
                  <td
                    key={pkg._id}
                    className={`p-4 text-center border-b border-gray-100 ${
                      pkg.featured ? "bg-charcoal/5" : ""
                    }`}
                  >
                    {included ? (
                      <svg
                        className="w-5 h-5 text-accent mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Included"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-gray-300" aria-label="Not included">
                        —
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-4" />
            {packages.map((pkg) => (
              <td key={pkg._id} className="p-4 text-center">
                <Button
                  href={buildWhatsAppUrl({ type: "event", packageName: pkg.title })}
                  variant={pkg.featured ? "primary" : "outline"}
                  size="md"
                  onClick={() => handleClick(pkg.title)}
                >
                  {pkg.ctaText || "Book This Package"}
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

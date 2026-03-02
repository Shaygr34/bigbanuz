import ScrollReveal from "@/components/ui/ScrollReveal";

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Edited highlights delivered within days, not weeks.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Premium Quality",
    description: "Professional-grade equipment and expert editing.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Personal Attention",
    description: "One-on-one communication from booking to delivery.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Instant Magnet Prints",
    description: "On-site magnet printing — guests take home memories instantly.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-section bg-gray-light">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-black text-center mb-12">
            Why Work With Me
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="text-center bg-white-pure rounded-lg border border-gray-200 p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-soft text-black mb-4">
                  {item.icon}
                </div>
                <h3 className="text-h3 font-heading font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-body text-gray-mid">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import TestimonialCard from "@/components/ui/TestimonialCard";

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  context?: string;
  avatarUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-heading font-bold text-ocean-deep text-center mb-12">
          What People Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t._id}
              quote={t.quote}
              name={t.name}
              context={t.context}
              avatarUrl={t.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

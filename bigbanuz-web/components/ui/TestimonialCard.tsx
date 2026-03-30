import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  context?: string;
  avatarUrl?: string;
}

export default function TestimonialCard({
  quote,
  name,
  context,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-sand-light rounded-lg p-6 lg:p-8 shadow-card border-s-4 border-ocean">
      {/* Decorative quote mark */}
      <span className="block text-5xl leading-none text-ocean/20 font-serif select-none" aria-hidden="true">
        &ldquo;
      </span>
      {/* Quote */}
      <blockquote className="text-body text-black italic leading-relaxed -mt-2">
        {quote}
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-black font-bold text-small">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-small font-semibold text-black">{name}</p>
          {context && (
            <p className="text-caption text-ink-muted">{context}</p>
          )}
        </div>
      </div>
    </div>
  );
}

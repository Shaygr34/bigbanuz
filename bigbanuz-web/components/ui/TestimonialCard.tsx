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
    <div className="bg-white-pure rounded-lg p-6 lg:p-8 shadow-card">
      {/* Quote */}
      <blockquote className="text-body text-text-primary italic leading-relaxed">
        &ldquo;{quote}&rdquo;
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
          <div className="w-10 h-10 rounded-full bg-sand-warm flex items-center justify-center text-ocean-deep font-bold text-small">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-small font-semibold text-ocean-deep">{name}</p>
          {context && (
            <p className="text-caption text-text-muted">{context}</p>
          )}
        </div>
      </div>
    </div>
  );
}

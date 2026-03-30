import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

interface HeroProps {
  heroImage?: {
    asset?: { _ref?: string };
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  heroVideo?: string;
  name: string;
  subtitle: string;
}

export default function Hero({ heroImage, heroVideo, name, subtitle }: HeroProps) {
  const imageUrl = heroImage?.asset?._ref
    ? urlFor(heroImage).width(2560).quality(90).auto("format").url()
    : "";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={imageUrl}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-deep" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center">
        <h1 className="font-heading text-hero font-bold text-white">{name}</h1>
        <p className="mt-3 text-h3 font-light text-white/80">{subtitle}</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-8 w-[1px] bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}

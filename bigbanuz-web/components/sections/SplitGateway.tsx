"use client";

import Image from "next/image";
import Link from "next/link";
import { analytics } from "@/lib/utils/analytics";

interface LaneProps {
  imageUrl: string;
  imageAlt: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  analyticsLabel: string;
}

function Lane({
  imageUrl,
  imageAlt,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  analyticsLabel,
}: LaneProps) {
  return (
    <Link
      href={ctaHref}
      className="relative group flex items-center justify-center overflow-hidden cursor-pointer w-full h-full"
      onClick={() => analytics.laneClick(analyticsLabel)}
    >
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-charcoal" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.45)] group-hover:bg-[rgba(10,10,10,0.35)] transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-md">
        <h2 className="text-h1 md:text-hero font-heading font-bold text-white tracking-tight">
          {headline}
        </h2>
        <p className="mt-3 text-body md:text-h3 text-white/80 font-normal">
          {subline}
        </p>
        <span className="mt-6 inline-flex items-center px-8 py-3 bg-sun-gradient text-white text-body font-semibold rounded-full shadow-sun-glow group-hover:bg-sun-gradient-hover group-hover:shadow-sun-glow-lg group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-normal">
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}

interface SplitGatewayProps {
  eventsImage: string;
  surfImage: string;
}

export default function SplitGateway({ eventsImage, surfImage }: SplitGatewayProps) {
  return (
    <section className="flex flex-col md:flex-row w-full h-screen min-h-[600px]">
      <div className="flex-1 relative">
        <Lane
          imageUrl={eventsImage}
          imageAlt="Event photography and magnet prints by Smile Amigo"
          headline="Events"
          subline="Photography & instant magnet prints"
          ctaLabel="See Packages"
          ctaHref="/events"
          analyticsLabel="events"
        />
      </div>
      <div className="flex-1 relative">
        <Lane
          imageUrl={surfImage}
          imageAlt="In-water surf photography by Smile Amigo"
          headline="Surf"
          subline="In-water action photography"
          ctaLabel="View Portfolio"
          ctaHref="/surf"
          analyticsLabel="surf"
        />
      </div>
    </section>
  );
}

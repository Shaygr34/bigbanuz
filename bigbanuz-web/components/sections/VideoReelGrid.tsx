"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoReel {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  thumbnailBlur?: string;
  tag?: string;
}

interface VideoReelGridProps {
  reels: VideoReel[];
  title: string;
  subtitle?: string;
}

function ReelCard({ reel }: { reel: VideoReel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-deep/10 cursor-pointer"
    >
      {/* Thumbnail — visible until video loads and plays */}
      <Image
        src={reel.thumbnailUrl}
        alt={reel.title}
        fill
        quality={85}
        className={`object-cover transition-opacity duration-500 ${
          isPlaying && hasLoaded ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        placeholder={reel.thumbnailBlur ? "blur" : "empty"}
        blurDataURL={reel.thumbnailBlur}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setHasLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlaying && hasLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Tag badge */}
      {reel.tag && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-deep/60 px-2.5 py-0.5 text-caption text-white/90 backdrop-blur-sm">
          {reel.tag}
        </span>
      )}

      {/* Play indicator — shows when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg
              className="h-5 w-5 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom gradient for title */}
      <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-12">
        <p className="text-small font-medium text-white">{reel.title}</p>
      </div>
    </div>
  );
}

export default function VideoReelGrid({ reels, title, subtitle }: VideoReelGridProps) {
  if (reels.length === 0) return null;

  return (
    <section className="bg-sand py-section">
      <div className="mx-auto max-w-content px-4">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-h2 font-bold text-ink">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-body text-ink/60">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {reels.map((reel, i) => (
            <div
              key={reel._id}
              className="reveal-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

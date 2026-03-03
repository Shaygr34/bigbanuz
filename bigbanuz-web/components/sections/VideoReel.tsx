"use client";

import { useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface VideoClip {
  src: string;
  label: string;
}

const CLIPS: VideoClip[] = [
  { src: "/videos/surf-reel.mp4", label: "Surf photography reel" },
  { src: "/videos/drone-reel.mp4", label: "Drone aerial reel" },
];

function VideoCard({ clip }: { clip: VideoClip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
  }

  function handleOverlayClick() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    }
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={clip.label}
        onPlaying={handlePlay}
      >
        <source src={clip.src} type="video/mp4" />
      </video>

      {/* Play button overlay — visible when video hasn't started */}
      <div
        onClick={handleOverlayClick}
        className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-500 ${
          playing ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-normal">
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-charcoal ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function VideoReel() {
  return (
    <section className="py-section bg-charcoal">
      <div className="max-w-wide mx-auto px-2 sm:px-4">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-white text-center mb-2">
            In Motion
          </h2>
          <p className="text-body text-gray-mid text-center max-w-text mx-auto mb-8">
            From the water to the sky — a glimpse of what I capture.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-2 gap-4">
            {CLIPS.map((clip) => (
              <VideoCard key={clip.src} clip={clip} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

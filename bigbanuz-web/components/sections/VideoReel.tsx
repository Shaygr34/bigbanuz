"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

interface VideoClip {
  src: string;
  label: string;
}

const CLIPS: VideoClip[] = [
  { src: "/videos/surf-reel.mp4", label: "Surf photography reel" },
  { src: "/videos/drone-reel.mp4", label: "Drone aerial reel" },
];

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
              <div
                key={clip.src}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={clip.label}
                >
                  <source src={clip.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

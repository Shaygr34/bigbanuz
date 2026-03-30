"use client";

import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from "react-social-media-embed";

interface SocialPost {
  url: string;
  platform: "instagram" | "tiktok" | "youtube";
}

interface SocialShowcaseProps {
  posts: SocialPost[];
  title: string;
}

export default function SocialShowcase({ posts, title }: SocialShowcaseProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-sand py-section">
      <div className="mx-auto max-w-content px-4">
        <h2 className="font-heading text-h2 font-bold text-ink mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {posts.map((post, i) => (
            <div key={i} className="w-full max-w-[400px]">
              {post.platform === "instagram" && (
                <InstagramEmbed url={post.url} width="100%" />
              )}
              {post.platform === "tiktok" && (
                <TikTokEmbed url={post.url} width="100%" />
              )}
              {post.platform === "youtube" && (
                <YouTubeEmbed url={post.url} width="100%" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

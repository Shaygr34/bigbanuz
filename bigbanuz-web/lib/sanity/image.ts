import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getBlurDataURL(source: SanityImageSource): Promise<string> {
  try {
    const url = builder
      .image(source)
      .width(24)
      .quality(20)
      .blur(50)
      .auto("format")
      .url();

    const res = await fetch(url);
    if (!res.ok) return "";

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch {
    return "";
  }
}

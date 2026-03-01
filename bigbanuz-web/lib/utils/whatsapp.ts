import { WHATSAPP_PHONE } from "./constants";

type WhatsAppContext =
  | { type: "event"; packageName?: string; date?: string }
  | { type: "surf" }
  | { type: "general" };

const messages: Record<string, (ctx: WhatsAppContext) => string> = {
  event: (ctx) => {
    const pkg =
      ctx.type === "event" && ctx.packageName ? ctx.packageName : "your";
    const date =
      ctx.type === "event" && ctx.date ? ` on ${ctx.date}` : "";
    return `Hi Amit! I'm interested in the ${pkg} package for my event${date}.`;
  },
  surf: () =>
    "Hi Amit! I'd like to discuss a surf photography collaboration.",
  general: () =>
    "Hi Amit! I found you on your website and wanted to get in touch.",
};

export function buildWhatsAppUrl(context: WhatsAppContext): string {
  const message = messages[context.type](context);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrlSimple(message?: string): string {
  const text =
    message || "Hi Amit! I found you on your website and wanted to get in touch.";
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

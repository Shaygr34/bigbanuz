export const SITE_NAME = "bigbanuz";
export const SITE_DESCRIPTION =
  "Professional surf and event photography by Amit Banuz.";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "972000000000";

export const INSTAGRAM_URL = "https://instagram.com/bigbanuz";

export const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Surf", href: "/surf" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

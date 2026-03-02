export const SITE_NAME = "Smile Amigo";
export const SITE_DESCRIPTION =
  "Professional surf and event photography by Amit Banuz.";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "972548194361";

export const INSTAGRAM_URL = "https://www.instagram.com/bigbanuz/";

export const EMAIL_ADDRESS = "iambigbanuz@gmail.com";

export const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Surf", href: "/surf" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

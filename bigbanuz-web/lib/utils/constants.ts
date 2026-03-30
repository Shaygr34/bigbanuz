export const SITE_NAME = "Amit Banuz";
export const SITE_DESCRIPTION =
  "Photographer · Creator · Surfer. Based in Israel, shooting worldwide.";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "972548194361";

export const INSTAGRAM_URL = "https://www.instagram.com/bigbanuz/";

export const EMAIL_ADDRESS = "iambigbanuz@gmail.com";

export const NAV_LINKS = [
  { labelKey: "work", href: "/work" },
  { labelKey: "about", href: "/about" },
  { labelKey: "stories", href: "/stories" },
  { labelKey: "contact", href: "/contact" },
] as const;

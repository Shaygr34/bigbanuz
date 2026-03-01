import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: "#0B2545",
          mid: "#13506B",
        },
        sky: {
          light: "#E8F1F5",
        },
        sand: {
          warm: "#F5E6D3",
        },
        golden: "#D4A574",
        "white-pure": "#FFFFFF",
        "text-primary": "#0B2545",
        "text-secondary": "#4A6FA5",
        "text-muted": "#8B9DC3",
      },
      fontFamily: {
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1" }],
        h1: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.1" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.1" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "clamp(4rem, 8vw, 8rem)",
      },
      maxWidth: {
        content: "1200px",
        text: "680px",
        wide: "1440px",
      },
      gap: {
        gallery: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(11, 37, 69, 0.08)",
        "card-hover": "0 4px 12px rgba(11, 37, 69, 0.12)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, rgba(11, 37, 69, 0.7) 0%, rgba(11, 37, 69, 0.3) 40%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

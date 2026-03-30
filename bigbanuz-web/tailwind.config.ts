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
          DEFAULT: "#0A8A8F",
          light: "#0FA4A9",
          dark: "#077074",
        },
        golden: {
          DEFAULT: "#D4943A",
          light: "#E0A854",
          dark: "#B87D2E",
        },
        sand: {
          DEFAULT: "#F5F0E8",
          light: "#FAF7F2",
          dark: "#E8E0D0",
        },
        deep: "#1A2E3E",
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#5A5A5A",
        },
        overlay: {
          dark: "rgba(26, 46, 62, 0.55)",
          light: "rgba(26, 46, 62, 0.30)",
        },
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "clamp(3rem, 6vw, 6rem)",
      },
      maxWidth: {
        content: "1280px",
        text: "680px",
        wide: "1440px",
      },
      gap: {
        gallery: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 46, 62, 0.08)",
        "card-hover": "0 4px 12px rgba(26, 46, 62, 0.15)",
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "8px",
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
          "linear-gradient(to top, rgba(26, 46, 62, 0.7) 0%, rgba(26, 46, 62, 0.3) 40%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

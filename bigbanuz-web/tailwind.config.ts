import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // --- Flipping colors (use CSS variables, swap in html.dark) ---
        black: "var(--color-black)",
        "white-pure": "var(--color-white-pure)",
        "gray-light": "var(--color-gray-light)",
        "gray-mid": "var(--color-gray-mid)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-text": "var(--color-accent-text)",

        // --- Fixed colors (always the same in both modes) ---
        charcoal: "#1A1A2E",
        "gray-warm": "#2C2C3A",
        white: "#FAFAFA",
        accent: {
          DEFAULT: "#FACC15",
          hover: "#EAB308",
        },
        sun: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        ocean: {
          DEFAULT: "#0F76B0",
          dark: "#0B5782",
          light: "#3B9FD4",
        },
        overlay: {
          dark: "rgba(10, 10, 10, 0.55)",
          light: "rgba(10, 10, 10, 0.30)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
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
        section: "clamp(4rem, 8vw, 8rem)",
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
        card: "0 1px 3px rgba(10, 10, 10, 0.08)",
        "card-hover": "0 4px 12px rgba(10, 10, 10, 0.15)",
        "sun-glow": "0 2px 12px rgba(245, 158, 11, 0.25)",
        "sun-glow-lg": "0 4px 20px rgba(245, 158, 11, 0.4)",
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
          "linear-gradient(to top, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.3) 40%, transparent 100%)",
        "sun-gradient":
          "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "sun-gradient-hover":
          "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)",
        "charcoal-gradient":
          "linear-gradient(135deg, #1A1A2E 0%, #2C2C3A 100%)",
        "charcoal-gradient-hover":
          "linear-gradient(135deg, #2C2C3A 0%, #3D3D50 100%)",
        "ocean-gradient":
          "linear-gradient(135deg, #0F76B0 0%, #0B5782 100%)",
        "ocean-gradient-hover":
          "linear-gradient(135deg, #3B9FD4 0%, #0F76B0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

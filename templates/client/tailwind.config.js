/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "var(--on-surface-variant)",
        "background": "var(--background)",
        "on-background": "var(--on-background)",
        "surface": "var(--surface)",
        "on-surface": "var(--on-surface)",
        "primary": "var(--primary)",
        "on-primary": "var(--on-primary)",
        "secondary": "var(--secondary)",
        "outline": "var(--outline)",
        "surface-container": "var(--surface-container)",
        "error": "#b91c1c",
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "2xl": "1rem", 
        "3xl": "1.5rem", 
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

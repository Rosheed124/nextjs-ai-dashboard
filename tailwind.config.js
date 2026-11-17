/** @type {import('tailwindcss').Config} */
// This file tells Tailwind CSS how to style our app
module.exports = {
  // Enable dark mode using a CSS class (instead of system preference)
  darkMode: "class",
  // Tell Tailwind which files to scan for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Custom theme extensions — adds our own colors and animations
  theme: {
    extend: {
      // Custom color palette for the dashboard
      colors: {
        // Dashboard-specific colors
        dashboard: {
          bg: "var(--dashboard-bg)",
          card: "var(--dashboard-card)",
          border: "var(--dashboard-border)",
          text: "var(--dashboard-text)",
          muted: "var(--dashboard-muted)",
          accent: "var(--dashboard-accent)",
          success: "var(--dashboard-success)",
          warning: "var(--dashboard-warning)",
          danger: "var(--dashboard-danger)",
        },
      },
      // Custom animation for the loading skeleton effect
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      // Define the shimmer keyframes animation
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  // No extra plugins needed
  plugins: [],
};

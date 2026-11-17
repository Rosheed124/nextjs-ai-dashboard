"use client";
// "use client" means this component runs in the browser (not on the server)
// We need this because it uses React state to track the current theme

import { createContext, useContext, useEffect, useState } from "react";

// Define what the theme context will provide to other components
type Theme = "light" | "dark";

// Create a context so any component can access the current theme
const ThemeContext = createContext<{
  // The current theme ("light" or "dark")
  theme: Theme;
  // Function to switch between light and dark
  toggleTheme: () => void;
}>({} as any);

// Custom hook — makes it easy for any component to use the theme
// Usage: const { theme, toggleTheme } = useTheme();
export function useTheme() {
  return useContext(ThemeContext);
}

// ThemeProvider wraps the entire app and manages the dark/light mode state
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with "light" mode — will check localStorage on first render
  const [theme, setTheme] = useState<Theme>("light");
  // Track whether we've loaded the saved theme yet
  const [mounted, setMounted] = useState(false);

  // On first render: check if the user previously chose a theme
  useEffect(() => {
    // Look in localStorage for a saved preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      // Use their saved preference
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // If no saved preference, check their system/OS preference
      setTheme("dark");
    }
    // Mark as mounted so we can render properly
    setMounted(true);
  }, []);

  // Whenever the theme changes, update the HTML class and save the preference
  useEffect(() => {
    // Get the root <html> element
    const root = document.documentElement;
    // Remove both classes first, then add the current one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    // Save to localStorage so it persists across page refreshes
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to flip between light and dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Don't render children until we've loaded the theme (prevents flash)
  if (!mounted) {
    return null;
  }

  // Provide the theme value and toggle function to all child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

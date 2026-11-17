// Vitest configuration for unit & component testing
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Use React plugin to parse TSX / JSX correctly in test environment
  plugins: [react()],
  test: {
    // Simulate browser DOM environment via jsdom
    environment: "jsdom",
    // Make describe, it, expect available globally without importing everywhere
    globals: true,
  },
  resolve: {
    alias: {
      // Resolve "@/..." imports to "./src/..."
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

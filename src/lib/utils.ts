// Utility function: combines multiple CSS class names intelligently
// Uses clsx to handle conditional classes and tailwind-merge to avoid conflicts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This helper merges Tailwind classes without duplicates or conflicts
// Example: cn("px-4 py-2", "px-6") → "px-6 py-2" (px-6 wins over px-4)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

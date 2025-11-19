import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names with clsx
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

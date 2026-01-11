import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes and handles conditional logic
 * essential for the industrial "heavy-border" design system.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

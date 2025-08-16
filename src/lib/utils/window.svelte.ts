import { innerWidth, innerHeight } from 'svelte/reactivity/window';

/**
 * Reactive window dimensions using Svelte 5's built-in reactivity
 * SSR-safe with proper guards
 */
export const windowDimensions = {
  width: innerWidth,
  height: innerHeight
};

/**
 * Common responsive breakpoints
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Reactive derived values for common responsive patterns
 * Use this inside components, not at module level
 */
export function createResponsiveHelpers() {
  // These need to be used inside components where $derived is valid
  return {
    get isMobile() {
      return typeof window !== 'undefined' && windowDimensions.width.current < breakpoints.md;
    },
    get isTablet() {
      return typeof window !== 'undefined' && 
             windowDimensions.width.current >= breakpoints.md && 
             windowDimensions.width.current < breakpoints.lg;
    },
    get isDesktop() {
      return typeof window !== 'undefined' && windowDimensions.width.current >= breakpoints.lg;
    }
  };
}

/**
 * Calculate available content height with dynamic header offset
 */
export function getContentHeight(headerOffset: number = 120): number {
  return typeof window !== 'undefined' 
    ? Math.max(300, windowDimensions.height.current - headerOffset)
    : 600; // SSR fallback
}
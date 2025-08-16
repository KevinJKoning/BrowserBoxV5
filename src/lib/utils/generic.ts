/**
 * Generic Helper Utilities
 * Pure utility functions for arrays, objects, and general operations
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS class merging utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TypeScript utility types for component props
export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, "child"> : T;
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/**
 * Array utility functions
 */
export const ArrayUtils = {
  /**
   * Remove duplicates from array
   */
  unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  },

  /**
   * Chunk array into smaller arrays of specified size
   */
  chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Group array elements by a key function
   */
  groupBy<T, K extends string | number | symbol>(
    array: T[], 
    keyFn: (item: T) => K
  ): Record<K, T[]> {
    return array.reduce((groups, item) => {
      const key = keyFn(item);
      (groups[key] = groups[key] || []).push(item);
      return groups;
    }, {} as Record<K, T[]>);
  }
};

/**
 * Object utility functions
 */
export const ObjectUtils = {
  /**
   * Pick specific keys from object
   */
  pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  /**
   * Omit specific keys from object
   */
  omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  /**
   * Check if object is empty
   */
  isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0;
  }
};

/**
 * String utility functions
 */
export const StringUtils = {
  /**
   * Capitalize first letter
   */
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Convert camelCase to kebab-case
   */
  kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  },

  /**
   * Truncate string with ellipsis
   */
  truncate(str: string, maxLength: number): string {
    return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + '...';
  }
};

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
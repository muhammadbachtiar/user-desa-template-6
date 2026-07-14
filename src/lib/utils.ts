import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes properly.
 *
 * @param inputs - Class names or conditional class expressions
 * @returns Merged class string
 *
 * @example
 * // Basic usage
 * cn("text-red-500", "bg-blue-500")
 *
 * @example
 * // With conditionals
 * cn("text-lg", isLarge && "font-bold", { "opacity-50": isDisabled })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a currency string.
 *
 * @param value - The number to format
 * @param currency - The currency code (default: 'IDR')
 * @param locale - The locale to use for formatting (default: 'id-ID')
 * @returns Formatted currency string
 *
 * @example
 * // Returns "Rp 1.000.000"
 * formatCurrency(1000000)
 */
export function formatCurrency(value: number, currency = "IDR", locale = "id-ID") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value)
}

/**
 * Formats a date string into a localized date format.
 *
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'id-ID')
 * @returns Formatted date string
 *
 * @example
 * // Returns "12 April 2023"
 * formatDate("2023-04-12")
 */
export function formatDate(dateString: string, locale = "id-ID") {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 *
 * @param text - The string to truncate
 * @param length - Maximum length before truncation (default: 100)
 * @returns Truncated string
 *
 * @example
 * // Returns "This is a long text..."
 * truncateText("This is a long text that needs to be truncated", 15)
 */
export function truncateText(text: string, length = 100) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

/**
 * Generates a slug from a string by converting to lowercase and replacing spaces with hyphens.
 *
 * @param text - The string to convert to a slug
 * @returns Slug string
 *
 * @example
 * // Returns "hello-world"
 * slugify("Hello World")
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

/**
 * Debounces a function to limit how often it can be called.
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns Debounced function
 */
export function debounce<T extends (...args: []) => []>(fn: T, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: [], ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

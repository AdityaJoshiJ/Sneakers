/**
 * Formats a category value from the API into a polished, display-ready title.
 * Capitalizes names and corrects specific typos (like 'jewelery' -> 'Jewelry').
 *
 * @param category Raw category string from the API
 * @returns Polished display-ready category string
 */
export function formatCategoryLabel(category: string): string {
  if (!category) return '';
  const trimmed = category.trim().toLowerCase();

  if (trimmed === 'jewelery') return 'Jewelry';
  if (trimmed === "men's clothing") return "Men's Clothing";
  if (trimmed === "women's clothing") return "Women's Clothing";

  // Capitalize first letter of each word (standard default fallback)
  return trimmed
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

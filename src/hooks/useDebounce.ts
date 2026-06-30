import { useEffect, useState } from 'react';

/**
 * A custom hook to debounce a fast-changing state value.
 *
 * @param value The raw input value
 * @param delay The delay time in milliseconds (e.g. 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

import { useState, useEffect } from "react";

/**
 * Menunda update nilai hingga user berhenti mengubahnya selama `delay` ms.
 * Berguna untuk menunda API call saat user mengetik di input pencarian.
 *
 * @param value - Nilai yang ingin di-debounce
 * @param delay - Delay dalam milidetik (default: 400ms)
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timer jika value berubah sebelum delay habis
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [useDebounce, setUseDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

import { useState, useCallback } from "react";

// Custom hook to read and save data in localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = useCallback(
    (newValue) => {
      setValue((previousValue) => {
        const nextValue =
          typeof newValue === "function" ? newValue(previousValue) : newValue;

        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // If localStorage fails, the app still keeps the data in React state
        }

        return nextValue;
      });
    },
    [key],
  );

  return [value, updateValue];
}

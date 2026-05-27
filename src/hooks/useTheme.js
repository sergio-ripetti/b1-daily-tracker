import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () => {
    // Temporarily disable CSS transitions during theme change
    document.documentElement.classList.add("theme-changing");

    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));

    // Re-enable transitions after the theme has changed
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 80);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === "dark",
  };
}

import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-changing");
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));

    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 80);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

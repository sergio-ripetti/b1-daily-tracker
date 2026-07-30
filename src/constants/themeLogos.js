import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

export const THEME_LOGOS = {
  light: logoLight,
  dark: logoDark,
};

export const getLogoByTheme = (isDarkMode) => {
  return isDarkMode ? THEME_LOGOS.dark : THEME_LOGOS.light;
};

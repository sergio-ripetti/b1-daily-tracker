import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../ui/ThemeToggle";
import { getLogoByTheme } from "../../constants/themeLogos";

export default function Layout() {
  const { toggleTheme, isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const currentLogo = getLogoByTheme(isDarkMode);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [location]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMenuOpen]);

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src={currentLogo}
            alt="B1 Ripe Deli logo"
            className="navbar-logo"
          />
        </div>

        <div className="navbar-right">
          <div className="nav-tabs">
            <NavLink
              to="/daily-grid"
              className={({ isActive }) =>
                isActive ? "nav-tab active" : "nav-tab"
              }>
              Daily Grid
            </NavLink>

            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive ? "nav-tab active" : "nav-tab"
              }>
              Items
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-tab active" : "nav-tab"
              }>
              Dashboard
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-tab active" : "nav-tab"
              }>
              Settings
            </NavLink>
          </div>

          <div className="navbar-theme">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>
        </div>

        <button
          className="hamburger-menu"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {isMenuOpen && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <NavLink
            to="/daily-grid"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }>
            Daily Grid
          </NavLink>

          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }>
            Items
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }>
            Dashboard
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }>
            Settings
          </NavLink>

          <div className="mobile-nav-divider"></div>

          <div className="mobile-nav-theme">
            <span className="mobile-nav-theme-label">Theme:</span>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>
        </nav>
      )}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

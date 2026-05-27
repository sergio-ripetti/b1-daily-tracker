import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../ui/ThemeToggle";

import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

export default function Layout() {
  const { toggleTheme, isDarkMode } = useTheme();

  const currentLogo = isDarkMode ? logoDark : logoLight;

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
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

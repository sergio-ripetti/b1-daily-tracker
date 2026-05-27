import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../ui/ThemeToggle";

export default function Layout() {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-brand">
          Stoque <span>daily tracker</span>
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

          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

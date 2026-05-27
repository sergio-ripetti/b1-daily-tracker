export default function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <span className={`theme-toggle-track ${isDarkMode ? "dark" : "light"}`}>
        <span className="theme-toggle-icon sun">☀️</span>
        <span className="theme-toggle-icon moon">🌙</span>

        <span className="theme-toggle-thumb" />
      </span>

      <span className="theme-toggle-label">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}

// Navbar.jsx
// Sticky top navigation bar displayed on every page.
// Renders the site logo (links to home), a light/dark theme toggle button.
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  // theme: current color scheme ('light' | 'dark')
  // toggleTheme: switches between light and dark mode
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-cream/90 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-ink-200 dark:border-zinc-700 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-terracotta rounded-sm flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 4L8 8L10 6L14 12H2Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-ink-950 dark:text-zinc-100 group-hover:text-terracotta transition-colors">
            The Inkwell
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="w-9 h-9 flex items-center justify-center rounded-sm border border-ink-200 dark:border-zinc-600
                       hover:bg-parchment dark:hover:bg-zinc-700 transition-all text-ink-600 dark:text-zinc-300 hover:text-ink-900 dark:hover:text-zinc-100"
          >
            {theme === "light" ? (
              /* Moon icon for switching to dark */
              <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              /* Sun icon for switching to light */
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* New Post button */}
          <button
            onClick={() => navigate("/new")}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Post
          </button>
        </div>
      </div>
    </header>
  );
}

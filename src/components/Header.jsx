import {
  Eye,
  Star,
  Archive,
  Trash,
  Trash2,
  Laptop,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

function Header({ view, setView, search, setSearch, dark, setDark, clearNotes }) {
  const views = [
    { name: "all", icon: <Eye size={16} /> },
    { name: "pinned", icon: <Star size={16} /> },
    { name: "archived", icon: <Archive size={16} /> },
    { name: "trash", icon: <Trash size={16} /> },
  ];

  const [themeMenu, setThemeMenu] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setDark(prefersDark);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Left: App Title + View Tabs */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          <h1 className="text-xl font-bold text-blue-600 dark:text-white">📝 NoteKeeper</h1>
          <div className="flex flex-wrap gap-2">
            {views.map((v) => (
              <button
                key={v.name}
                onClick={() => setView(v.name)}
                className={`flex items-center gap-1 px-3 py-1 rounded transition capitalize text-sm ${
                  view === v.name
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {v.icon}
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Search */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {/* Right: Clear + Theme */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              if (confirm("🧹 Are you sure you want to clear ALL notes? This cannot be undone.")) {
                clearNotes();
              }
            }}
            className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm"
          >
            <Trash2 size={16} />
            Clear
          </button>

          <div className="relative">
            <button
              onClick={() => setThemeMenu(!themeMenu)}
              className="flex items-center gap-1 px-3 py-1 rounded bg-yellow-400 dark:bg-gray-700 dark:text-white hover:bg-yellow-500 dark:hover:bg-gray-600 transition text-sm"
            >
              {theme === "dark" ? <Moon size={16} /> : theme === "light" ? <Sun size={16} /> : <Laptop size={16} />}
              Theme <ChevronDown size={14} />
            </button>

            {themeMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow z-50">
                {["system", "light", "dark"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTheme(option);
                      setThemeMenu(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      theme === option ? "font-semibold" : ""
                    }`}
                  >
                    {option === "system" && <Laptop size={14} />}
                    {option === "light" && <Sun size={14} />}
                    {option === "dark" && <Moon size={14} />}
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

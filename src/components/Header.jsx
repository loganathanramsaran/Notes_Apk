import { Trash2, Moon, Sun, Laptop, ChevronDown, Notebook } from "lucide-react";
import { useState, useEffect } from "react";

function Header({ dark, setDark, clearNotes, search, setSearch }) {
  const [themeMenu, setThemeMenu] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setDark(prefersDark);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-green-900 dark:bg-gray-900/80 shadow-md border-b-4 border-yellow-500 dark:border-b-2">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="flex text-3xl font-bold text-blue-600 dark:text-white">
          <Notebook className="text-yellow-500" size={35} />
          Note<span className="text-yellow-500">Keeper</span>
        </h1>

        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded border-2 border-yellow-600 bg-white/95 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear ALL notes? ")) {
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
              {theme === "dark" ? (
                <Moon size={16} />
              ) : theme === "light" ? (
                <Sun size={16} />
              ) : (
                <Laptop size={16} />
              )}
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

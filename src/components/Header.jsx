import { Moon, Sun, Trash2, Eye, Star, Archive, Trash } from "lucide-react";

function Header({ view, setView, dark, setDark, clearNotes }) {
  const views = [
    { name: "all", icon: <Eye size={16} /> },
    { name: "pinned", icon: <Star size={16} /> },
    { name: "archived", icon: <Archive size={16} /> },
    { name: "trash", icon: <Trash size={16} /> },
  ];

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <button
            key={v.name}
            onClick={() => setView(v.name)}
            className={`flex items-center gap-1 px-3 py-1 rounded transition capitalize ${
              view === v.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
          >
            {v.icon}
            {v.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            if (
              confirm(
                "🧹 Are you sure you want to clear ALL notes? This cannot be undone."
              )
            ) {
              clearNotes();
            }
          }}
          className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          <Trash2 size={16} />
          Clear All
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-1 px-3 py-1 rounded bg-yellow-400 dark:bg-gray-700 dark:text-white hover:bg-yellow-500 dark:hover:bg-gray-600 transition"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}

export default Header;

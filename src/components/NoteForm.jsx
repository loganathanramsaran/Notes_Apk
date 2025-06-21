import { useState, useEffect } from "react";
import { FileText, AlignLeft, Tag, Plus, Palette, Pencil } from "lucide-react";

const colorOptions = ["blue", "green", "red", "yellow", "purple", "gray"];

function NoteForm({ saveNote, editingNote, setEditingNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("blue");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setTags(editingNote.tags?.join(", ") || "");
      setColor(editingNote.color || "blue");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    saveNote({
      id: editingNote?.id,
      title,
      description,
      tags: tagArray,
      color,
    });
    setTitle("");
    setDescription("");
    setTags("");
    setColor("blue");
    setError("");
    setSuccess(true);
    setEditingNote(null);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 lg:min-h-[70vh] dark:bg-gray-800 p-5 rounded-lg space-y-6 border-2 border-gray-300 dark:border-yellow-400 "
    >
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      {success && (
        <div className="text-green-500 text-sm font-medium">✅ Note Saved!</div>
      )}

      <div className="relative">
        <FileText className="absolute left-2 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="pl-8 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="relative">
        <AlignLeft
          className="absolute left-2 top-2.5 text-gray-500"
          size={18}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="pl-8 w-full p-2 border rounded resize-none bg-gray-50 dark:bg-gray-700 dark:text-white"
          rows={3}
        ></textarea>
      </div>

      <div className="relative">
        <Tag className="absolute left-2 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="pl-8 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-700 dark:text-gray-200">
          <Palette size={18} />
          Choose a label color:
        </div>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-5 h-5 rounded-full border-2 ${
                color === c ? "ring-1 ring-black dark:ring-white" : ""
              }`}
              style={{ backgroundColor: getColor(c) }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="flex items-center text-sm gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {editingNote ? (
            <>
              <Pencil size={14} /> Update Note
            </>
          ) : (
            <>
              <Plus size={14} /> Add Note
            </>
          )}
        </button>
      </div>

    </form>
  );
}

function getColor(color) {
  const map = {
    blue: "#3B82F6",
    green: "#10B981",
    red: "#EF4444",
    yellow: "#F59E0B",
    purple: "#8B5CF6",
    gray: "#6B7280",
  };
  return map[color] || "#3B82F6";
}

export default NoteForm;

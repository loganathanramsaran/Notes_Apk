import { Pin,PinOff,Archive,ArchiveRestore,Trash2,Undo2,XCircle,Pencil} from "lucide-react";

const colorMap = {
  green: "border-green-600 text-green-600 bg-green-100 dark:bg-green-900",
  blue: "border-blue-500 text-blue-500 bg-blue-100 dark:bg-blue-900",
  red: "border-red-500 text-red-500 bg-red-100 dark:bg-red-900",
  yellow: "border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-900",
  purple: "border-purple-500 text-purple-500 bg-purple-100 dark:bg-purple-900",
  gray: "border-gray-500 text-gray-500 bg-gray-100 dark:bg-gray-900",
};

function NoteCard({ note, updateNote, setEditingNote }) {
  const toggle = (field) => updateNote(note.id, { [field]: !note[field] });
  const handleDeleteForever = () => updateNote(note.id, { deleted: true });
  const handleRestore = () => updateNote(note.id, { trashed: false });

  if (note.deleted) return null;

  const isPinned = note.pinned;
  const colorStyle = note.pinned
    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900"
    : colorMap[note.color] || "border-blue-500";

  return (
    <div
      className={`relative border-l-4 p-4 rounded-lg shadow bg-white dark:bg-gray-700 transition-all duration-300 ease-in-out ${colorStyle}`}
    >
      <div className="absolute top-2 right-2 flex gap-2">
        {!note.trashed ? (
          <>
            <button
              onClick={() => toggle("pinned")}
              title={note.pinned ? "Unpin Note" : "Pin Note"}
              className="hover:scale-110 transition-transform text-gray-600 dark:text-white/60"
            >
              {note.pinned ? <PinOff size={18} /> : <Pin size={18} />}
            </button>

            <button
              onClick={() => toggle("archived")}
              title={note.archived ? "Unarchive Note" : "Archive Note"}
              className="hover:scale-110 transition-transform text-gray-600 dark:text-white/60"
            >
              {note.archived ? (
                <ArchiveRestore size={18} />
              ) : (
                <Archive size={18} />
              )}
            </button>

            <button
              onClick={() => toggle("trashed")}
              title="Move to Trash"
              className="hover:scale-110 transition-transform text-gray-600 dark:text-white/60"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => setEditingNote(note)}
              title="Edit Note"
              className="hover:scale-110 transition-transform text-gray-600 dark:text-white/60"
            >
              <Pencil size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRestore}
              title="Restore Note"
              className="text-green-600 hover:scale-110 transition-transform"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={handleDeleteForever}
              title="Delete Forever"
              className="text-red-600 hover:scale-110 transition-transform"
            >
              <XCircle size={18} />
            </button>
          </>
        )}
      </div>

      {note.pinned && (
        <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300 animate-wiggle">
          📌 Pinned
        </span>
      )}

      <h2 className="text-xl font-semibold mb-1">{note.title}</h2>
      <p className="text-sm mb-2 overflow-clip">{note.description}</p>
      <div className="mt-2 text-xs flex flex-wrap gap-2">
        {note.tags?.map((tag, i) => (
          <span
            key={i}
            className={`px-2 py-0.5 rounded-lg ${
              colorMap[note.color]?.split(" ")[2] || "bg-blue-100"
            } dark:bg-green-950 dark:text-gray-300`}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default NoteCard;

import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("all");
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const updateNote = (id, updatedFields) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  };

  const saveNote = (note) => {
    if (note.id) {
      setNotes(notes.map((n) => (n.id === note.id ? { ...n, ...note } : n)));
    } else {
      setNotes([
        {
          ...note,
          id: Date.now(),
          pinned: false,
          archived: false,
          trashed: false,
        },
        ...notes,
      ]);
    }
    setEditingNote(null);
  };

  const clearNotes = () => {
    setNotes([]);
    localStorage.removeItem("notes");
  };

  const filteredNotes = notes
    .filter((note) => {
      if (note.deleted) return false;
      if (view === "archived" && !note.archived) return false;
      if (view === "trash" && !note.trashed) return false;
      if (view === "pinned" && !note.pinned) return false;
      if (view === "all" && (note.archived || note.trashed)) return false;
      return (
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => b.pinned - a.pinned); // Pinned notes first

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header>
        <Header
          view={view}
          setView={setView}
          dark={dark}
          setDark={setDark}
          clearNotes={clearNotes}
          search={search}
          setSearch={setSearch}
        />
      </header>
      <main className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-1">
            <NoteForm
              saveNote={saveNote}
              editingNote={editingNote}
              setEditingNote={setEditingNote}
            />
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {filteredNotes.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No notes found.
              </p>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  updateNote={updateNote}
                  setEditingNote={setEditingNote}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

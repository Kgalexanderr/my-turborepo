
"use client";

import { useEffect, useState, type FormEvent } from "react";

type Note = {
  id: string | number;
  content: string;
  created_at: string;
};

type NotesProps = {
  endpoint?: string;
};

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Something went wrong");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export default function Notes({
  endpoint = "/api/notes",
}: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load notes
  useEffect(() => {
    let active = true;

    async function loadNotes() {
      try {
        const data = await request<{ notes: Note[] }>(
          endpoint,
          { cache: "no-store" }
        );

        if (active) setNotes(data.notes);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load notes"
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadNotes();

    return () => {
      active = false;
    };
  }, [endpoint]);

  // Add note
  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = content.trim();
    if (!value || saving) return;

    setSaving(true);
    setError(null);

    try {
      const note = await request<Note>(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value }),
      });

      setNotes((current) => [note, ...current]);
      setContent("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add note"
      );
    } finally {
      setSaving(false);
    }
  }

  // Delete note
  async function handleDelete(id: Note["id"]) {
    const noteId = String(id);

    setDeletingId(noteId);
    setError(null);

    try {
      await request<void>(
        `${endpoint}/${encodeURIComponent(noteId)}`,
        { method: "DELETE" }
      );

      setNotes((current) =>
        current.filter((note) => note.id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete note"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="w-full max-w-xl space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Demo Notes</h2>
        <p className="text-sm text-gray-500">
          Create and manage your notes.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a note..."
          maxLength={500}
          aria-label="New note"
          className="min-w-0 flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!content.trim() || saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add note"}
        </button>
      </form>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
          No notes yet. Add your first one.
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm">{note.content}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleDelete(note.id)}
                disabled={deletingId !== null}
                className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                aria-label={`Delete note: ${note.content}`}
              >
                {deletingId === String(note.id)
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

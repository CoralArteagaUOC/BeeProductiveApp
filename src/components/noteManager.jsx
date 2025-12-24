import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function NoteManager({ selectedFolder, noteIds }) {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    if (!selectedFolder || !noteIds) return;

    const fetchNotes = async () => {
      const notesData = [];
      for (const noteId of noteIds) {
        const noteRef = doc(db, "notes", noteId);
        const noteSnapshot = await getDoc(noteRef);
        if (noteSnapshot.exists()) {
          notesData.push({ id: noteId, ...noteSnapshot.data() });
        }
      }
      setNotes(notesData);
    };

    fetchNotes();
  }, [selectedFolder, noteIds]);

 


  return (
    <div className="noteManager">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note ${selectedNoteId === note.id ? "selected" : ""}`}
          onClick={() => setSelectedNoteId(note.id)}
        >
          <h3>{note.title}</h3>
        </div>
      ))}
     
      
    </div>
  );
}

export default NoteManager;

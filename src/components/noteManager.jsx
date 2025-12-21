import React from 'react';

function NoteManager({ notes, onNoteSelect }) {
 

  return (
    <div>
      {notes && notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id} onClick={() => onNoteSelect(note)}>
              <div>
                <h3>{note.title}</h3>
                
              </div>
            </li>
          ))}
        </ul>
        
      ) : (
        console.log("there's an empty folDer")
      )}
    </div>
  );
}

export default NoteManager;

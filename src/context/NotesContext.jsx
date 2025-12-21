import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const NotesContext = createContext();

//Este desarrollo se ha realizado con el apoyo de la documentación de firebase y 
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notesArr = [];
      querySnapshot.forEach((doc) => {
        notesArr.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notesArr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>

  );
}

export function useNotes() {
  return useContext(NotesContext);
}

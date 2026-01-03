import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const NotesContext = createContext();

//Este desarrollo se ha realizado con el apoyo de la documentación de firebase y 
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk

export function NotesProvider({ children }) {
  /*Los hooks de React han sido utilizados en distintos componenetes del proyecto. 
     En el caso de useState(), nos proporciona información sobre el estado de la variable declarada
     fuente:https://react.dev/reference/react/useState
     Así los elementos reciben información, solo cuando se produzca un cambio
    */
  const [notes, setNotes] = useState([]);

    const [selectedFolder, setSelectedFolder] = useState(null);
    const [noteIds, setNoteIds] = useState([]);
    const handleFolderSelect = (deadline, ids) => {   
        setSelectedFolder(deadline);
        setNoteIds(ids);
    };

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

  //Se envían los datos a los componentes que lo requieran y que puedan recibirlos
  return (
    <NotesContext.Provider value={{ notes, setNotes, selectedFolder, noteIds, handleFolderSelect }}>
      {children}
    </NotesContext.Provider>

  );
}

export function useNotes() {
  return useContext(NotesContext);
}

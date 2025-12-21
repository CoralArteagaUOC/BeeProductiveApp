import React, { useContext, useState, useMemo } from 'react'
import { useNotes } from '../context/NotesContext';
//Importamos el contexto de las Notas


function FolderManager({ onFolderSelect, selectedFolder }) {
  const { notes } = useNotes();
  
  //"useMemo is a hook that memoizes the value until any of the dependecies changes"-Cosden Solutions (youtube)
  // Es decir es un hook que funciona como el useState, salvo que este conserva su valor pese al renderizado,
  // hasta que haya un cambio en su valor. Esto ofrece mayor optimización (fuente: https://stackoverflow.com/questions/56028913/usememo-vs-useeffect-usestate)
  //fuente: https://youtu.be/vpE9I_eqHdM?si=uA8DRSUkLGOsKqOC
  //fuente: https://react.dev/reference/react/useMemo
  //En estes proyecto, necesitamos recoger las notas en grupos y actualizar cuando se produzca un cambio
  const folders = useMemo(() => {
    const grouped = {};
    notes.forEach((note) => {
      let date;
      //Si existe la propiedad deadline, se extra la fecha
      if (note.deadline?.toDate) {
        date = note.deadline.toDate();
      }
      // La consola decía no reconocer el valor de la fecha por se run string (YYYY-MM-DD)
      // Se captura y convierte en una fecha (Date)
      else if (typeof note.deadline === 'string') {
        date = new Date(note.deadline);
      } else {
        date = new Date();
      }
      //En la base de datos de Firebase se recoge la fecha acompañada por el tiempo. Se quita el tiempo (T)
      //toDate to ISOString without time (split ("T")). Así solo obtenemos la fecha para nombrar las carpetas
      // fuente:
      // https://bobbyhadz.com/blog/javascript-get-iso-date-without-time
      // Extract YYYY-MM-DD
      const deadline = date.toISOString().split('T')[0];
      if (!grouped[deadline]) {
        grouped[deadline] = [];
      }
      grouped[deadline].push(note);
    });

    //Las carpetas vacías se eliminan solas
    Object.keys(grouped).forEach(deadline => {
      if (grouped[deadline].length === 0) {
        delete grouped[deadline];
      }
    });

    return grouped;
  }, [notes]);
   
  //Ordenar componenentes de un array en React con .map 
  //fuente: https://youtu.be/zZzcnmU_LoU?si=XJ8IvdeTOmzWPrif
  const sortedDeadlines = Object.keys(folders).sort((a, b) => new Date(a) - new Date(b));
  const formatDeadlineForDisplay = (deadline) => {
  //fuente: https://medium.com/@francesco.saviano87/mastering-javascript-date-and-time-49e303d50ae3 3.Handlinf DIfferent Date Formats
  //fuetne: https://medium.com/@AlexanderObregon/handling-dates-and-times-in-javascript-8b62091f2e74 -More Complex Formatting:
    const [year, month, day] = deadline.split('-');
    return `${day}/${month}/${year}`;
  };

 

  return (
    <div className="">
       {sortedDeadlines.map((deadline) => (
        <div
          className={`folder p-2 border-2 ${selectedFolder === deadline ? 'bg-white blackText' : 'bg-black'}`} key={deadline} 
          onClick={() => onFolderSelect(deadline, folders[deadline])}>
          <h3 className="font-bold">{formatDeadlineForDisplay(deadline)}</h3>
          <p className="font-light">(Notes: {folders[deadline].length}/10)</p>
        </div>
      ))}
      
    </div>
  );
}

export default FolderManager;

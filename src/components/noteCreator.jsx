import React, {useState, useEffect} from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useNotes } from '../context/NotesContext';

//Para este desarrollo me he apoyado en la documentación de Firebase y en los siguiente videos de youtube
//Fuente: https://youtu.be/drF8HbnW87w?si=cJn5jLz9cgfBbUYu
//Fuente: https://www.youtube.com/watch?v=dLySJhRL-AA&list=PLt4757glfbhGMJ9LxziIBKkUVAKQoVHn6


//El componente de NoteCreator se encarga de crear y gestionar notas
function NoteCreator(){
   
    const { notes, setNotes } = useNotes();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [deadline, setDeadline] = useState('')


    // Crear una nota en la base de datos de Firebase (db)
    const createNote = async (e) => {
        e.preventDefault();
        //Para ver si la nota se ha guardado correctamente (antes de tener interfaz)
        console.log("Doc Title:", title,"Content:",content, "deadline:", deadline);

        //Para evitar que se guarden notas con campos vacíos
        if (!title || !content || !deadline) {
            alert("Please fill in all fields");
            return;
        }

        // Max Notes = 10
        const selectedDeadline = new Date(deadline);
        //En la base de datos de Firebase se recoge únicamente la fecha. Pero toDate devuelve fecha y hora (timestamp)
            //toDate to ISOString without time (split ("T")). Así solo obtenemos la fecha
            // fuente:
            // https://bobbyhadz.com/blog/javascript-get-iso-date-without-time
        const notesWithSameDeadline = notes.filter(
            (note) => new Date(note.deadline)=== selectedDeadline
        );
        if (notesWithSameDeadline.length >= 10) {
            alert("That folder is full! Choose another deadline");
            return;
        }

        //Guardar la nota en Firebase
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                title,
                content,
                deadline: new Date(deadline),
            });
            
            console.log("Document written with ID: ", docRef.id);
            // Reset formulario
            setTitle("");
            setContent("");
            setDeadline("");
        
            } catch (error) {
            console.error("Error adding document: ", error);
            }
    };

   /* Pendiente eliminar una nota de firebase (desde el noteManager y el noteCreator)
    };*/


    
    return(
        <div className=' flex-col justify-around bg-white h-200 w-full'>
           <div className='bg-green flex justify-around p-4 gap-x-4'>
               <div className='inputField w-2/3'> {/*Se recoge el nuevo valor de la variable*/}
                     <input className='blackText w-full h-auto'  type="text" placeholder='Note Title' 
                        value={title} onChange={(event)=> setTitle(event.target.value)}
                     />
               </div>
                <div className='inputField w-1/3'> {/*Se recoge el nuevo valor de la variable*/}
                     <input className='blackText w-full h-auto'  type="date" 
                        value={deadline} onChange={(event)=> setDeadline(event.target.value)}
                     />
               </div>
            
           </div> 
        
           <div className='gr-red grid-cols-1'>  {/*Se llama a la función crear note al pulsar el botón de guardar (onSubmit form="noteForm*/}
                <form className='inputField' id="noteForm" onSubmit={createNote} >
                     <textarea className=' p-4 w-full h-160 overflow-y-scroll resize-none blackText'  type="text" placeholder ='Content'
                        value={content} onChange={(event) => setContent(event.target.value)}
                     />
               </form>
           </div>


           <div className='bg-blue-300 grid-cols-2'>
                <div className='flex p-4 gap-5'>
                    <div> 
                        <button className='bg-black p-2 hover:bg-amber-400 hover:text-black' type='button'> 
                            Delete
                        </button>
                    </div>
                    <div> <button className='bg-black p-2 hover:bg-amber-400 hover:text-black' 
                    type='submit'
                    form="noteForm"> {/*Fuente:https://react.dev/reference/react-dom/components/form (onSubmit form="noteForm*/}
                        Save</button>
                        
                    </div>
                        
                    
                </div>
           </div>
        </div>
    )
    
};

export default NoteCreator;
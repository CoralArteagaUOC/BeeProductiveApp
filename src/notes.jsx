import './App.css'
import  React,{useState, useEffect} from 'react'
import Navbar from './navbar';
import { useNotes } from './context/NotesContext';
import FolderManager from './components/folderManager';
import NoteCreator from './components/noteCreator';

/* La página de NotesPage contiene a los componente FolderManager y NoteCreator 
     En esta página se crearán nuevas notas y se visualiza las carpetas existentes
*/

function NotesPage(){
    const { handleFolderSelect, selectedFolder } = useNotes();
   
    return(
           
        <div>
            <h1>NOTES</h1>
            <Navbar /> 
            
            <div className= 'flex justify-around w-full h-200 wrapper'>
               <div className =" w-2/6 h-200 overflow-y-scroll">
                   <FolderManager onFolderSelect={handleFolderSelect} selectedFolder={selectedFolder}/>
                </div>
              
                <div  className ="block2 w-full h-auto">
                    <NoteCreator/>
                </div>
            </div>
        </div>
           
    );
};

export default NotesPage;

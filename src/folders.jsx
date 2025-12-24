import { useState } from 'react'
import Navbar from './navbar';
import NoteManager from './components/noteManager';
import FolderManager from './components/folderManager';

/* El componente FolderPage es la págian de carpetas y padre de los componenetes FolderManager y NoteManager
    Debido a los datos que comparten los dos componenetes mencionados, gestiona la selección de carpetas y notas
*/
function FoldersPage(){
    /*Los hooks de React han sido utilizados en distintos componenetes del proyecto. 
     En el caso de useState(), nos proporciona información sobre el estado de la variable declarada
     fuente:https://react.dev/reference/react/useState
     Así los elementos reciben información, solo cuando se produzca un cambio
    */
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [noteIds, setNoteIds] = useState([]);
    const handleFolderSelect = (deadline, ids) => {   
        setSelectedFolder(deadline);
        setNoteIds(ids);
    };

    return(
           
        <div>
            <h1>FOLDERS</h1>
            <Navbar /> 
            <div className= 'flex justify-around w-full h-200 wrapper'>
                <div className =" w-2/6 h-200 overflow-y-scroll">
                    {/*Se pasa la carpeta seleccionada al FolderManager*/}
                   <FolderManager onFolderSelect={handleFolderSelect} selectedFolder={selectedFolder} />

                </div>
                <div  className ="w-full h-auto bg-white blackText">
                    {selectedFolder && (
                     /*Se pasan las notas de la carpeta seleccionada al NoteManager*/
                    <NoteManager selectedFolder={selectedFolder} noteIds={noteIds}
                        onNoteSelect={(note) => console.log('Selected note:', note)} 
                    />

                    )}
                </div>
            </div>
        </div>
           
    );
};

export default FoldersPage;

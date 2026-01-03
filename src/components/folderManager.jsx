import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../context/UserAuth";
//Importamos el contexto de la autentificación de usuario


function FolderManager({ onFolderSelect, selectedFolder }) {

  const { user } = UserAuth();
  const [folders, setFolders] = useState({});

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribeUser = onSnapshot(userRef, async (userSnapshot) => {
      const userData = userSnapshot.data();
      if (!userData || !userData.userFolders) return;

      const userFolders = userData.userFolders;
      const foldersData = {};

      // Se recoge cada carpeta
      for (const folderTitle of userFolders) {
        const folderRef = doc(db, "folders", folderTitle);
        const folderSnapshot = await getDoc(folderRef);
        if (folderSnapshot.exists()) {
          const folderData = folderSnapshot.data();
          if (folderData.noteIds && folderData.noteIds.length > 0) {
            foldersData[folderTitle] = folderData;
          } else {
            // Se eliminan las carpetas vacías
            await deleteDoc(folderRef);
            // Se elimina del array
            await setDoc(
              userRef,
              {
                userFolders: userData.userFolders.filter((f) => f !== folderTitle),
              },
              { merge: true }
            );
          }
        }
      }

      setFolders(foldersData);
    });

    return () => unsubscribeUser();
  }, [user]);


  //"useMemo is a hook that memoizes the value until any of the dependecies changes"-Cosden Solutions (youtube)
  // Es decir es un hook que funciona como el useState, salvo que este conserva su valor pese al renderizado,
  // hasta que haya un cambio en su valor. Esto ofrece mayor optimización (fuente: https://stackoverflow.com/questions/56028913/usememo-vs-useeffect-usestate)
  //fuente: https://youtu.be/vpE9I_eqHdM?si=uA8DRSUkLGOsKqOC
  //fuente: https://react.dev/reference/react/useMemo
  //En estes proyecto, necesitamos recoger las notas en grupos y actualizar cuando se produzca un cambio
  const sortedDeadlines = useMemo(
    //Ordenar componenentes de un array en React con .map 
    //fuente: https://youtu.be/zZzcnmU_LoU?si=XJ8IvdeTOmzWPrif
    //fuente: https://medium.com/@francesco.saviano87/mastering-javascript-date-and-time-49e303d50ae3 3.Handlinf DIfferent Date Formats
    //fuetne: https://medium.com/@AlexanderObregon/handling-dates-and-times-in-javascript-8b62091f2e74 -More Complex Formatting:
    () => Object.keys(folders).sort((a, b) => new Date(a) - new Date(b)),
    [folders]
  );
 

    return (
    <div className="folderManager">
      {sortedDeadlines.map((deadline) => (
        <div
          className={`folder p-2 border-2 ${
            selectedFolder === deadline ? "bg-amber-400 blackText" : "bg-black"
          }`}
          key={deadline}
          onClick={() => onFolderSelect(deadline, folders[deadline].noteIds)}
        >
          <p>{deadline}</p>
          <p className="font-light">(Notes: {folders[deadline].noteIds.length}/10)</p>
        </div>
      ))}
    </div>
  );
}

export default FolderManager;

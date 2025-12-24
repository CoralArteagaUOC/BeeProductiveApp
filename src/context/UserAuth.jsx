import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

//OBJETIVO: COMPARTIR ESTADOS ENTRE ELEMENTOS (estado del usuario)
//Este desarrollo se ha realizado con el apoyo de la documentación de firebase: https://firebase.google.com/docs/auth/web/google-signin?hl=en y 
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk
// Context bucket
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  // INICIO DE SESIÓN con GOOGLE 
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    //también se puede iniciar sesión con redirección, pero se eligió el PopUp
    return signInWithPopup(auth, provider);
  };

  // CERRAR SESIÓN
  const logOut = () => signOut(auth);

  // useEffect React Hook para mantener sincronización con Firebase
  // fuente: https://react.dev/reference/react/useEffect#useeffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Documenatación Firestore: https://firebase.google.com/docs/firestore/manage-data/add-data
      // Documenatación Firestore: https://firebase.google.com/docs/auth/admin/manage-users?hl=en
      // Si se detecta un usuario
      if (currentUser) {
        // Cambiamos el valor de user (declarado al comienzo)
        setUser(currentUser);
        // Referencia al documento "users" en Firestore
        const userRef = doc(db, "users", currentUser.uid);
        // Se intenta capturar el documento del usuario en la base de datos
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          // Si el usuario no existe en la base de datos, se crea un documento nuevo
          // Antes de establecer los valores de las variables en la base de datos,
          // se ha craedo la colección "users" en Firebase y añadido los parametros que
          // recogerá cada documento (/users(uid'', email'', displayName '', userFolders[]))
          await setDoc(userRef, {
            // Guardamos su id generada automáticamente y los demás datos
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            // Este array recogerá las carpetas creadas por el usuario 
            userFolders: [], 
          });
          console.log("User created");
        } else {
          console.log("User already exists");
        }
      } else {
        setUser(null);
        console.log("No user detected");
      }
      
      console.log('Welcome,', currentUser.displayName);
      console.log('User ref:', currentUser.uid);
      console.log('User data:', currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Se envían los valores a la aplicación (encapsular los componentes (children) en main.jsx)
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const UserAuth = () => useContext(AuthContext);

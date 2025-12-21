import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

//OBJETIVO: COMPARTIR ESTADOS ENTRE ELEMENTOS (estado del usuario)
//Este desarrollo se ha realizado con el apoyo de la documentación de firebase y 
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk
// Context bucket
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // sign-in helper
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // make caller wait
    return signInWithPopup(auth, provider);
  };

  // sign-out helper
  const logOut = () => signOut(auth);

  // keep local state in sync with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('Firebase user:', currentUser);
    });

    // clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Return to the app
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const UserAuth = () => useContext(AuthContext);

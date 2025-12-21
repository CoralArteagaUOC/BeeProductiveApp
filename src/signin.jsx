import GoogleButton from 'react-google-button';
import { UserAuth } from './context/UserAuth';
import {useNavigate} from 'react-router-dom';

//Este desarrollo se ha realizado con el apoyo de la documentación de firebase y 
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk
const Signin = () => {
  
 const { user, googleSignIn, logOut } = UserAuth();

 const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/BeeProductiveApp/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/BeeProductiveApp/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
   
      <div className="max-w-60 m-auto p-4">
        {user ? (
          <button onClick={handleSignOut} className= " underline hover:text-red-600">Log Out</button>
          
        ) : (
          <GoogleButton onClick={handleGoogleSignIn} />
        )}
      </div>
    </div>
  );
};

export default Signin;

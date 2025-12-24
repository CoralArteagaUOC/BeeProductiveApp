import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './navbar';
import Home from './home';
import Signin from './signin';
import { UserAuth } from './context/UserAuth';
import {Link} from 'react-router-dom'

//Se captura el objeto user de UserAuth() de Firebase y
// se pasa a el componente Navbar
function App() {
  const {user} = UserAuth();
  
  return(
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center ' >
          
          <img className= '  w-auto max-h-40 ' src="/icons/beeproductive_smbol.png" alt="BeeProductive logo" />
          
          <h1 className= 'text-center text-2xl font-bold w-full'>
            BeeProductive App
          </h1>
        </div>
       
        <div>
          <Signin className='w-full'/> 
          <div> {user != null?<Link className= " underline hover:text-yellow-400" to="/home">Go Home</Link> : <p> Log in, please</p> }</div>
          
        </div>
      
    
    </div>
  );
};

export default App;

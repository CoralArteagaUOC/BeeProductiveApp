import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './navbar';
import NoteManager from './components/noteManager';
import FolderManager from './components/folderManager';


function Home(){ 
  
    return(
           
        <div>
            <h1>HOME</h1>
            <Navbar /> 
            <div className= 'flex justify-around w-full h-200 wrapper'>
                <div className ="block1 w-auto h-fullx">
                   <FolderManager/>
                </div>
                <div  className ="block2 w-auto h-full">
                    <NoteManager/>
                </div>
            </div>
        </div>
           
    );
   
    
};

export default Home;
import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './navbar';

function TimerPage(){
     return(
           
        <div>
            <h1>TIMER</h1>
            <Navbar /> 
        </div>
           
    );
};

export default TimerPage;

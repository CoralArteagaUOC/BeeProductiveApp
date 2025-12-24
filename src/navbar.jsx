import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserAuth } from './context/UserAuth';

//La función Navbar recoge las páginas para navegar
//Para este desarollo se ha utilizado la documentación de Reac Router 
function NavbarComponent( ) { 
 const {user} = UserAuth();
    return(
        <div className= 'flex justify-between bf-gray-200 w-full  p-4'>
           
            <nav className= 'flex justify-between w-full'>
                
                <Link to="/home">Home</Link>
                <Link to="/timer">Timer</Link>
                <Link to="/folders">Folders</Link>
                <Link to="/notes">Notes</Link>
                <Link to="/settings">Settings</Link>
                <div>
                {user?(
                    <Link to ='/'> Log Out </Link>
                ): (
                    console.log("no user logged in")
                )}
            </div>
            </nav>

            
            
        </div>
    );
};

const Navbar = NavbarComponent;
export default Navbar;
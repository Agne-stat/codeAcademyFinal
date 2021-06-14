import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function Header() {
    const [redirect, setRedirect] = useState(null);

    const logout = () => {
        localStorage.removeItem('gameUser-id');
        console.log('loged out')
        setRedirect('/login');
    }

    if(redirect) return <Redirect exact to={redirect}></Redirect>

    return (
        <header>
           <nav>
               <ul>
                   <li>
                       <Link to='/'>LOGO</Link>
                    </li>
               </ul>
               <button onClick={logout}>Loguot</button>
            </nav> 
        </header>
    )
}

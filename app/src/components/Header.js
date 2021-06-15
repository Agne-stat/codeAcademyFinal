import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png'
import './Header.css'

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
               <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="logo"></img>
                    </Link>
               </div>
               <button className="logout" onClick={logout}>LOGOUT</button>
            </nav> 
        </header>
    )
}

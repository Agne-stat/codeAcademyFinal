import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
           <nav>
               <ul>
                   <li>
                       <Link to='/'>LOGO</Link>
                    </li>
                   <li>Loguot</li>
               </ul>
            </nav> 
        </header>
    )
}

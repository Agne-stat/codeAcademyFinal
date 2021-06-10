import React from 'react'
import { Link } from 'react-router-dom';

export default function GameWindow() {
    return (
        <div>
           <h1>Game Window</h1>
           <div>
               <div>
                    <Link to='/arena'>ARENA</Link>
               </div>
               <div>
                    <Link to='/leadersboard'>LEADERS BOARD</Link>
               </div>
               <div>
                    <Link to='/shop'>SHOP</Link>
               </div>
               <div>
                    <Link to='/inventory'>INVENTORY</Link>
               </div>
           </div>
        </div>
    )
}

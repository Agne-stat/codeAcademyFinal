import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../App';
import axios from 'axios';

export default function GameWindow() {
     const { userData } = useContext(DataContext)

     const [userGold, setuserGold] = useState(0)

     useEffect(() => {
          console.log(userData)

          setuserGold(userData.gold)

     }, [userData])

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

           <div>
                <div>{userGold}</div>
                <div>{userData.health}</div>
           </div>
        </div>
    )
}

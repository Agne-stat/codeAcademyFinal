import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../App';
import axios from 'axios';

export default function GameWindow() {
     const { userData } = useContext(DataContext)

     const [userGold, setuserGold] = useState(0)
     const [userHealth, setUserHealth] = useState(0)

     useEffect(() => {
          const id = localStorage.getItem('gameUser-id')

          axios.get('http://localhost:5000/user/'+ id)
               .then((res) => {
                    setuserGold(res.data.gold)
                    setUserHealth(res.data.health)
                    console.log(res.data)
          })

     }, [userData])

    return (
        <div>
          <div className="user-profile">
               <h1>Hello, {userData.username}</h1>
               <div>
                    <img src={userData.image} alt="profile pic"></img>
               </div>
               
          </div>
           
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
                <div>{userHealth}</div>
           </div>
        </div>
    )
}

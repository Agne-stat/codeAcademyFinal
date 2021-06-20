import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import axios from 'axios';
import './styles/GameWindow.css'

export default function GameWindow() {
     const [userGold, setuserGold] = useState(0)
     const [userHealth, setUserHealth] = useState(0)
     const [redirect, setRedirect] = useState(null);
     const [userData, setUserData] = useState([])

     const id = localStorage.getItem('gameUser-id')

     useEffect(() => {

          axios.get('http://localhost:5000/user/'+ id)
               .then((res) => {
                    setUserData(res.data)
                    setuserGold(res.data.gold)
                    setUserHealth(res.data.health)
          })

          return function cleanup() {
               setUserData([])
               setuserGold(0)
               setUserHealth(0)
          }

     }, [])

     const logout = () => {
          localStorage.removeItem('gameUser-id');
          setRedirect('/');
     }
     if(redirect) return <Redirect exact to={redirect}></Redirect>


    return (
          <main className="home">
               <div className="home-container">
                    <UserProfile user={userData} gold={userGold} health={userHealth}></UserProfile>
                    
                    <div className="game-navigation">
                         <div className="game-container">
                              <Link to='/arena' className="game-item">ARENA</Link>
                              <Link to='/leadersboard' className="game-item">LEADERS BOARD</Link>
                              <Link to='/shop' className="game-item">SHOP</Link>
                              <Link to='/inventory' className="game-item">INVENTORY</Link>
                         </div>
                         <button className="logout" onClick={logout}>LOGOUT</button>
                    </div>
               </div>
          </main>
    )
}

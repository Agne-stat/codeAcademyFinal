import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../App';
import UserProfile from '../components/UserProfile';
import axios from 'axios';
import './styles/GameWindow.css'

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
          <main className="home">
               <div className="home-container">
                    <UserProfile user={userData} gold={userGold} health={userHealth}></UserProfile>
                    
                    <div className="game-navigation">
                         <div className="game-container">
                              <div className="game-item">
                                   <Link to='/arena'>ARENA</Link>
                              </div>
                              <div className="game-item">
                                   <Link to='/leadersboard'>LEADERS BOARD</Link>
                              </div>
                              <div className="game-item">
                                   <Link to='/shop'>SHOP</Link>
                              </div>
                              <div className="game-item">
                                   <Link to='/inventory'>INVENTORY</Link>
                              </div>
                         </div>
                    </div>
               </div>
          </main>
    )
}

import React, { useEffect, useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { DataContext } from '../App';
import UserProfile from '../components/UserProfile';
import axios from 'axios';
import './styles/GameWindow.css'

export default function GameWindow() {
     const { userData } = useContext(DataContext)

     const [userGold, setuserGold] = useState(0)
     const [userHealth, setUserHealth] = useState(0)
     const [redirect, setRedirect] = useState(null);

     useEffect(() => {
          const id = localStorage.getItem('gameUser-id')

          axios.get('http://localhost:5000/user/'+ id)
               .then((res) => {
                    setuserGold(res.data.gold)
                    setUserHealth(res.data.health)
                    console.log(res.data)
          })

     }, [userData])

     const logout = () => {
          localStorage.removeItem('gameUser-id');
          console.log('loged out')
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

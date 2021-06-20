import React, { useEffect, useState, useContext } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { DataContext } from '../App';
import { Link } from 'react-router-dom'
import './styles/LeadersBoard.css'

export default function LeadersBoard() {
    const { userData } = useContext(DataContext)

    const [allusers, setAllusers] = useState([])
    const [currentUser, setCurrentUser] = useState('')


    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then((res) => {
            let list = res.data
            list.sort((a,b) => b.gold - a.gold)
            setAllusers(list)
        })

        setCurrentUser(userData.username)

    }, [userData])


    return (
        <main className="leadersBoard">
            <div className="leadersBoard-container">
                <div>
                    <h1>Leaders Board</h1>
                    <BackButton></BackButton>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>GOLD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allusers.map(user => (
                            <tr key={user._id} className={currentUser === user.username ? "userScore" : ''}>
                                <td >
                                    <Link to={'/user/'+ user._id}>{user.username}</Link>
                                </td>
                                <td>{user.gold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            
        </main>
    )
}

import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function LeadersBoard() {
    const [allusers, setAllusers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then((res) => {
            let list = res.data
            list.sort((a,b) => b.gold - a.gold)
            setAllusers(list)
        })

        console.log(allusers)

    }, [])


    return (
        <div>
            <h1>Leaders Board</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gold</th>
                    </tr>
                </thead>
                <tbody>
                    {allusers.map(user => (
                        <tr key={user._id}>
                            <td>
                                <Link to={'/user/'+ user._id}>{user.username}</Link>
                            </td>
                            <td>{user.gold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BackButton></BackButton>
        </div>
    )
}

import React, { useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { DataContext } from '../App';

export default function UserProfile({user, gold, health}) {
    const { userData, setuserData, updateProfile, setUpdateProfile, id, username, setUsername} = useContext(DataContext)

    const [newUsername, setNewUsername] = useState('')
    const [errorName, setErrorName] = useState('')

    useEffect(() => {
        setuserData(userData)
        setUsername(userData.username)
    }, [userData, setuserData,setUsername ])

    const changeUsername =(e) => {
        e.preventDefault();
        let username = newUsername;

        if(newUsername === '') {
            setErrorName("Enter username")
        } else if (newUsername.length < 4 || newUsername.length > 20) {
            setErrorName("Username should be between 4 and 20 digits") 
        } else {
            axios.put('http://localhost:5000/updateUsername/'+id, {username})
            .then((res) => {
            })
        }

        setUsername(username)
        setUpdateProfile(false)
        
    }

    return (
        <div className="user-profile">
            <h2>{username}</h2>
            <div className="image-container">
                <img src={user.image} alt="profile pic"></img>
            </div>
            <button onClick={() => setUpdateProfile(true)} className="edit-info">Edit Profile</button>
            <div className="user-info">
                <div>GOLD: <span>{user.gold}</span></div>
                <div>HEALTH: <span>{health}</span></div>
            </div>

            
            {updateProfile === true && <div className="edit-form">
                <form onSubmit={changeUsername}>
                    <label>Your new username:</label>
                    <input type="text" placeholder="new name" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></input>
                    {errorName && <p>{errorName}</p>}
                    <button>Save</button>
                </form>
            </div>}
            

        </div>
    )
}

import React from 'react'

export default function UserProfile({user, gold, health}) {
    return (
        <div className="user-profile">
            <h2>{user.username}</h2>
            <div className="image-container">
                <img src={user.image} alt="profile pic"></img>
            </div>
            <div className="user-info">
                <div>GOLD: <span>{gold}</span></div>
                <div>HEALTH: <span>{health}</span></div>
            </div>
        </div>
    )
}

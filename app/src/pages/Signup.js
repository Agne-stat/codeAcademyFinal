import React, { useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [redirect, setRedirect] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/signup', {username, password:passwordOne})
        .then((res) => {
            console.log(res)
            setRedirect('/login')
        })
        .catch((err) => console.log(err))
        
    }
    if(redirect) return <Redirect exact to={redirect}></Redirect>

    return (
        <main>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type="password" value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}></input>
                </div>
                <div>
                    <label>Confirm your password</label>
                    <input
                    type="password" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)}></input>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    )
}

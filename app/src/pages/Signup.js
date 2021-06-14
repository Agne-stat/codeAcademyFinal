import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [error, setError] = useState(null)
    const [errorName, setErrorName] = useState(null);
    const [errorPsw1, setErrorPsw1] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorName('');
        setErrorPsw1('');
        setError('')

        if(passwordOne === passwordTwo) {
            axios.post('http://localhost:5000/signup', {username, password:passwordOne})
            .then((res) => {
                console.log(res)
                if(res.data.username === false) {
                    setErrorName('Username already exists')
                }
                if(res.data.password.length < 4 || res.data.password.length > 20) {
                    setErrorPsw1('Password lenght must be between 5 and 20')
                }

                setRedirect('/login')
            })
            .catch((err) => console.log(err))
        } else {
            setError('Passwords should match')
        }
        
        
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
                    {errorName && <p>{errorName}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type="password" value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}></input>
                    {errorPsw1 && <p>{errorPsw1}</p>}
                </div>
                <div>
                    <label>Confirm your password</label>
                    <input
                    type="password" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)}></input>
                </div>
                <div>
                    <button>Login</button>
                </div>

                {error && <p>{error}</p>}
            </form>
        </main>
    )
}

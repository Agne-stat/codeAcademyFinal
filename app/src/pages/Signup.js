import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';
import './styles/Signup.css'

export default function Signup() {
    const [username, setUsername] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [error, setError] = useState(null)
    const [errorName, setErrorName] = useState(null);
    const [errorPsw1, setErrorPsw1] = useState(null)

    useEffect(() => {
        setErrorName('');
        setErrorPsw1('');
        setError('')
    }, [username, passwordOne, passwordTwo])



    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '') {
            setErrorName("Enter username")
        } else if (username.length < 4 || username.length > 20) {
            setErrorName("Username should be between 4 and 20 digits")
        } else if (passwordOne.length < 4 || passwordOne.length > 20) {
            setErrorPsw1("Password should be between 4 and 20 digits")
        } else if (passwordOne !== passwordTwo) {
            setErrorPsw1("Passwords should match")
        } else {
            axios.post('http://localhost:5000/signup', {username, password:passwordOne})
            .then((res) => {
                setRedirect('/login')
            })
            .catch((err) => {
                console.log(err)
                setError('Username already exists')
            })
        }
        
            
    }
    if(redirect) return <Redirect exact to={redirect}></Redirect>

    return (
        <main className="signup">
            <div className="signup-container">
                <div className="signup-item">
                    <h1>Signup</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label>Username</label>
                        <input
                        type="text" placeholder="username" value={username}  onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    {errorName && <p>{errorName}</p>}
                    <div className="form-item">
                        <label>Password</label>
                        <input
                        type="password" placeholder="password" value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}></input>
                    </div>
                    {errorPsw1 && <p>{errorPsw1}</p>}
                    <div className="form-item">
                        <label>Confirm your password</label>
                        <input
                        type="password" placeholder="password" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)}></input>
                    </div>
                    {error && <p>{error}</p>}
                    <div className="form-item">
                        <button>Signup</button>
                    </div>
                    
                </form>
            </div>
            
        </main>
    )
}

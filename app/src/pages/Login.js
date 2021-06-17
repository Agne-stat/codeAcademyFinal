import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import './styles/Login.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        setUsername('')
        setPassword('')

        const id = localStorage.getItem('gameUser-id')
        if(id === null) {
            console.log("not loged in")
          } else {
            setRedirect('/home');
          }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:5000/login', {username, password})
        .then((res) => {
            localStorage.setItem('gameUser-id',res.data._id)
            
            setRedirect('/home')
        })
        .catch((err) => {
            setErrMessage('Wrong username or password')
            console.log(err)
        })
        
    }
    if(redirect) return <Redirect exact to={redirect}></Redirect>


    return (
        <main className="login">
            <div className="login-container">
                <div className="login-item">
                    <h1>Login</h1>
                </div>
                
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <label>Username</label>
                            <input
                            type="text" 
                            placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="form-item">
                            <label>Password</label>
                            <input
                            type="password" 
                            placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <p>{errMessage}</p>
                        <div className="form-item">
                            <button>Login</button>
                        </div>
                    </form>

                    <div className="login-container-item">
                        <p>Don't have an account yet?</p>
                        <button>
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </button>
                    </div>
                </div>
                
            </div>
            
        </main>
    )
}

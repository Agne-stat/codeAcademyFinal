import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', {username, password})
        .then((res) => {
            localStorage.setItem('gameUser-id',res.data._id)
            console.log(res)
            setRedirect('/')
        })
        .catch((err) => console.log(err))
    }
    if(redirect) return <Redirect exact to={redirect}></Redirect>


    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
            <div>
                <p>Don't have an account yet?</p>
                <button>
                    <Link to='/signup'>
                        Signup
                    </Link>
                </button>
            </div>
        </main>
    )
}

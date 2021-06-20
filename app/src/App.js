import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import GameWindow from './pages/GameWindow'
import Arena from './pages/Arena'
import LeadersBoard from './pages/LeadersBoard'
import Shop from './pages/Shop'
import UserInventory from './pages/UserInventory'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SingleUser from './pages/SingleUser';

export const DataContext = React.createContext();

function App() {
  const [userData, setuserData] = useState([])

  useEffect(() => {
    const id = localStorage.getItem('gameUser-id')

    axios.get('http://localhost:5000/user/'+ id)
    .then((res) => {
      setuserData(res.data)

    })

    console.log(id)

  }, [])

  
  return (
    <div className="App">
      <DataContext.Provider value={{userData, setuserData }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Login></Login>
            </Route>
            <Route path='/home'>
              <GameWindow></GameWindow>
            </Route>
            <Route path='/arena'>
              <Arena></Arena>
            </Route>
            <Route path='/leadersboard'>
              <LeadersBoard></LeadersBoard>
            </Route>
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path='/inventory'>
              <UserInventory></UserInventory>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/signup'>
              <Signup></Signup>
            </Route>
            <Route path='/user/:id'>
              <SingleUser></SingleUser>
            </Route>
          </Switch>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;

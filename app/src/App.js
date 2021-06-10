import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import GameWindow from './pages/GameWindow'
import Arena from './pages/Arena'
import LeadersBoard from './pages/LeadersBoard'
import Shop from './pages/Shop'
import UserInventory from './pages/UserInventory'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;

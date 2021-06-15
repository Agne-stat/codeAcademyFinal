import React, { useEffect, useContext, useState } from 'react'
import { Enemies } from '../inventory/Enemies'
import { DataContext } from '../App';
import axios from 'axios';

export default function Arena() {
    const { userData, setuserData } = useContext(DataContext)

    const [userGold, setUserGold] = useState(0)
    const [userHealth, setUserHealth] = useState(0)
    const [userDamage, setUserDamage] = useState(3)
    const [userDefence, setUserDefence] = useState(1)
    const [userHealing, setUserHealing] = useState(0)

    const [monster, setMonster] = useState([])
    const [monsterHealth, setMonsterHealth] = useState(100)
    const [monsterDamage, setMonsterDamage] = useState(0)
    const [changeMonster, setChangeMonster] = useState(true)

    let enemies = Enemies;

    const id = localStorage.getItem('gameUser-id');

    useEffect(() => {

        const id = localStorage.getItem('gameUser-id')

          axios.get('http://localhost:5000/user/'+ id)
               .then((res) => {
                setuserData(res.data)
                setUserGold(res.data.gold)
                setUserHealth(res.data.health)
          })

        
        setChangeMonster(false)

        if(userData.inventoryWeapons.length === 0) {
            setUserDamage(3)
        } else {
            setUserDamage(userData.inventoryWeapons[0].damage)

        }

        if(userData.inventoryArmors.length === 0) {
            setUserDefence(1)
        } else {
            setUserDefence(userData.inventoryArmors[0].defence)
        }

        if(userData.inventoryPotions.length === 0) {
            setUserHealing(0) 
        } else {
            setUserHealing(userData.inventoryPotions[0].heals)
        }

        if(changeMonster === true) {
            let monsterIndex = Math.floor(Math.random() * enemies.length)
            console.log(enemies,monsterIndex)
            setMonster(enemies[monsterIndex])
            setMonsterHealth(100)
            setMonsterDamage(enemies[monsterIndex].damage)
            setChangeMonster(false)
        }

    }, [userData, changeMonster])

    const startFight = () => {
        console.log(monster)

        if(monsterHealth < 1) {
            console.log('new monster')
            setChangeMonster(true)
        }

        let userDamageLevel = Math.floor(Math.random() * userDamage+1)
        let monsterDamageLevel = Math.floor(Math.random() * monsterDamage+1)
        let armor = Math.floor(Math.random() * userDefence+1)
        console.log(armor)

        // weapon's special effects
        if(userData.inventoryWeapons.length === 0) {
            console.log('no weapon')
        } else {
            if(userData.inventoryWeapons[0].name === 'sword') {
                let possibility = Math.floor(Math.random() * 5)
                console.log(possibility)
                if(possibility === 4) {
                    monsterDamageLevel = 0
                    armor = 0
                } else {
                    monsterDamageLevel = Math.floor(Math.random() * monsterDamage+1)
                }
                console.log(monsterDamageLevel)
            } else if (userData.inventoryWeapons[0].name === 'bow') {
                let possibility = Math.floor(Math.random() * 3)
                console.log(possibility)
                if(possibility === 2) {
                    userDamageLevel=(Math.floor(Math.random() * userDamage+1))*2
                }
            } else if (userData.inventoryWeapons[0].name === 'magic wand') {
                let possibility = Math.floor(Math.random() * 10)
                console.log(possibility)
                if(possibility > 4) {
                    let bonusHealth = userHealth + 10
                    setUserHealth(bonusHealth)
                    console.log(userHealth)
                }
            }
        }

        

        let health = userHealth - monsterDamageLevel + armor
        console.log(health)
        axios.put('http://localhost:5000/updateUserHealth/'+id, {health})
            .then((res) => {
                console.log(res)
            })
        
        setUserHealth(health)

        let gold = userGold + Math.floor(Math.random() * 11)

        axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

        setUserGold(gold)

        let healthMonster = monsterHealth - userDamageLevel;

        setMonsterHealth(healthMonster)

        console.log(userDamageLevel,monsterDamageLevel)

    }

    const takePotion = () => {

        let health = userHealth + userHealing
        axios.put('http://localhost:5000/updateUserHealth/'+id, {health})
            .then((res) => {
                console.log(res)
            })
        
        console.log(health)
        
        setUserHealth(health)

        let gold = userGold
        let potion = []

        axios.put('http://localhost:5000/sellPotion/'+id, {gold, potion})
            .then((res) => {
                console.log(res)
        })
        
        setUserHealing(0)
    }

    return (
        <div>
            <h1>Arena</h1>
            <h2>{userGold}</h2>
            <div className="arena-wrapper">
                <div className="arena-player">
                    <div className="player"></div>
                    <div className="player-info">
                        <div>{userHealth}</div>

                        <div>{userDamage}</div>
                        <div>{userDefence}</div>
                        <div>{userHealing}</div>
                    </div>
                    <button disabled={userHealing === 0}  onClick={takePotion}>Drink potion</button>
                </div>

                <div className="arena-controler">
                    <div>
                        <button onClick={startFight}>FIGHT !</button>
                    </div>
                </div>

                <div className="arena-monster">
                <div className="monster"></div>
                    <div className="monster-info">
                        <div>{monsterHealth}</div>
                        <div>{monsterDamage}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

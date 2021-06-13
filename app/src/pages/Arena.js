import React, { useEffect, useContext, useState } from 'react'
import { Enemies } from '../inventory/Enemies'
import { DataContext } from '../App';
import axios from 'axios';

export default function Arena() {
    const { userData } = useContext(DataContext)

    const [userGold, setUserGold] = useState(0)
    const [userHealth, setUserHealth] = useState(0)
    const [userDamage, setUserDamage] = useState(3)
    const [userDefence, setUserDefence] = useState(1)
    const [userHealing, setUserHealing] = useState(0)

    const [monster, setMonster] = useState([])
    const [monsterHealth, setMonsterHealth] = useState(100)
    const [monsterDamage, setMonsterDamage] = useState(0)

    let enemies = Enemies;

    const id = localStorage.getItem('gameUser-id');
    // const localMonsterHealth  = localStorage.getItem('gameMonster-health')

    useEffect(() => {
        
        // setMonsterHealth(localMonsterHealth)
        setUserGold(userData.gold)
        setUserHealth(userData.health)

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

        let monsterIndex = Math.floor(Math.random() * enemies.length+1)

        setMonster(enemies[monsterIndex])
        setMonsterDamage(enemies[monsterIndex].damage)

        
        // if(localMonsterHealth <= 0) {
        //     let monsterIndex = Math.floor(Math.random() * enemies.length+1)
        //     setMonster(enemies[monsterIndex])
        // }
        
    }, [userData])

    const startFight = () => {
        console.log(monster)

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
        // localStorage.setItem('gameMonster-health',healthMonster)

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
                    <button onClick={takePotion}>Drink potion</button>
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

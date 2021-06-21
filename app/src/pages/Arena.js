import React, { useEffect, useContext, useState, useRef} from 'react'
import { Enemies } from '../inventory/Enemies'
import { DataContext } from '../App';
import BackButton from '../components/BackButton';
import axios from 'axios';
import './styles/Arena.css'

export default function Arena() {
    const { userData, setuserData } = useContext(DataContext)


    const [userGold, setUserGold] = useState(0)
    const [userHealth, setUserHealth] = useState(0)
    const [userDamage, setUserDamage] = useState(3)
    const [userDefence, setUserDefence] = useState(1)
    const [userHealing, setUserHealing] = useState(0)
    const [shakeUser, setShakeUser] = useState(false)
    const [shakeMonster, setShakeMonster] = useState(false)

    const [useWeapon, setUseWeapon] = useState(false)
    const [useArmor, setUseArmor] = useState(false)

    const [monster, setMonster] = useState([])
    const [monsterHealth, setMonsterHealth] = useState(100)
    const [monsterDamage, setMonsterDamage] = useState(0)
    const [changeMonster, setChangeMonster] = useState(true)
    const [specialsMessage, setSpecialsMessage] = useState('')

    let enemies = Enemies;
    let progressUser = useRef();
    let progressMonster = useRef();
    let imageUser = useRef();

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

        // cheking for inventory
        if(userData.inventoryWeapons.length === 0) {
            setUserDamage(3)
            setUseWeapon(false)
        } else {
            setUserDamage(userData.inventoryWeapons[0].damage)
        }

        if(userData.inventoryArmors.length === 0) {
            setUserDefence(1)
            setUseArmor(false)
        } else {
            setUserDefence(userData.inventoryArmors[0].defence)
        }

        if(userData.inventoryPotions.length === 0) {
            setUserHealing(0) 
        } else {
            setUserHealing(userData.inventoryPotions[0].heals)
        }

        // changing monster
        if(changeMonster === true) {
            let monsterIndex = Math.floor(Math.random() * enemies.length)
            setMonster(enemies[monsterIndex])
            setMonsterHealth(100)
            setMonsterDamage(enemies[monsterIndex].damage)
            setChangeMonster(false)
        }

        // health bars
        progressUser.current.style.width = `${userHealth}%`;
        progressMonster.current.style.width = `${monsterHealth}%`;


        imageUser.current.style.opacity = userHealth/100

    }, [userData, changeMonster, enemies, monsterHealth, userHealth, setuserData])

    const startFight = () => {
        
        // fighting animations
        setShakeUser(true)
        setTimeout(() => setShakeUser(false), 1000);

        setTimeout(() => setShakeMonster(true), 500);
        setTimeout(() => setShakeMonster(false), 1500);
       
        // bonus gold for killing monster
        let bonusGold = 0

        if(monsterHealth < 1) {
            setChangeMonster(true)
            bonusGold = 50
        }

        // weapon and armor 
        let userDamageLevel;
        let armor
        if (useWeapon === true) {
            userDamageLevel = Math.floor(Math.random() * userDamage+1)
        } else {
            userDamageLevel = Math.floor(Math.random() * 4)
        }

        if(useArmor === true) {
           armor = Math.floor(Math.random() * userDefence+1)
        } else {
            armor = Math.floor(Math.random() * 2)
        }
        

        let monsterDamageLevel = Math.floor(Math.random() * monsterDamage+1)

        // weapon's special effects
        if(userData.inventoryWeapons.length === 0) {
            console.log('no weapon')
        } else {
            if(userData.inventoryWeapons[0].name === 'sword' && useWeapon === true) {
                let possibility = Math.floor(Math.random() * 5)
                if(possibility === 4) {
                    monsterDamageLevel = 0
                    armor = 0
                    setSpecialsMessage('Enemy attack was bloked!')
                } else {
                    setSpecialsMessage('')
                    monsterDamageLevel = Math.floor(Math.random() * monsterDamage+1)
                }
            } else if (userData.inventoryWeapons[0].name === 'bow' && useWeapon === true) {
                let possibility = Math.floor(Math.random() * 3)
                if(possibility === 2) {
                    userDamageLevel=(Math.floor(Math.random() * userDamage+1))*2
                    setSpecialsMessage('Your damage was doubled!')
                } else {
                    setSpecialsMessage('')
                }
            } else if (userData.inventoryWeapons[0].name === 'magic wand' && useWeapon === true) {
                let possibility = Math.floor(Math.random() * 10)
                if(possibility > 4) {
                    let bonusHealth = userHealth + 10
                    setUserHealth(bonusHealth)
                    setSpecialsMessage('You have been heald by 10 hit points!')
                } else {
                    setSpecialsMessage('')
                }
            }
        }

        // updating user health and gold
        let health = userHealth - monsterDamageLevel + armor

        if(health > 0) {
            axios.put('http://localhost:5000/updateUserHealth/'+id, {health})
            .then((res) => {
            })
        
            setUserHealth(health)

            let gold = userGold + Math.floor(Math.random() * 11) + bonusGold;

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
            })

            setUserGold(gold)

        } else {
            health = 50;
            axios.put('http://localhost:5000/updateUserHealth/'+id, {health})
            .then((res) => {
            })
        
            setUserHealth(health)

            let gold = Math.floor(userGold / 2)

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
            })

            setUserGold(gold)
        }
        
        let healthMonster = monsterHealth - userDamageLevel;

        setMonsterHealth(healthMonster)
    }

    const takePotion = () => {

        let health = userHealth + userHealing
        axios.put('http://localhost:5000/updateUserHealth/'+id, {health})
            .then((res) => {
            })
        
        setUserHealth(health)

        let gold = userGold
        let potion = []

        axios.put('http://localhost:5000/sellPotion/'+id, {gold, potion})
            .then((res) => {
        })
        
        setUserHealing(0)
    }


    return (
        <main className="arena">
            <div className="arena-container">
                <div className="arena-wrapper">
                    <div className="arena-player">
                        <div className="player">
                            <img src={userData.image} alt="user" ref={imageUser} className={shakeUser === true ? "fighting" : ''}></img>
                        </div>
                        <div className="player-info">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ref={progressUser}></div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="arena-controler">
                        <div className="button">
                            <button onClick={startFight}>FIGHT !</button>
                        </div>
                        <div className="message">
                            {specialsMessage && <p>{specialsMessage}</p>}
                        </div>
                        
                    </div>

                    <div className="arena-monster">
                        <div className="monster">
                            <img src={monster.image} alt="monster" className={shakeMonster === true ? "fighting" : ''}></img>
                        </div>
                        <div className="monster-info">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ref={progressMonster}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="arena-items">
                    <BackButton></BackButton>
                    <h2 className="user-gold">Gold: {userGold}</h2>
                    <div className="user-inventory">

                        <button className={userHealing===0 ? "used-potion" : "potion"}  onClick={takePotion}>Drink potion</button>

                        <div className={useWeapon===true ? "used-item" : "user-inventory-item"}>
                            {userDamage !==3? 
                                <div>
                                    <img src={userData.inventoryWeapons[0].image} alt="weapon"></img>
                                    <button onClick={() => setUseWeapon(true)}>Use Weapon</button>
                                </div> :
                                <p>You don't have weapon</p>
                            }
                        </div>
                        <div className={useArmor===true ? "used-item" : "user-inventory-item"}>
                            {userDefence !==1 ?
                                <div>
                                    <img src={userData.inventoryArmors[0].image} alt="armor"></img>
                                    <button onClick={() => setUseArmor(true)}>Use Armor</button>
                                </div> :
                                <p>You don't have armor</p>
                            }
                        </div>

                    </div>
                </div>
            </div>
            
            
            
        </main>
    )
}

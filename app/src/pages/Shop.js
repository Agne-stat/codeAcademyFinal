import React, { useEffect, useContext, useState } from 'react'
import { Weapons } from '../inventory/Weapons'
import { Armors } from '../inventory/Armors'
import { Potions } from '../inventory/Potions'
import axios from 'axios'
import { DataContext } from '../App';
import UserProfile from '../components/UserProfile'
import BackButton from '../components/BackButton'
import './styles/Shop.css'

export default function Shop() {
    // const { userData } = useContext(DataContext)
    const [userGold, setuserGold] = useState(0)
    const [userData, setUserData] = useState([])
    const [haveWeapon, setHaveWeapon] = useState(false)
    const [haveArmor, setHaveArmor] = useState(false)
    const [havePotion, setHavePotion] = useState(false)

    let weapons = Weapons;
    let armors = Armors;
    let potions = Potions;
    const id = localStorage.getItem('gameUser-id');

    useEffect(() => {
        axios.get('http://localhost:5000/user/'+ id)
            .then((res) => {
                setUserData(res.data)
                setuserGold(res.data.gold)
                if(res.data.inventoryWeapons.length === 0) {
                    setHaveWeapon(false)
                } else {
                    setHaveWeapon(true)
                }

                if(res.data.inventoryArmors.length === 0) {
                    setHaveArmor(false)
                } else {
                    setHaveArmor(true)
                }

                if(res.data.inventoryPotions.length === 0) {
                    setHavePotion(false)
                } else {
                    setHavePotion(true)
                }
        })

    }, [userData])


    const addWeapon = (index) => {
        let weapon = weapons[index]

            axios.put('http://localhost:5000/addWeapon/'+id, {weapon})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - weapon.price
            
            console.log(gold)

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)
    }

    const addArmor = (index) => {
        let armor = armors[index]

        if(userData.gold >= armor.price) {
            axios.put('http://localhost:5000/addArmor/'+id, {armor})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - armor.price

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)

        } else {
            console.log('Not enought gold')
        }
    }

    const addPotion = (index) => {
        let potion = potions[index]

        if(userData.gold >= potion.price) {
            axios.put('http://localhost:5000/addPotion/'+id, {potion})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - potion.price

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)

        } else {
            console.log('Not enought gold')
        }
    }


    return (
        <main className="shop">
            <div className="shop-container">
                <div className="user-container">
                    <UserProfile user={userData} gold={userGold} health={userData.health}></UserProfile>
                    <BackButton></BackButton>
                </div>
                
                <div className="shop-items-container">
                    <h1>Shop</h1> 
                    <div className="shop-items">
                        <div className="weapons-items">
                            <div className="items-title">
                                <h3>Weapons</h3> 
                                {haveWeapon && <p>You already have a {userData.inventoryWeapons[0].name}</p>}
                            </div>
                            
                            <div className={haveWeapon ? "inInventory" : "weapons"}>
                                    <div className={userGold<weapons[0].price ? "disabled" : ""}>
                                        <img src={weapons[0].image} alt="weapon"></img>
                                        <button onClick={()=>addWeapon(0)}>{weapons[0].price}</button>
                                    </div>
                                    <div className={userGold<weapons[1].price ? "disabled" : ""}>
                                        <img src={weapons[1].image} alt="weapon"></img>
                                        <button onClick={()=>addWeapon(1)}>{weapons[1].price}</button>
                                            
                                    </div >
                                    <div className={userGold<weapons[2].price ? "disabled" : ""}>
                                        <img src={weapons[2].image} alt="weapon"></img>
                                        <button  onClick={()=>addWeapon(2)}>{weapons[2].price}</button>
                                            
                                    </div>
                            </div>
                        </div>
                        <div className="armors-items">
                            <div className="items-title">
                                <h3>Armors</h3>
                                {haveArmor && <p>You already have an armor</p>}
                            </div>
                            
                            <div className={haveArmor ? "inInventory" : "armors"}>
                                <div className={userGold<armors[0].price ? "disabled" : ""}>
                                    <img src={armors[0].image} alt="armor"></img>
                                    <button  onClick={()=>addArmor(0)}>{armors[0].price}</button>
                                        
                                </div>
                                <div className={userGold<armors[1].price ? "disabled" : ""}>
                                    <img src={armors[1].image} alt="armor"></img>
                                    <button  onClick={()=>addArmor(1)}>{armors[1].price}</button>
                                        
                                </div>
                                <div className={userGold<armors[2].price ? "disabled" : ""}>
                                    <img src={armors[2].image} alt="armor"></img>
                                    <button  onClick={()=>addArmor(2)}>{armors[2].price}</button>
                                </div>
                            </div>
                                
                        </div>
                        <div className="potions-items">
                        <div className="items-title">
                                <h3>Potions</h3> 
                                {havePotion && <p>You already have a potion</p>}
                            </div>
                            <div className={havePotion ? "inInventory" : "potions"}>
                                <div className={userGold<potions[0].price ? "disabled" : ""}>
                                    <img src={potions[0].image} alt="potion"></img>
                                    <button  onClick={()=>addPotion(0)}>{potions[0].price}</button>
                                        
                                </div>
                                <div className={userGold<potions[1].price ? "disabled" : ""}>
                                    <img src={potions[1].image} alt="potion"></img>
                                    <button  onClick={()=>addPotion(1)}>{potions[1].price}</button>
                                        
                                </div>
                                <div className={userGold<potions[1].price ? "disabled" : ""}>
                                    <img src={potions[2].image} alt="potion"></img>
                                    <button  onClick={()=>addPotion(2)}>{potions[2].price}</button>
                                        
                                </div>
                            </div>
                                
                        </div>
                    </div>
                    
                </div>
            </div>

        </main>
    )
}

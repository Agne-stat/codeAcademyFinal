import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../App';
import UserProfile from '../components/UserProfile';
import BackButton from '../components/BackButton';
import axios from 'axios';
import './styles/Inventory.css'

export default function UserInventory() {
    const { userData, setuserData} = useContext(DataContext)

    const [userGold, setuserGold] = useState(0)
    const [userWeapon, setuserWeapon] = useState([])
    const [userArmor, setuserArmor] = useState([])
    const [userPotion, setuserPotion] = useState([])
    const [displayWeapon, setDisplayWeapon] = useState(null)
    const [displayArmor, setDisplayArmor] = useState(null)
    const [displayPotion, setDisplayPotion] = useState(null)
    const [weaponImg, setWeaponImg] = useState('')
    const [armorImg, setArmorImg] = useState('')
    const [potionImg, setPotionImg] = useState('')
    const [weaponPrice, setWeaponPrice] = useState(0)
    const [armorPrice, setArmorPrice] = useState(0)
    const [potionPrice, setPotionPrice] = useState(0)
    const [weaponSpecial, setWeaponSpecial] = useState('')
    


    const id = localStorage.getItem('gameUser-id');

    useEffect(() => {

        axios.get('http://localhost:5000/user/'+ id)
            .then((res) => {
                setuserData(res.data)
                setuserGold(res.data.gold)
        })


        if(userData.inventoryWeapons.length === 0) {
            setuserWeapon([])
            setDisplayWeapon(false)
        } else {
            setuserWeapon(userData.inventoryWeapons[0].damage)
            setWeaponImg(userData.inventoryWeapons[0].image)
            setWeaponPrice(userData.inventoryWeapons[0].sellPrice)
            setWeaponSpecial(userData.inventoryWeapons[0].special)
            setDisplayWeapon(true)
        }
        
        if(userData.inventoryArmors.length === 0) {
            setuserArmor([])
            setDisplayArmor(false)
        } else {
            setuserArmor(userData.inventoryArmors[0].defence)
            setArmorImg(userData.inventoryArmors[0].image)
            setArmorPrice(userData.inventoryArmors[0].sellPrice)
            setDisplayArmor(true)

        }

        if(userData.inventoryPotions.length === 0) {
            setuserPotion([])
            setDisplayPotion(false)
        } else {
            setuserPotion(userData.inventoryPotions[0].heals)
            setDisplayPotion(true)
            setPotionImg(userData.inventoryPotions[0].image)
            setPotionPrice(userData.inventoryPotions[0].sellPrice)
        }

    //     return function cleanup() {
    //         setuserGold(0)
    //    }
        
        
    }, [userData, setuserData, setuserGold, setuserArmor, setuserPotion, setuserWeapon, setDisplayArmor, setDisplayPotion, id ])

    const sellWeapon = () => {
        let gold = userData.gold + userData.inventoryWeapons[0].sellPrice
        let weapon = []

        axios.put('http://localhost:5000/sellWeapon/'+id, {weapon, gold})
            .then((res) => {

        })
        
        setuserGold(gold)
        setuserWeapon(weapon)
        setDisplayWeapon(false)
    }

    const sellArmor = () => {
        let gold = userData.gold + userData.inventoryArmors[0].sellPrice
        let armor = []

        axios.put('http://localhost:5000/sellArmor/'+id, {gold, armor})
            .then((res) => {
                
        })
        
        setuserGold(gold)
        setuserArmor(armor)
        setDisplayArmor(false)
    }

    const sellPotion = () => {
        let gold = userData.gold + userData.inventoryPotions[0].sellPrice
        let potion = []

        axios.put('http://localhost:5000/sellPotion/'+id, {gold, potion})
            .then((res) => {
                
        })
        
        setuserGold(gold)
        setuserPotion(potion)
        setDisplayPotion(false)
    }

    return (
        <main className="inventory">
            <div className="inventory-container">
                <div className="user-container">
                    <UserProfile user={userData} gold={userGold} health={userData.health}></UserProfile>
                    <BackButton></BackButton>
                </div>
                
                <div className="inventory-items-container">
                    <h1>Your Inventory</h1>
                    <div className="inventory-items">
                        <div className="item">
                            <h3>Weapon:</h3>
                            {displayWeapon ? 
                                <div className="item-info">
                                    <div>
                                        <p>Damage: {userWeapon}</p>
                                        <p>Special: {weaponSpecial}</p>
                                        <button onClick={sellWeapon}>SELL {weaponPrice} gold</button>
                                    </div>
                                    
                                    <img src={weaponImg} alt="weapon"></img>
                                    
                                </div> : 
                                <p>You don't have weapon</p>
                            }
                        </div>
                        <div className="item">
                            <h3>Armor:</h3>
                            {displayArmor ? 
                                <div className="item-info">
                                    <div>
                                        <p>Defence: {userArmor}</p>
                                        <button onClick={sellArmor}>SELL {armorPrice} gold</button>
                                    </div>
                                    
                                    <img src={armorImg} alt="armor"></img>
                                    
                                </div> : 
                                <p>You don't have armor</p>
                            }
                        </div>
                        <div className="item">
                            <h3>Potion:</h3>
                            {displayPotion ? 
                                <div className="item-info">
                                    <div>
                                        <p>Heals: {userPotion}</p>
                                        <button onClick={sellPotion}>SELL {potionPrice} gold</button>
                                    </div>
                                    
                                    <img src={potionImg} alt="potion"></img>
                                    
                                </div> : 
                                <p>You don't have potion</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    )
}

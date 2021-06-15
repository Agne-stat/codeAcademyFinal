import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../App';
import axios from 'axios';

export default function UserInventory() {
    const { userData, setuserData } = useContext(DataContext)

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
        const id = localStorage.getItem('gameUser-id')

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
            console.log(displayArmor)
        }

        if(userData.inventoryPotions.length === 0) {
            setuserPotion([])
            setDisplayPotion(false)
            console.log(displayPotion)
        } else {
            setuserPotion(userData.inventoryPotions[0].heals)
            setDisplayPotion(true)
            setPotionImg(userData.inventoryPotions[0].image)
            setPotionPrice(userData.inventoryPotions[0].sellPrice)
            console.log(displayPotion)
        }
        
        
    }, [userData, setuserData, setuserGold, setuserArmor, setuserPotion, setuserWeapon, setDisplayArmor, setDisplayPotion ])
    // displayPotion, displayArmor, displayWeapon

    const sellWeapon = () => {
        let gold = userData.gold + userData.inventoryWeapons[0].sellPrice
        let weapon = []

        axios.put('http://localhost:5000/sellWeapon/'+id, {weapon, gold})
            .then((res) => {
                console.log(res)
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
                console.log(res)
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
                console.log(res)
        })
        
        setuserGold(gold)
        setuserPotion(potion)
        setDisplayPotion(false)
        console.log(displayPotion)
    }

    return (
        <div>
            <h1>Your Inventory</h1>
            <h3>Your gold: {userGold}</h3>
            <div>
                <div>
                    <h3>Weapon:</h3>
                    {displayWeapon ? 
                        <div>
                            <p>Damage: {userWeapon}</p>
                            <p>Special: {weaponSpecial}</p>
                            <img src={weaponImg} alt="weapon"></img>
                            <button onClick={sellWeapon}>Sell {weaponPrice} for </button>
                        </div> : 
                        <p>You don't have weapon</p>
                    }
                </div>
                <div>
                    <h3>Armor:</h3>
                    {displayArmor ? 
                        <div>
                            <p>Defence: {userArmor}</p>
                            <img src={armorImg} alt="armor"></img>
                            <button onClick={sellArmor}>Sell {armorPrice} for </button>
                        </div> : 
                        <p>You don't have armor</p>
                    }
                </div>
                <div>
                    <h3>Potion:</h3>
                    {displayPotion ? 
                        <div>
                            <p>Heals: {userPotion}</p>
                            <img src={potionImg} alt="potion"></img>
                            <button onClick={sellPotion}>Sell {potionPrice} for </button>
                        </div> : 
                        <p>You don't have potion</p>
                    }
                </div>
            </div>
        </div>
    )
}

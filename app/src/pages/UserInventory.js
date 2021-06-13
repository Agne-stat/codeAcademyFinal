import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../App';
import axios from 'axios';

export default function UserInventory() {
    const { userData, setuserData } = useContext(DataContext)

    const [userGold, setuserGold] = useState(0)
    const [userWeapon, setuserWeapon] = useState([])
    const [userArmor, setuserArmor] = useState([])
    const [userPotion, setuserPotion] = useState([])

    const id = localStorage.getItem('gameUser-id');

    useEffect(() => {

        if(userData.inventoryWeapons.length === 0) {
            setuserWeapon([])
        } else {
            setuserWeapon(userData.inventoryWeapons[0].name)
        }
        
        if(userData.inventoryArmors.length === 0) {
            setuserArmor([])
        } else {
            setuserArmor(userData.inventoryArmors[0].defence)
        }

        if(userData.inventoryPotions.length === 0) {
            setuserPotion([])
        } else {
            setuserPotion(userData.inventoryPotions[0].heals)
        }
        
        setuserGold(userData.gold)
    }, [userData])

    const sellWeapon = () => {
        let gold = userData.gold + userData.inventoryWeapons[0].sellPrice
        let weapon = []

        axios.put('http://localhost:5000/sellWeapon/'+id, {weapon, gold})
            .then((res) => {
                console.log(res)
        })
        
        setuserGold(gold)
        setuserWeapon(weapon)
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
    }

    return (
        <div>
            <h1>Your Inventory</h1>
            <h3>Your gold: {userGold}</h3>
            <div>
                <div>
                    <h3>Weapon:</h3>
                    <p>{userWeapon}</p>
                    <button onClick={sellWeapon}>Sell {userWeapon} for </button>
                    {/* <button onClick={sellWeapon}>Sell {userWeapon} for {userData.inventoryWeapons[0].sellPrice}</button> */}
                    
                </div>
                <div>
                    <h3>Armor:</h3>
                    <p>{userArmor}</p>
                    <button onClick={sellArmor}>Sell {userArmor} for </button>
                </div>
                <div>
                    <h3>Potion:</h3>
                    <p>{userPotion}</p>
                    <button onClick={sellPotion}>Sell {userPotion} for </button>
                </div>
            </div>
        </div>
    )
}

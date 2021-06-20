import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios'
import './styles/SingleUser.css'

export default function SingleUser() {
    const [singleUser, setSingleUser] = useState([])
    const [userWeapon, setUserWeapon] = useState(null)
    const [userArmor, setUserArmor] = useState(null)
    const [userPotion, setUserPotion] = useState(null)
    const [noInventory, setNoInventory] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/user/'+ id)
        .then((res) => {
            setSingleUser(res.data)
            console.log(res.data)
        })

        console.log(singleUser)

        // if(singleUser.inventoryWeapons.length === 0) {
        //     setUserWeapon([])
        //     setDisplayWeapon(false)
        // } else {
        //     setUserWeapon(singleUser.inventoryWeapons[0].damage)
        //     setDisplayWeapon(false)
        // }
        
        // if(singleUser.inventoryArmors.length === 0) {
        //     setUserArmor([])
        //     setDisplayArmor(false)
        // } else {
        //     setUserArmor(singleUser.inventoryArmors[0].defence)
        //     setDisplayArmor(true)
        // }

        // if(singleUser.inventoryPotions.length === 0) {
        //     setUserPotion([])
        //     setDisplayPotion(false)
        // } else {
        //     setUserPotion(singleUser.inventoryPotions[0].heals)
        //     setDisplayPotion(true)
        // }

        // if(userWeapon === [] && userArmor === [] && userPotion === []) {
        //     setNoInventory(true)
        //     console.log(userWeapon)
        // } else {
        //     setNoInventory(false)
        // }


    }, [id])

    const showInventory = () => {
        console.log(singleUser)

        if(singleUser.inventoryWeapons.length !== 0) {
            setUserWeapon(true)
            console.log(userWeapon)
        } else {
            setUserWeapon(false)
        }

        if(singleUser.inventoryArmors.length !== 0) {
            setUserArmor(true)
        } else {
            setUserArmor(false)
        }

        if(singleUser.inventoryPotions.length !== 0) {
            setUserPotion(true) 
        } else {
            setUserPotion(false)
        }

        if(userWeapon === false && userArmor ===false && userPotion ===false) {
            setNoInventory(true)
            console.log(userWeapon)
        } else {
            setNoInventory(false)
        }
    }

    return (
        <main className="singleUser">
            <div className="singleUser-container">
                <div className="singleUser-name">
                    <h1>{singleUser.username}</h1>
                    <BackButton></BackButton>
                </div>
                
                <div className="singleUser-info">
                    <div className="singleUser-controler">
                        <h2>GOLD: <span>{singleUser.gold}</span></h2>
                        <h2>HELATH: <span>{singleUser.health}</span></h2>
                        <button onClick={showInventory}>INVENTORY</button>
                    </div>
                    
                    <div className="singleUser-inventory">
                        {userWeapon && <img src={singleUser.inventoryWeapons[0].image} alt="weapon"></img> }
                        {userArmor && <img src={singleUser.inventoryArmors[0].image} alt="weapon"></img>}
                        {userPotion && <img src={singleUser.inventoryPotions[0].image} alt="weapon"></img>}
                        {noInventory && <p>No inventory</p>}
                    </div>
                    
                </div>
                
            </div>
        </main>
    )
}

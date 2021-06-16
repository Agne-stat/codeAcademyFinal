import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios'

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
        <div>
            <h1>Player {singleUser.username}</h1>
            <div>
                <h2>{singleUser.gold}</h2>
                <button onClick={showInventory}>Inventory</button>
                {userWeapon && <p>{singleUser.inventoryWeapons[0].name}</p>}
                {userArmor && <p>{singleUser.inventoryArmors[0].defence}</p>}
                {userPotion && <p>{singleUser.inventoryPotions[0].heals}</p>}
                {noInventory && <p>No inventory</p>}
            </div>
            <BackButton></BackButton>
        </div>
    )
}
